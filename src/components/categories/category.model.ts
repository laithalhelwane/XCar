import { Schema, model, Types } from 'mongoose';

export interface CategoryDocument {
  _id?: Types.ObjectId;
  title: string;
  image: string;
}
const categorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
const CategoryModel = model<CategoryDocument>('Category', categorySchema);

export default CategoryModel;
