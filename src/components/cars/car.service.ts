import { FilterQuery, ObjectId, QuerySelector, UpdateQuery } from 'mongoose';
import Image from '../images/image.models';
import Car, { CarDocument } from './car.model';
import Rate, { RateDocument } from '../rates/rate.model';
import Favorite, { FavoriteDocument } from '../favorites/favorite.model';
import sharp from 'sharp';
import { UserDocument } from '../users/user.model';
import { QueryOptions } from 'mongoose';
import config from '../../config/config';
import { omit, set } from 'lodash';
import RateModel from '../rates/rate.model';
import appointmentModel from '../appointments/appointment.model';
import { getCarsInput } from './car.schema';

export async function createCarService(
  carPayload: Omit<
    CarDocument,
    | '_id'
    | 'images'
    | 'createdAt'
    | 'updatedAt'
    | 'getRateValue'
    | 'rate'
    | 'owner'
    | 'isLiked'
  >,
  images: Express.Multer.File[] | undefined,
  owner: string | ObjectId
) {
  try {
    const car = await Car.create(carPayload);
    car.set('owner', owner);
    if (images !== undefined) {
      const imagesCreated = images.map(async function (image) {
        const temp = await Image.create({
          buffer: image.buffer,
          mimetype: image.mimetype,
          owner: car._id,
        });
        return `${config.hostURL}/static/${temp._id}`;
      });
      const imagesIds = await Promise.all(imagesCreated);
      car.set('images', imagesIds);
    }
    await car.save();
    return car.toJSON();
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function getCarsService(userId: string) {
  try {
    const cars = await Car.find({}, {}, {});
    const res = await Promise.all(
      cars.map(async (car) => {
        return omit(
          {
            ...car.toJSON(),
            rate: await car.getRateValue(),
            isLiked:
              userId !== '' ? await car.isLiked({ owner: userId }) : null,
            isRated:
              userId !== ''
                ? (await RateModel.findOne({ owner: userId, car: car._id })) !==
                  null
                : false,
            isAppointmentRequested:
              userId !== ''
                ? (await appointmentModel.findOne({
                    sender: userId,
                    car: car._id,
                  })) !== null
                : false,
          },
          'owner.password'
        );
      })
    );
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function getCarsServiceQuery(
  query: getCarsInput['query'],
  userId: string
) {
  try {
    const queryBuild = {};
    for (let x in query) {
      //@ts-ignore
      if (query[x] !== '') {
        if (x.startsWith('price')) {
          //@ts-ignore
          if (queryBuild['$and'] === undefined)
            //@ts-ignore
            queryBuild['$and'] = [];
          if (x === 'price_max') {
            //@ts-ignore
            queryBuild['$and'].push({ price: { $lt: query[x] } });
          } else {
            //@ts-ignore
            queryBuild['$and'].push({ price: { $gt: query[x] } });
          }
        } else if (x.startsWith('odo')) {
          //@ts-ignore
          //@ts-ignore
          if (queryBuild['$and'] === undefined)
            //@ts-ignore
            queryBuild['$and'] = [];
          if (x === 'odo_max') {
            //@ts-ignore

            queryBuild['$and'].push({ kilometerage: { $lt: query[x] } });
          } else {
            //@ts-ignore

            queryBuild['$and'].push({ kilometerage: { $gt: query[x] } });
          }
        } else {
          //@ts-ignore
          queryBuild[x] = query[x];
        }
      }
    }
    const cars = await Car.find(queryBuild, {}, {});
    const res = await Promise.all(
      cars.map(async (car) => {
        return omit(
          {
            ...car.toJSON(),
            rate: await car.getRateValue(),
            isLiked:
              userId !== '' ? await car.isLiked({ owner: userId }) : null,
            isRated:
              userId !== ''
                ? (await RateModel.findOne({ owner: userId, car: car._id })) !==
                  null
                : false,
            isAppointmentRequested:
              userId !== ''
                ? (await appointmentModel.findOne({
                    sender: userId,
                    car: car._id,
                  })) !== null
                : false,
          },
          'owner.password'
        );
      })
    );
    return res.slice(0);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getCarService(
  query: FilterQuery<CarDocument>,
  userId: string
) {
  const car = await Car.findOne(query, {}, {});
  if (!car) return null;
  const rate = await car?.getRateValue();
  const isLiked = userId !== '' ? await car.isLiked({ owner: userId }) : null;
  const isRated =
    userId !== ''
      ? (await RateModel.findOne({ owner: userId, car: car._id })) !== null
      : false;
  const isAppointmentRequested =
    userId !== ''
      ? (await appointmentModel.findOne({
          sender: userId,
          car: car._id,
        })) !== null
      : false;
  return { ...car.toJSON(), rate, isLiked, isRated, isAppointmentRequested };
}

export async function rateCarService(
  carQuery: FilterQuery<CarDocument>,
  userQuery: FilterQuery<UserDocument>,
  ratePayload: Omit<
    RateDocument,
    '_id' | 'createdAt' | 'updatedAt' | 'owner' | 'car'
  >
) {
  try {
    const car = await getCarService(carQuery, userQuery._id);
    if (!car) {
      return null;
    }
    await Rate.deleteOne({ car: car._id, owner: userQuery._id });
    const rate = await Rate.create({
      ...ratePayload,
      car: car._id,
      owner: userQuery._id,
    });
    return rate.toJSON();
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function addFavoriteCarService(
  carQuery: FilterQuery<CarDocument>,
  ownerQuery: FilterQuery<UserDocument>
) {
  try {
    const car = await getCarService(carQuery, '');
    if (!car) {
      return null;
    }
    const isExist = await Favorite.findOne({
      owner: ownerQuery._id,
      car: carQuery._id,
    });
    if (isExist) {
      return isExist;
    }
    const favorite = await Favorite.create({
      car: carQuery._id,
      owner: ownerQuery._id,
    });
    return favorite;
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function deleteFavoriteCarService(
  carQuery: FilterQuery<CarDocument>,
  ownerQuery: FilterQuery<UserDocument>
) {
  try {
    const favorite = await Favorite.deleteOne({
      car: carQuery._id,
      owner: ownerQuery._id,
    });
    return favorite;
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function getUserFavoriteService(
  favoriteQuery: FilterQuery<FavoriteDocument>,
  options: QueryOptions<FavoriteDocument>,
  userId: string
) {
  try {
    const favorites = await Favorite.find(favoriteQuery, {}, options);
    const cars = [];
    const res = await Promise.all(
      favorites.map(async (fav) => {
        const car = await Car.findById(fav.car._id);
        return omit(
          {
            ...car?.toJSON(),
            rate: await car?.getRateValue(),
            isLiked:
              userId !== '' ? await car?.isLiked({ owner: userId }) : null,
            isRated:
              userId !== ''
                ? (await RateModel.findOne({
                    owner: userId,
                    car: car?._id,
                  })) !== null
                : false,
            isAppointmentRequested:
              userId !== ''
                ? (await appointmentModel.findOne({
                    sender: userId,
                    car: car?._id,
                  })) !== null
                : false,
          },
          'owner.password'
        );
      })
    );
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function getUserCarService(carQuery: FilterQuery<CarDocument>) {
  try {
    const cars = await Car.find(carQuery, {}, { lean: true })
      .sort({ id: -1 })
      .limit(4);
    return cars;
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function updateCarService(
  carQuery: FilterQuery<CarDocument>,
  update: {
    body: UpdateQuery<CarDocument>;
    images: Express.Multer.File[] | undefined;
  }
) {
  try {
    const car = await Car.findOneAndUpdate(carQuery, update.body, {});
    if (!car) return null;
    if (update.images !== undefined) {
      await Image.deleteMany({ owner: car._id });
      const imagesCreated = update.images.map(async function (image) {
        const temp = await Image.create({
          buffer: image.buffer,
          mimetype: image.mimetype,
          owner: car._id,
        });
        return `${config.hostURL}/static/${temp._id}`;
      });
      const imagesIds = await Promise.all(imagesCreated);
      car.set('images', imagesIds);
    }
    return car;
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function getHomeService(userId: string) {
  try {
    const cars = await getCarsService(userId);
    const topRated = cars.sort((a, b) => b.rate - a.rate).slice(0, 3);
    const Whatsnew = await Car.find({}, {}, {}).sort({ _id: -1 }).limit(3);

    const res = await Promise.all(
      Whatsnew.map(async (car) => {
        return omit(
          {
            ...car.toJSON(),
            rate: await car.getRateValue(),
            isLiked:
              userId !== '' ? await car.isLiked({ owner: userId }) : null,
            isRated:
              userId !== ''
                ? (await RateModel.findOne({ owner: userId, car: car._id })) !==
                  null
                : false,
            isAppointmentRequested:
              userId !== ''
                ? (await appointmentModel.findOne({
                    sender: userId,
                    car: car._id,
                  })) !== null
                : false,
          },
          'owner.password'
        );
      })
    );
    const popular = await Promise.all(
      cars.map(async (car) => {
        const freq = await appointmentModel.count({ car: car._id });
        set(car, 'frequency', freq);
        return car;
      })
    );
    //@ts-ignore
    popular.sort((a, b) => b.frequency - a.frequency);
    return {
      'Top Rated': topRated,
      "What's new": res,
      Popular: popular.slice(0, 3),
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function getTopRated(userId: string) {
  try {
    const cars = await getCarsService(userId);
    const topRated = cars.sort((a, b) => b.rate - a.rate);
    return topRated;
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function getPopular(userId: string) {
  try {
    const cars = await getCarsService(userId);
    const popular = await Promise.all(
      cars.map(async (car) => {
        const freq = await appointmentModel.count({ car: car._id });
        set(car, 'frequency', freq);
        return car;
      })
    );
    //@ts-ignore
    return popular.sort((a, b) => b.frequency - a.frequency);
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function deleteCarService(query: FilterQuery<CarDocument>) {
  try {
    const car = await Car.findOneAndDelete(query, { lean: true });
    if (!car) {
      return null;
    }
    return car;
  } catch (error: any) {
    throw new Error(error);
  }
}
