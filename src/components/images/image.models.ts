import { Types, model, Schema } from 'mongoose';
import { UserDocument } from '../users/user.model';
import { CarDocument } from '../cars/car.model';

export interface ImageDocument {
  _id?: Types.ObjectId;
  buffer: Buffer;
  mimetype: string;
  owner: UserDocument | CarDocument;
}
export const ImageSchema = new Schema(
  {
    buffer: {
      type: Buffer,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    owner: {
      Type: Schema.Types.ObjectId,
      ref: ['User', 'Car']
    },
  },
  { timestamps: true }
);

const Image = model<ImageDocument>('Image', ImageSchema);
export default Image;
