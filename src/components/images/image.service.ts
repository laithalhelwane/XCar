import { FilterQuery } from 'mongoose';
import Image, { ImageDocument } from './image.models';

export async function getImageService(query: FilterQuery<ImageDocument>) {
  try {
    const image = await Image.findById(query);
    return image;
  } catch (error: any) {
    throw new Error(error);
  }
}
