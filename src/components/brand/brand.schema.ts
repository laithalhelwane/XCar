import { string, object, TypeOf } from 'zod';
/**
 * @openapi
 * components:
 *   schemas:
 *     GetBrandResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 63d53e52695b8d0a93233af0
 *         name:
 *           type: string
 *           example: Honda
 *         avatar:
 *           type: string
 *           fromat: binary
 *           example: "http://localhost:3000/static/64cfe2f4ec71b9917a5ba280"     
 */
export const createBrandSchema = object({
  /**
   * @openapi
   * components:
   *   schemas:
   *     GetBrandByIdResponse:
   *       type: object
   *       properties:
   *         _id:
   *           type: string
   *           example: 63d53e52695b8d0a93233af0
   *         name:
   *           type: string
   *           example: Honda
   *         avatar:
   *           type: string
   *           fromat: binary
   *           example: "http://localhost:3000/static/64cfe2f4ec71b9917a5ba280"
   *         cars:
   *           type: array
   *           items:
   *             $ref: '#/components/schemas/CreateCarResponse'         
   */
  body: object({
    name: string(),
  }),
});
export const getBrandByIdSchema = object({
  params: object({
    _id: string(),
  }),
});
export type createBrandInput = TypeOf<typeof createBrandSchema>;
export type getBrandByIdInput = TypeOf<typeof getBrandByIdSchema>;
