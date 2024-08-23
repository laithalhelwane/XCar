import express from 'express';
import passport from 'passport';
import upload from '../../middleware/multer';
import {
  createCarController,
  getCarsController,
  getCarConroller,
  rateCarController,
  addFavoriteCarController,
  deleteFavoriteCarController,
  getUserFavoriteController,
  getUserCarController,
  updateCarConroller,
  getHomeController,
  deleteCarsController,
  getPopularController,
  getTopRatedController,
} from './car.controller';
import validate from '../../middleware/validateResouce';
import {
  rateCarSchema,
  createCarSchema,
  getCarSchema,
  addFavoriteCarSchema,
  deleteFavoriteCarSchema,
  updateCarSchema,
  deleteCarSchema,
  getCarsSchema,
} from './car.schema';

const router = express.Router();
/**
 * @openapi
 * '/cars/me':
 *  get:
 *    tags:
 *      - Car
 *    summary: Get user's cars
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
 *                    $ref: '#/components/schemas/CreateCarResponse'
 *      409:
 *        description: Confilct
 *      400:
 *        description: Bad request
 */
router.get(
  '/cars/me',
  passport.authenticate('jwt', { session: false }),
  getUserCarController
);
/**
 * @openapi
 * '/cars':
 *  post:
 *    tags:
 *      - Car
 *    summary: Create a new car
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/CreateCarInput'
 *    responses:
 *      201:
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
 *                  $ref: '#/components/schemas/CreateCarResponse'
 *      409:
 *        description: Confilct
 *      400:
 *        description: Bad request
 */
router.post(
  '/cars',
  [
    passport.authenticate('jwt', { session: false }),
    upload.array('images'),
    validate(createCarSchema),
  ],
  createCarController
);
/**
 * @openapi
 * '/cars':
 *  get:
 *    tags:
 *      - Car
 *    summary: Get all cars from database
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
 *                    $ref: '#/components/schemas/CreateCarResponse'
 *      409:
 *        description: Confilct
 *      400:
 *        description: Bad request
 */
router.get(
  '/cars',
  [passport.authenticate('jwt', { session: false }), validate(getCarsSchema)],
  getCarsController
);
/**
 * @openapi
 * '/cars/{id}':
 *  delete:
 *    tags:
 *      - Car
 *    summary: Delete car from database
 *    parameters:
 *      - id:
 *        name: id
 *        in: path
 *        description: The Id of the car
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
 *                  $ref: '#/components/schemas/CreateCarResponse'
 *      409:
 *        description: Confilct
 *      400:
 *        description: Bad request
 */
router.delete(
  '/cars/:_id',
  [passport.authenticate('jwt', { session: false }), validate(deleteCarSchema)],
  deleteCarsController
);
/**
 * @openapi
 * '/cars/{id}':
 *  get:
 *    tags:
 *      - Car
 *    summary: Get car by id from database
 *    parameters:
 *      - id:
 *        name: id
 *        in: path
 *        description: The Id of the car
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
 *                  $ref: '#/components/schemas/CreateCarResponse'
 *      409:
 *        description: Confilct
 *      400:
 *        description: Bad request
 */
router.get(
  '/cars/:_id',
  [passport.authenticate('jwt', { session: false }), validate(getCarSchema)],
  getCarConroller
);
/**
 * @openapi
 * '/cars/{id}':
 *  patch:
 *    tags:
 *      - Car
 *    summary: Edit car data
 *    parameters:
 *      - id:
 *        name: id
 *        in: path
 *        description: The Id of the car
 *        required: true
 *        schema:
 *          type: string
 *          default: 62c062bfb8c62699cb437362
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/UpdateCarInput'
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
 *                  $ref: '#/components/schemas/CreateCarResponse'
 *      409:
 *        description: Confilct
 *      400:
 *        description: Bad request
 */
