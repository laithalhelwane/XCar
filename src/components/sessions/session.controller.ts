import { Request, Response } from 'express';
import { signJwt } from '../../util/jwt';
import { validatePassword } from '../users/user.service';
import { createSessionInput } from './session.schema';
import { createSessionService, deleteSessionService } from './session.service';
import { omit } from 'lodash';

export async function createSessionController(
  req: Request<unknown, unknown, createSessionInput['body']>,
  res: Response
) {
  try {
    const user = await validatePassword(req.body);
    if (!user) {
      return res
        .status(401)
        .json({ response: 0, message: 'Worng email or password', data: {} });
    }
    const session = await createSessionService({
      owner: user,
      fcmToken: req.body.fcmToken,
    });

    const accessToken = signJwt({ sub: user._id, sessionId: session._id });

    return res.status(201).json({
      response: 1,
      message: '',
      data: { ...accessToken, user: omit(user.toJSON(), 'password') },
    });
  } catch (err: any) {
    res.status(409).json({ response: 0, message: err.message, data: {} });
  }
}
export async function deleteSessionController(req: Request, res: Response) {
  try {
    //@ts-ignore
    const session = await deleteSessionService({ _id: req.user.sessionId });
    return res.status(200).json({
      response: 1,
      message: '',
      data: session,
    });
  } catch (err: any) {
    res.status(409).json({ response: 0, message: err.message, data: {} });
  }
}
