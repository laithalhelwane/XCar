import { object, string, TypeOf, undefined } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUserInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - phoneNumber
 *         - location
 *       properties:
 *         name:
 *           type: string
 *           example: Dane Doe
 *           minLength: 1
 *           maxLength: 20
 *         email:
 *           type: string
 *           example: email@gmail.com
 *         password:
 *           type: string
 *           example: password
 *           minLength: 6
 *           maxLength: 25
 *         phoneNumber:
 *           type: string
 *           example: 0934189422
 *         location:
 *           type: string
 *           example: Homs
 *           minLength: 1
 *     CreateUserResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 63d53e52695b8d0a93233af0
 *         email:
 *           type: string
 *           example: jane@example.com
 *         name:
 *           type: string
 *           example: Dane Doe
 *         phoneNumber:
 *           type: string
 *           example: 0934189422
 *         location:
 *           type: string
 *           example: Homs
 *         updatedAt:
 *           type: string
 *           format: date
 *           example: 2022-07-12T13:38:34.025Z
 *         createdAt:
 *           type: string
 *           format: date
 *           example: 2022-07-12T13:38:34.025Z
 */

export const createUserSchema = object({
  body: object({
    email: string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string',
    }).email({ message: 'email is not a valid email' }),
    name: string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    })
      .min(1)
      .max(20),
    password: string({
      required_error: 'password is required',
      invalid_type_error: 'password must be a string',
    })
      .min(8, { message: 'password must be at least 8 charaters' })
      .max(25, { message: 'password must be at most 25 charaters' }),
    phoneNumber: string({
      required_error: 'phoneNunber is required',
    }),
    location: string().min(1),
  }).strict(),
});
/**
 * @openapi
 * components:
 *   schemas:
 *     EditUserInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Dane Doe
 *           minLength: 1
 *           maxLength: 20
 *         password:
 *           type: string
 *           example: password
 *           minLength: 6
 *           maxLength: 25
 *         phoneNumber:
 *           type: string
 *           example: 0934189422
 *         location:
 *           type: string
 *           example: Homs
 *           minLength: 1
 *     EditUserResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 63d53e52695b8d0a93233af0
 *         email:
 *           type: string
 *           example: jane@example.com
 *         name:
 *           type: string
 *           example: Dane Doe
 *         phoneNumber:
 *           type: string
 *           example: 0934189422
 *         location:
 *           type: string
 *           example: Homs
 *         avatar:
 *           type: string
 *           fromat: binary
 *           examlpe: "http://localhost:3000/static/64cfe2f4ec71b9917a5ba280"
 *         createdAt:
 *           type: string
 *           format: date
 *           example: 2022-07-12T13:38:34.025Z
 *         updatedAt:
 *           type: string
 *           format: date
 *           example: 2022-07-12T13:38:34.025Z
 */
export const editUserSchema = object({
  body: object({
    name: string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    })
      .min(1)
      .max(20)
      .optional(),
    password: string({
      required_error: 'password is required',
      invalid_type_error: 'password must be a string',
    })
      .min(8, { message: 'password must be at least 8 charaters' })
      .max(25, { message: 'password must be at most 25 charaters' })
      .optional(),
    phoneNumber: string({
      required_error: 'phoneNunber is required',
    }).optional(),
    location: string().min(1).optional(),
  }).strict(),
});

export type createUserInput = TypeOf<typeof createUserSchema>;
export type editUserInput = TypeOf<typeof editUserSchema>;