router.patch(
  '/cars/:_id',
  [
    passport.authenticate('jwt', { session: false }),
    upload.array('images'),
    validate(updateCarSchema),
  ],
  updateCarConroller
);
/**
 * @openapi
 * '/cars/{id}/rate':
 *  post:
 *    tags:
 *      - Car
 *    summary: rate cars by id
 *    parameters:
 *      - id:
 *        name: id
 *        in: path
 *        description: The Id of the car
 *        required: true
 *        schema:
 *          type: string
 *          default: 62c062bfb8c62699cb437362
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/RateCarInput'
 *    responses:
 *      201:
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
 *                  $ref: '#/components/schemas/RateCarResponse'
 *      409:
 *        description: Confilct
 *      400:
 *        description: Bad request
 */
router.post(
  '/cars/:_id/rate',
  [passport.authenticate('jwt', { session: false }), validate(rateCarSchema)],
  rateCarController
);

/**
 * @openapi
 * '/cars/{id}/fav':
 *  post:
 *    tags:
 *      - Car
 *    summary: Add Car to user's favorites
 *    parameters:
 *      - id:
 *        name: id
 *        in: path
 *        description: The Id of the car
 *        required: true
 *        schema:
 *          type: string
 *          default: 62c062bfb8c62699cb437362
 *    responses:
 *      201:
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
 *                  $ref: '#/components/schemas/AddFavoriteCarResponse'
 *      409:
 *        description: Confilct
 *      400:
 *        description: Bad request
 */

router.post(
  '/cars/:_id/fav',
  [
    passport.authenticate('jwt', { session: false }),
    validate(addFavoriteCarSchema),
  ],
  addFavoriteCarController
);
/**
 * @openapi
 * '/cars/{id}/fav':
 *  delete:
 *    tags:
 *      - Car
 *    summary: Delete car from user's favorites
 *    parameters:
 *      - id:
 *        name: id
 *        in: path
 *        description: The Id of the car
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
 *                  $ref: '#/components/schemas/deleteFavoriteCarResponse'
 *      409:
 *        description: Confilct
 *      400:
 *        description: Bad request
 */

router.delete(
  '/cars/:_id/fav',
  [
    passport.authenticate('jwt', { session: false }),
    validate(deleteFavoriteCarSchema),
  ],
  deleteFavoriteCarController
);
/**
 * @openapi
 * '/favorite':
 *  get:
 *    tags:
 *      - Car
 *    summary: Get favorite cars
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
 *                    $ref: '#/components/schemas/CreateCarResponse'
 *      409:
 *        description: Confilct
 *      400:
 *        description: Bad request
 */
router.get(
  '/favorite',
  passport.authenticate('jwt', { session: false }),
  getUserFavoriteController
);
/**
 * @openapi
 * '/home':
 *  get:
 *    tags:
 *      - Car
 *    summary: Get Home Page Data
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
 *                  type: object
 *                  properties:
 *                    "Top Rated":
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/CreateCarResponse'
 *                    "What's New":
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/CreateCarResponse'
 *      409:
 *        description: Confilct
 *      400:
 *        description: Bad request
 */
router.get(
  '/home',
  passport.authenticate('jwt', { session: false }),
  getHomeController
);
/**
 * @openapi
 * '/topRated':
 *  get:
 *    tags:
 *      - Car
 *    summary: Get top rated cars
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
 *                    $ref: '#/components/schemas/CreateCarResponse'
 *      409:
 *        description: Confilct
 *      400:
 *        description: Bad request
 */
router.get(
  '/topRated',
  passport.authenticate('jwt', { session: false }),
  getTopRatedController
);
/**
 * @openapi
 * '/popular':
 *  get:
 *    tags:
 *      - Car
 *    summary: Get popular cars
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
 *                    $ref: '#/components/schemas/CreateCarResponse'
 *      409:
 *        description: Confilct
 *      400:
 *        description: Bad request
 */
router.get(
  '/popular',
  passport.authenticate('jwt', { session: false }),
  getPopularController
);
export default router;
