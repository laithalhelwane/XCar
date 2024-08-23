import { Types, model, Schema, FilterQuery } from 'mongoose';
import { UserDocument } from '../users/user.model';
import Rate from '../rates/rate.model';
import { ImageDocument } from '../images/image.models';
import favoriteModel, { FavoriteDocument } from '../favorites/favorite.model';

export interface CarDocument {
  _id?: Types.ObjectId;
  owner: UserDocument;
  forSale: boolean;
  location: string;
  brand: string;
  model: string;
  description?: string;
  price: number;
  kilometerage: number;
  images?: String;
  createdAt: Date;
  updatedAt: Date;
  getRateValue(): Promise<number>;
  isLiked(favoriteQuery: FilterQuery<FavoriteDocument>): Promise<boolean>;
  rate: number;
}

const CarSchema = new Schema<CarDocument>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    brand: {
      type: String,
      required: true,
    },
    forSale: {
      type: Boolean,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    images: [
      {
        type: String
      },
    ],
    kilometerage: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
CarSchema.methods.getRateValue = async function () {
  let RatePerValue = new Map<number, number>();
  const rates = await Rate.find({
    car: this._id,
  }).lean();

  let rateValue = 0;
  for (let rate of rates) {
    if (!RatePerValue.has(rate.rateValue)) {
      RatePerValue.set(rate.rateValue, 0);
    }
    RatePerValue.set(rate.rateValue, RatePerValue.get(rate.rateValue)! + 1);
  }
  let top = 0,
    bottom = 0;
  for (let t of RatePerValue) {
    top += t[1] * t[0];
    bottom += t[1];
  }
  if (bottom !== 0) rateValue = top / bottom;
  return Math.round(rateValue);
};
CarSchema.methods.isLiked = async function (
  favoriteQuery: FilterQuery<FavoriteDocument>
) {
  const fav = await favoriteModel.findOne({ car: this._id, ...favoriteQuery });
  if (!fav) {
    return false;
  }
  return true;
};
const CarModel = model<CarDocument>('Car', CarSchema);
export default CarModel;
