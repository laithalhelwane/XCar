import { Request, Response } from 'express';
import { createUserImageService } from '../users/user.service';
import { getImageInput } from './image.schema';
import Image from './image.models';
import { getImageService } from './image.service';

export async function createUserImageController(req: Request, res: Response) {
  try {
    const image = await createUserImageService(
      { _id: req.user?._id },
      req.file!
    );
    if (!image) {
      return res
        .status(404)
        .json({ response: 0, message: 'User is not exists', data: {} });
    }

    return res.status(201).json({
      response: 1,
      message: '',
      data: image,
    });
  } catch (error: any) {
    return res
      .status(409)
      .json({ response: 0, message: error.message, data: {} });
  }
}
export async function getImageController(
  req: Request<getImageInput['params']>,
  res: Response
) {
  try {
    const image = await getImageService({ _id: req.params._id });
    if (!image) {
      return res
        .status(404)
        .json({ response: 0, message: 'Image is not exists', data: {} });
    }
    res.set('Content-Type', image.mimetype);
    res.set('Content-Disposition', `inline; filename="${image._id}.jpg"`);
    return res.send(image.buffer);
  } catch (error: any) {
    return res
      .status(409)
      .json({ response: 0, message: error.message, data: {} });
  }
}
