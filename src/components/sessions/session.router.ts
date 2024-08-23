import express from 'express';
import passport, { Passport } from 'passport';
import validate from '../../middleware/validateResouce';
import {
  createSessionController,
  deleteSessionController,
} from './session.controller';
import { createSessionSchema } from './session.schema';
const router = express.Router();
/**
 * @openapi
 * '/sessions'  :
 *  post:
 *    tags:
 *      - Session
 *    summary: Create new session
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateSessionInput'
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
 *                  $ref: '#/components/schemas/CreateSessionResponse'
 *      409:
 *        description: Conflict
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                response:
 *                  type: number
 *                  example: 0
 *                message:
 *                  type: string
 *                  example: 'erorr text'
 *                data:
 *                  type: object
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                error_code:
 *                  type: number
 *                  example: 400
 *                message:
 *                  type: string
 *
 */
router.post(
  '/sessions',
  validate(createSessionSchema),
  createSessionController
);
/**
 * @openapi
 * '/sessions'  :
 *  delete:
 *    tags:
 *      - Session
 *    summary: Delete current session
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
 *                  $ref: '#/components/schemas/CreateSessionResponse'
 *      409:
 *        description: Conflict
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                response:
 *                  type: number
 *                  example: 0
 *                message:
 *                  type: string
 *                  example: 'erorr text'
 *                data:
 *                  type: object
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                error_code:
 *                  type: number
 *                  example: 400
 *                message:
 *                  type: string
 *
 */
router.delete(
  '/sessions',
  passport.authenticate('jwt', { session: false }),
  deleteSessionController
);

export default router;
