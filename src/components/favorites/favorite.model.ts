import { Types, Schema, model } from 'mongoose';
import { CarDocument } from '../cars/car.model';
import { UserDocument } from '../users/user.model';

export interface FavoriteDocument {
  _id?: Types.ObjectId;
  owner: UserDocument;
  car: CarDocument;
  createdAt: Date;
  updatedAt: Date;
}
const favoriteSchema = new Schema<FavoriteDocument>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: 'Car',
    },
  },
  { timestamps: true }
);

const favoriteModel = model<FavoriteDocument>('Favorite', favoriteSchema);
export default favoriteModel;
