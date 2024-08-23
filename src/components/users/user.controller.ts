import { Request, Response } from 'express';
import { createUserInput, editUserInput } from './user.schema';
import {
  createUserService,
  editUserService,
  findUserByIdService,
} from './user.service';

export async function createUserController(
  req: Request<unknown, unknown, createUserInput['body']>,
  res: Response
) {
  try {
    const user = await createUserService(req.body, req.file);
    if (!user) {
      return res
        .status(409)
        .json({ response: 0, message: 'User already exists', data: {} });
    }

    return res.status(201).json({
      response: 1,
      message: '',
      data: user,
    });
  } catch (error: any) {
    return res
      .status(409)
      .json({ response: 0, message: error.message, data: {} });
  }
}
export async function getUserController(req: Request, res: Response) {
  try {
    const user = await findUserByIdService(req.user!._id);
    if (!user) {
      return res
        .status(403)
        .json({ response: 0, message: 'Not Authenticated', data: {} });
    }
    return res.json({ response: 1, message: '', data: user });
  } catch (error: any) {
    return res
      .status(409)
      .json({ response: 0, message: error.message, data: {} });
  }
}
export async function editUserController(
  req: Request<unknown, unknown, editUserInput['body']>,
  res: Response
) {
  try {
    const user = await editUserService(
      { _id: req.user?._id },
      { body: req.body, avatar: req.file },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ response: 0, message: 'User is not exist', data: {} });
    }
    return res.json({ response: 1, message: '', data: user });
  } catch (error: any) {
    res.status(409).json({ response: 0, message: error.message, data: {} });
  }
}
