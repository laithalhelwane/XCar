import { Router } from 'express';
import passport from 'passport';
import validate from '../../middleware/validateResouce';
import {
  createAppointmentSchema,
  changeAppointmentStatusSchema,
  deleteAppointmentsSchema
} from './appointment.schema';
import {
  createAppointmentController,
  getAppointmentsController,
  getNotificationsController,
  changeAppointmentStatusController,
  deleteAppointmentController
} from './appointment.controller';
const router = Router();
/**
 * @openapi
 * '/appointments':
 *  post:
 *    tags:
 *      - Car
 *    summary: Request new Appointment
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateAppointmentInput'
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
 *                  example: 1
 *                message:
 *                  type: string
 *                  example: ""
 *                data:
 *                  $ref: '#/components/schemas/CreateAppointmentResponse'
 *      409:
 *        description: Confilct
 *      400:
 *        description: Bad request
 */
router.post(
  '/appointments',
  [
    passport.authenticate('jwt', { session: false }),
    validate(createAppointmentSchema),
  ],
  createAppointmentController
);
/**
 * @openapi
 * '/appointments':
 *  get:
 *    tags:
 *      - Car
 *    summary: Get user's appointment
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
 *                    received:
 *                      $ref: '#/components/schemas/GetMyAppointmentsResponse'
 *                    sent:
 *                      $ref: '#/components/schemas/GetMyAppointmentsResponse'
 *      409:
 *        description: Confilct
 *      400:
 *        description: Bad request
 */
router.get(
  '/appointments',
  passport.authenticate('jwt', { session: false }),
  getAppointmentsController
);
/**
 * @openapi
 * '/appointments/{id}':
 *  delete:
 *    tags:
 *      - Car
 *    summary: Cancel Appointment
 *    parameters:
 *      - id:
 *        name: id
 *        in: path
 *        description: The Id of the appointment
 *        required: true
 *        schema:
 *          type: string
 *          default: 62c062bfb8c62699cb437362
 *
 */ 
router.delete(
  '/appointments/:_id',
  [
    passport.authenticate('jwt', { session: false }),
    validate(deleteAppointmentsSchema),
  ],
  deleteAppointmentController
);
/**
 * @openapi
 * '/notifications':
 *  get:
 *    tags:
 *      - Car
 *    summary: Get user's notifications
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
 *                  $ref: '#/components/schemas/GetNotificationsResponse'
 *      409:
 *        description: Confilct
 *      400:
 *        description: Bad request
 */
router.get(
  '/notifications',
  passport.authenticate('jwt', { session: false }),
  getNotificationsController
);
/**
 * @openapi
 * '/notifications/{id}':
 *  put:
 *    tags:
 *      - Car
 *    summary: Accept of reject Appointment
 *    parameters:
 *      - id:
 *        name: id
 *        in: path
 *        description: The Id of the appointment
 *        required: true
 *        schema:
 *          type: string
 *          default: 62c062bfb8c62699cb437362
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ChangeAppointmentStatusInput'
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
 *                  $ref: '#/components/schemas/ChangeAppointmentStatusResponse'
 *      409:
 *        description: Confilct
 *      400:
 *        description: Bad request
 */
router.put(
  '/notifications/:_id',
  [
    passport.authenticate('jwt', { session: false }),
    validate(changeAppointmentStatusSchema),
  ],
  changeAppointmentStatusController
);
export default router;
