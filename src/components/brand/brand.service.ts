import { FilterQuery } from 'mongoose';
import config from '../../config/config';
import Image from '../images/image.models';
import brandModel, { BrandDocument } from './brand.model';
import CarModel from '../cars/car.model';
import { set, omit } from 'lodash';
import RateModel from '../rates/rate.model';
import appointmentModel from '../appointments/appointment.model';

export async function createBrandService(
  input: Omit<BrandDocument, 'avatar'>,
  avatar: Express.Multer.File | undefined
) {
  try {
    const brand = await new brandModel(input);
    if (avatar !== undefined) {
      const image = await Image.create({
        buffer: avatar.buffer,
        mimetype: avatar.mimetype,
      });
      brand.set('avatar', `${config.hostURL}/static/${image._id}`);
    }
    await brand.save();
    return brand;
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function getBrandsService() {
  try {
    const brand = await brandModel.find(
      {},
      {},
      { lean: true, populate: 'avatar' }
    );
    return brand;
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function getBrandByIdService(query: FilterQuery<BrandDocument>, userId: string) {
  try {
    const brand = await brandModel.findOne(
      query,
      {},
      { lean: true, populate: 'avatar' }
    );
    if (!brand) {
      return null;
    }
    const cars = await CarModel.find({ brand: brand?.name });
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
    set(brand, 'cars', res);
    return brand;
  } catch (error: any) {
    throw new Error(error);
  }
}
