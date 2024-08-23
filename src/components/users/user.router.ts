import express from 'express';
import validate from '../../middleware/validateResouce';
import passport from 'passport';
import {
  createUserController,
  editUserController,
  getUserController,
} from './user.controller';
import { createUserSchema, editUserSchema } from './user.schema';
export const router = express.Router();

/**
 * @openapi
 * '/users':
 *  post:
 *    tags:
 *      - User
 *    summary: Register a new user
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/CreateUserInput'
 *          encoding:
 *            avatar:
 *              contentType: image/jpeg, image/png
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
 *                  $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Confilct
 *      400:
 *        description: Bad request
 */
router.post(
  '/users',
  [validate(createUserSchema)],
  createUserController
);
/**
 * @openapi
 * '/users':
 *  get:
 *    tags:
 *      - User
 *    summary: Get current user
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
 *                  $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Confilct
 *      400:
 *        description: Bad request
 */
router.get(
  '/users',
  passport.authenticate('jwt', { session: false }),
  getUserController
);
/**
 * @openapi
 * '/users':
 *  patch:
 *    tags:
 *      - User
 *    summary: Update user
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/EditUserInput'
 *          encoding:
 *            avatar:
 *              contentType: image/jpeg, image/png
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
 *                  $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Confilct
 *      400:
 *        description: Bad request
 */
router.patch(
  '/users',
  [passport.authenticate('jwt', { session: false }), validate(editUserSchema)],
  editUserController
);
export default router;
