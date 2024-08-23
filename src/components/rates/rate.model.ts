import { Types, model, Schema } from 'mongoose';
import { UserDocument } from '../users/user.model';
import { CarDocument } from '../cars/car.model';

export interface RateDocument {
  _id?: Types.ObjectId;
  owner: UserDocument;
  car: CarDocument;
  rateValue: number;
}

const RateSchema = new Schema<RateDocument>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: 'Car',
    },
    rateValue: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const RateModel = model<RateDocument>('Rate', RateSchema);
export default RateModel;
