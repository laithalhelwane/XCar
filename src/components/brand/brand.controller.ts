import { Request, Response } from 'express';
import { createBrandInput, getBrandByIdInput } from './brand.schema';
import {
  createBrandService,
  getBrandsService,
  getBrandByIdService,
} from './brand.service';
export async function createBrandController(
  req: Request<{}, {}, createBrandInput['body']>,
  res: Response
) {
  try {
    const brands = await createBrandService(req.body, req.file);
    return res.status(201).send({
      response: 1,
      message: '',
      data: brands,
    });
  } catch (error: any) {
    return res
      .status(409)
      .json({ response: 0, message: error.message, data: {} });
  }
}
export async function getBrandsController(req: Request, res: Response) {
  try {
    const brands = await getBrandsService();
    return res.status(200).send({
      response: 1,
      message: '',
      data: brands,
    });
  } catch (error: any) {
    return res
      .status(409)
      .json({ response: 0, message: error.message, data: {} });
  }
}

export async function getBrandByIdController(
  req: Request<getBrandByIdInput['params']>,
  res: Response
) {
  try {
    console.log(req.params._id);
    const brand = await getBrandByIdService(
      { _id: req.params._id },
      req.user!._id
    );
    return res.status(200).send({
      response: 1,
      message: '',
      data: brand,
    });
  } catch (error: any) {
    return res
      .status(409)
      .json({ response: 0, message: error.message, data: {} });
  }
}
