import { object, string, TypeOf } from 'zod';
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateSessionInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: email@gmail.com
 *         password:
 *           type: string
 *           example: password
 *         fcmToken:
 *           type: string
 *           example: token
 *     CreateSessionResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: token
 *         expiresIn:
 *           type: string
 *           example: 1y
 *         user:
 *            $ref: '#/components/schemas/CreateUserResponse'
 */
export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string',
    }),
    password: string({
      required_error: 'password is required',
      invalid_type_error: 'password must be a string',
    }),
    fcmToken: string({
      required_error: 'fcmToken is required',
      invalid_type_error: 'fcmToken must be a string',
    })
  }).strict(),
});

export type createSessionInput = TypeOf<typeof createSessionSchema>;
