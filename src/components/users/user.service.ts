import User, { UserDocument } from './user.model';
import { omit, set } from 'lodash';
import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import Image from '../images/image.models';
import config from '../../config/config';
export async function createUserService(
  userPayload: Omit<
    UserDocument,
    '_id' | 'createdAt' | 'updatedAt' | 'comparePasswords' | 'cars' | 'sessions' | 'avatar'
  >,
  avatar: Express.Multer.File | undefined
) {
  try {
    const isExist = await User.findOne({ email: userPayload.email });
    if (isExist) {
      return null;
    }
    const user = new User(userPayload);
    if (avatar !== undefined) {
      const image = await Image.create({
        buffer: avatar.buffer,
        mimetype: avatar.mimetype,
      });
      user.set('avatar', image._id);
    }
    await user.save();
    await user.populate('avatar');
    return omit(user.toJSON(), 'password');
  } catch (err: any) {
    throw new Error(err);
  }
}
export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await User.findOne({ email });
  if (!user) {
    return null;
  }
  const isValid = await user.comparePasswords(password);
  if (!isValid) {
    return null;
  }
  return user;
}
export async function editUserService(
  query: FilterQuery<UserDocument>,
  update: {
    body: UpdateQuery<UserDocument>;
    avatar: Express.Multer.File | undefined;
  },
  options: QueryOptions
) {
  try {
    const user = await User.findByIdAndUpdate(query, update.body, options);
    if (!user) return undefined;
    if (update.avatar !== undefined) {
      await Image.findOneAndDelete({ _id: user.avatar });
      const image = await Image.create({
        buffer: update.avatar.buffer,
        mimetype: update.avatar.mimetype,
      });
      user.set('avatar', image._id);
      await user.save();
    }
    return omit(user.toJSON(), 'password');
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function findUserByIdService(_id: string) {
  const user = await User.findById(
    _id,
    {},
    { populate: ['avatar'], lean: true }
  );
  return omit(user, 'password');
}

export async function createUserImageService(
  query: FilterQuery<UserDocument>,
  avatar: Express.Multer.File
) {
  try {
    const user = await User.findOne(query);
    if (!user) {
      return null;
    }
    await Image.findOneAndDelete({ owner: user._id });
    const image = await Image.create({
      buffer: avatar.buffer,
      mimetype: avatar.mimetype,
      owner: user._id,
    });
    user.set('avatar', `${config.hostURL}/static/${image._id}`);
    await user.save();
    return omit(user.toJSON(), 'password');
  } catch (err: any) {
    throw new Error(err);
  }
}
