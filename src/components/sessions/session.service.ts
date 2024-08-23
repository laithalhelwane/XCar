import { FilterQuery } from 'mongoose';
import Session, { SessionDocument } from './session.model';

export async function createSessionService(sessionPayload: SessionDocument) {
  try {
    const session = new Session({ owner: sessionPayload.owner._id, fcmToken: sessionPayload.fcmToken });
    await session.save();
    return session.toJSON();
  } catch (err: any) {
    throw new Error(err);
  }
}
export async function deleteSessionService(
  query: FilterQuery<SessionDocument>
) {
  try {
    const session = await Session.deleteOne(query);
    return session;
  } catch (err: any) {
    throw new Error(err);
  }
}
export async function getSessionService(
  query: FilterQuery<SessionDocument>
) {
  try {
    const session = await Session.findOne(query);
    return session;
  } catch (err: any) {
    throw new Error(err);
  }
}

