import { Request, Response } from 'express';
import logger from '../../util/logger';
import {
  rateCarInput,
  createCarInput,
  getCarInput,
  addFavoriteCarInput,
  deleteFavoriteCarInput,
  updateCarInput,
  deleteCarInput,
  getCarsInput,
} from './car.schema';
import {
  createCarService,
  getCarsService,
  getCarService,
  rateCarService,
  addFavoriteCarService,
  deleteFavoriteCarService,
  getUserFavoriteService,
  getUserCarService,
  updateCarService,
  getHomeService,
  deleteCarService,
  getCarsServiceQuery,
  getTopRated,
  getPopular,
} from './car.service';

export async function createCarController(
  req: Request<unknown, unknown, createCarInput['body']>,
  res: Response
) {
  try {
    const car = await createCarService(
      req.body,
      req.files as Express.Multer.File[],
      req.user?._id!
    );
    return res.status(201).json({ response: 1, message: '', data: car });
  } catch (error: any) {
    logger.error(error);
    return res
      .status(409)
      .json({ response: 0, message: error.message, data: {} });
  }
}
export async function getCarsController(
  req: Request<{}, {}, {}, getCarsInput['query']>,
  res: Response
) {
  try {
    const cars = await getCarsServiceQuery(req.query, req.user?._id!);
    return res.json({ response: 1, message: '', data: cars });
  } catch (error: any) {
    return res
      .status(409)
      .json({ response: 0, message: error.message, data: {} });
  }
}

export async function getCarConroller(
  req: Request<getCarInput['params']>,
  res: Response
) {
  try {
    const car = await getCarService({ _id: req.params._id }, req.user?._id!);
    if (!car) {
      return res
        .status(404)
        .json({ response: 0, message: 'Car is not found', data: {} });
    }
    return res.json({ response: 1, message: '', data: car });
  } catch (error: any) {
    return res
      .status(409)
      .json({ response: 0, message: error.message, data: {} });
  }
}
export async function rateCarController(
  req: Request<rateCarInput['params'], {}, rateCarInput['body']>,
  res: Response
) {
  try {
    const rate = await rateCarService(
      { _id: req.params._id },
      { _id: req.user?._id },
      req.body
    );
    if (!rate) {
      return res
        .status(404)
        .json({ response: 0, message: 'Car is not found', data: {} });
    }
    return res.status(201).json({ response: 1, message: '', data: rate });
  } catch (error: any) {
    return res
      .status(409)
      .json({ response: 0, message: error.message, data: {} });
  }
}
export async function addFavoriteCarController(
  req: Request<addFavoriteCarInput['params']>,
  res: Response
) {
  try {
    const favorite = await addFavoriteCarService(
      { _id: req.params._id },
      { _id: req.user?._id }
    );
    if (!favorite) {
      return res
        .status(404)
        .json({ response: 0, message: 'Car is not found', data: {} });
    }
    return res.status(201).json({ response: 1, message: '', data: favorite });
  } catch (error: any) {
    return res
      .status(409)
      .json({ response: 0, message: error.message, data: {} });
  }
}
export async function deleteFavoriteCarController(
  req: Request<deleteFavoriteCarInput['params']>,
  res: Response
) {
  try {
    const favorite = await deleteFavoriteCarService(
      { _id: req.params._id },
      { _id: req.user?._id }
    );
    return res.status(200).json({ response: 1, message: '', data: favorite });
  } catch (error: any) {
    return res
      .status(409)
      .json({ response: 0, message: error.message, data: {} });
  }
}
export async function getUserFavoriteController(req: Request, res: Response) {
  try {
    const cars = await getUserFavoriteService(
      { owner: req.user?._id },
      { populate: 'car', lean: true },
      req.user!._id
    );
    return res.status(200).json({ response: 1, message: '', data: cars });
  } catch (error: any) {
    return res
      .status(409)
      .json({ response: 0, message: error.message, data: {} });
  }
}
export async function getUserCarController(req: Request, res: Response) {
  try {
    const cars = await getUserCarService({ owner: req.user?._id });
    return res.json({ response: 1, message: '', data: cars });
  } catch (error: any) {
    return res
      .status(409)
      .json({ response: 0, message: error.message, data: {} });
  }
}

export async function updateCarConroller(
  req: Request<updateCarInput['params'], {}, updateCarInput['body']>,
  res: Response
) {
  try {
    const canEdit = await getCarService(
      {
        _id: req.params._id,
        owner: req.user?._id,
      },
      ''
    );
    if (!canEdit) {
      return res.status(403).json({
        response: 0,
        message: 'You are not allowed to edit this car or the car in not found',
        data: {},
      });
    }
    const car = await updateCarService(
      { _id: req.params._id },
      { body: req.body, images: req.files as Express.Multer.File[] }
    );
    return res.json({ response: 1, message: '', data: car });
  } catch (error: any) {
    return res
      .status(409)
      .json({ response: 0, message: error.message, data: {} });
  }
}
export async function getHomeController(req: Request, res: Response) {
  try {
    const homePage = await getHomeService(req.user?._id!);
    return res.json({ response: 1, message: '', data: homePage });
  } catch (error: any) {
    return res
      .status(409)
      .json({ response: 0, message: error.message, data: {} });
  }
}
export async function getTopRatedController(req: Request, res: Response) {
  try {
    const topRated = await getTopRated(req.user?._id!);
    return res.json({ response: 1, message: '', data: topRated });
  } catch (error: any) {
    return res
      .status(409)
      .json({ response: 0, message: error.message, data: {} });
  }
}
export async function getPopularController(req: Request, res: Response) {
  try {
    const popular = await getPopular(req.user?._id!);
    return res.json({ response: 1, message: '', data: popular });
  } catch (error: any) {
    return res
      .status(409)
      .json({ response: 0, message: error.message, data: {} });
  }
}
export async function deleteCarsController(
  req: Request<deleteCarInput['params']>,
  res: Response
) {
  try {
    const car = await deleteCarService({
      _id: req.params._id,
      owner: req.user?._id,
    });
    if (!car) {
      return res
        .status(404)
        .json({ response: 0, message: 'Car is not found', data: {} });
    }
    return res.json({ response: 1, message: '', data: car });
  } catch (error: any) {
    return res
      .status(409)
      .json({ response: 0, message: error.message, data: {} });
  }
}
