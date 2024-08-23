import { Router } from 'express';
import validate from '../../middleware/validateResouce';
import { createBrandSchema,getBrandByIdSchema } from './brand.schema';
import { createBrandController, getBrandsController, getBrandByIdController } from './brand.controller';
import upload from '../../middleware/multer';
import passport from 'passport';
const router = Router();
router.post(
  '/brands',
  [upload.single('avatar'), validate(createBrandSchema)],
  createBrandController
);
/**
 * @openapi
 * '/brands':
 *  get:
 *    tags:
 *      - Brand
 *    summary: Get Brands
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                response:
 *                  type: number
 *                  defualt: 1
 *                message:
 *                  type: string
 *                  defualt: ""
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/GetBrandResponse'
 *      409:
 *        description: Confilct
 *      400:
 *        description: Bad request
 */
router.get('/brands', getBrandsController);
/**
 * @openapi
 * '/brands/{id}':
 *  get:
 *    tags:
 *      - Brand
 *    summary: Get Brand by Id
 *    parameters:
 *      - id:
 *        name: id
 *        in: path
 *        description: The Id of the brand
 *        required: true
 *        schema:
 *          type: string
 *          default: 62c062bfb8c62699cb437362
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                response:
 *                  type: number
 *                  defualt: 1
 *                message:
 *                  type: string
 *                  defualt: ""
 *                data:
 *                  $ref: '#/components/schemas/GetBrandByIdResponse'
 *      409:
 *        description: Confilct
 *      400:
 *        description: Bad request
 */
router.get(
  '/brands/:_id',
  [passport.authenticate('jwt', { session: false }), validate(getBrandByIdSchema)],
  getBrandByIdController
);

export default router;
