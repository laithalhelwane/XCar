import { date, object, string, TypeOf, z } from 'zod';
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateAppointmentInput:
 *       type: object
 *       required:
 *         - car
 *         - date
 *       properties:
 *         car:
 *           type: string
 *           example: 63d53e52695b8d0a93233af0
 *           minLength: 1
 *           maxLength: 20
 *         date:
 *           type: string
 *           example: date
 *     CreateAppointmentResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 63d53e52695b8d0a93233af0
 *         car:
 *           type: string
 *           example: 63d53e52695b8d0a93233af0
 *         receiver:
 *           type: string
 *           example: 63d53e52695b8d0a93233af0
 *         sender:
 *           type: string
 *           example: 63d53e52695b8d0a93233af0
 *         date:
 *           type: string
 *           format: date
 *           example: 2022-07-12T13:38:34.025Z
 *         status:
 *           type: string
 *           format: date
 *           example: pending
 *         updatedAt:
 *           type: string
 *           format: date
 *           example: 2022-07-12T13:38:34.025Z
 *         createdAt:
 *           type: string
 *           format: date
 *           example: 2022-07-12T13:38:34.025Z
 */
export const createAppointmentSchema = object({
  body: object({
    car: string(),
    date: string(),
  }),
});
/**
 * @openapi
 * components:
 *   schemas:
 *     ChangeAppointmentStatusInput:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum: [accepted, rejected]
 *           example: accepted
 *     ChangeAppointmentStatusResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 63d53e52695b8d0a93233af0
 *         car:
 *           type: string
 *           example: 63d53e52695b8d0a93233af0
 *         receiver:
 *           type: string
 *           example: 63d53e52695b8d0a93233af0
 *         sender:
 *           type: string
 *           example: 63d53e52695b8d0a93233af0
 *         date:
 *           type: string
 *           format: date
 *           example: 2022-07-12T13:38:34.025Z
 *         status:
 *           type: string
 *           format: date
 *           example: accepted
 *         updatedAt:
 *           type: string
 *           format: date
 *           example: 2022-07-12T13:38:34.025Z
 *         createdAt:
 *           type: string
 *           format: date
 *           example: 2022-07-12T13:38:34.025Z
 */
export const changeAppointmentStatusSchema = object({
  params: object({
    _id: string(),
  }),
  body: object({
    status: z.enum(['accepted', 'rejected']),
  }),
});

export const deleteAppointmentsSchema = object({
  params: object({
    _id: string(),
  }),
});
/**
 * @openapi
 * components:
 *   schemas:
 *     GetMyAppointmentsResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 63d53e52695b8d0a93233af0
 *         car:
 *           type: string
 *           example: 63d53e52695b8d0a93233af0
 *         receiver:
 *           type: object
 *           properties:
 *              _id:
 *                type: string
 *                example: 63d53e52695b8d0a93233af0
 *              name:
 *                type: string
 *                example: name
 *              avatar:
 *                type: string
 *                example: http://example.com
 *              phoneNumber:
 *                type: string
 *                example: 0934189422
 *         sender:
 *           type: object
 *           properties:
 *              _id:
 *                type: string
 *                example: 63d53e52695b8d0a93233af0
 *              name:
 *                type: string
 *                example: name
 *              phoneNumber:
 *                type: string
 *                example: 0934189422
 *              avatar:
 *                type: string
 *                example: http://example.com
 *         date:
 *           type: string
 *           format: date
 *           example: 2022-07-12T13:38:34.025Z
 *         status:
 *           type: string
 *           format: date
 *           example: accepted
 *         updatedAt:
 *           type: string
 *           format: date
 *           example: 2022-07-12T13:38:34.025Z
 *         createdAt:
 *           type: string
 *           format: date
 *           example: 2022-07-12T13:38:34.025Z
 *     GetNotificationsResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 63d53e52695b8d0a93233af0
 *         car:
 *           type: object
 *           properties:
 *              _id:
 *                type: string
 *                example: 63d53e52695b8d0a93233af0
 *              model:
 *                type: string
 *                example: model
 *              brand:
 *                type: string
 *                example: brand
 *         receiver:
 *           type: object
 *           properties:
 *              _id:
 *                type: string
 *                example: 63d53e52695b8d0a93233af0
 *              name:
 *                type: string
 *                example: name
 *              avatar:
 *                type: string
 *                example: http://example.com
 *              phoneNumber:
 *                type: string
 *                example: 0934189422
 *         sender:
 *           type: object
 *           properties:
 *              _id:
 *                type: string
 *                example: 63d53e52695b8d0a93233af0
 *              name:
 *                type: string
 *                example: name
 *              avatar:
 *                type: string
 *                example: http://example.com
 *              phoneNumber:
 *                type: string
 *                example: 0934189422
 *         date:
 *           type: string
 *           format: date
 *           example: 2022-07-12T13:38:34.025Z
 *         status:
 *           type: string
 *           format: date
 *           example: accepted
 *         updatedAt:
 *           type: string
 *           format: date
 *           example: 2022-07-12T13:38:34.025Z
 *         createdAt:
 *           type: string
 *           format: date
 *           example: 2022-07-12T13:38:34.025Z
 */
export type createAppointmentInput = TypeOf<typeof createAppointmentSchema>;
export type changeAppointmentStatusInput = TypeOf<
  typeof changeAppointmentStatusSchema
>;
export type deleteAppointmentsInput = TypeOf<typeof deleteAppointmentsSchema>;
