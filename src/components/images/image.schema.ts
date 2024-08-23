import { TypeOf, object, string } from 'zod';

export const getImageSchema = object({
  params: object({
    _id: string(),
  }),
});
export type getImageInput = TypeOf<typeof getImageSchema>;
