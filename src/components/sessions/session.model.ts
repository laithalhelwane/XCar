import { Types, model, Schema } from 'mongoose';
import { UserDocument } from '../users/user.model';

export interface SessionDocument {
  _id?: Types.ObjectId;
  owner: UserDocument;
  fcmToken: string;
  valid?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const sessionSchema = new Schema<SessionDocument>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    valid: {
      type: Boolean,
      default: true,
    },
    fcmToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const sessionModel = model<SessionDocument>('Session', sessionSchema);

export default sessionModel;
