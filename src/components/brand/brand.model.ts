import { Schema, model } from 'mongoose';
export interface BrandDocument {
  name: string;
  avatar: string;

}

const brandSchema = new Schema<BrandDocument>({
  name: {
    type: 'string',
    required: true,
  },
  avatar: {
    type: String,
    default: ''
  },
});
const brandModel = model<BrandDocument>('Brand', brandSchema);
export default brandModel;
