import { hash } from '../../util/password';
import { Types, Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { CarDocument } from '../cars/car.model';
import { SessionDocument } from '../sessions/session.model';
import { ImageDocument } from '../images/image.models';
export interface UserDocument {
  _id?: Types.ObjectId;
  email: string;
  name: string;
  password: string;
  cars?: CarDocument[];
  sessions?: SessionDocument[];
  location: string;
  phoneNumber: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  comparePasswords: (candidatePassword: string) => Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: 'string',
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: ''
    },
    location: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    cars: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Car',
      },
    ],
    sessions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Session',
      },
    ],
  },
  { timestamps: true }
);
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const hashedPassword = await hash(this.password);

  this.password = hashedPassword;

  return next();
});
userSchema.methods.comparePasswords = async function (
  candidatePassword: string
) {
  const user = this as unknown as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch(() => false);
};
const userModel = model<UserDocument>('User', userSchema);
export default userModel;
