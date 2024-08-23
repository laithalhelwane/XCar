import { object, string, number, TypeOf, boolean, undefined, array } from 'zod';
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateCarInput:
 *       type: object
 *       required:
 *         - brand
 *         - model
 *         - price
 *         - forSale
 *         - kilometerage
 *         - location
 *       properties:
 *         brand:
 *           type: string
 *           example: Honda
 *           minLength: 1
 *         model:
 *           type: string
 *           example: 325
 *           maxLength: 100
 *           minLength: 1
 *         price:
 *           type: number
 *           example: 10000
 *           format: double
 *           minimum: 0
 *         kilometerage:
 *           type: number
 *           example: 10000
 *           format: double
 *           minimum: 0
 *         forSale:
 *           type: boolean
 *           example: true
 *         location:
 *           type: string
 *           example: Homs
 *           minLength: 1
 *         description:
 *           type: string
 *           example: description
 *         images:
 *           type: array
 *           items:
 *            type: string
 *            format: base64
 *     CreateCarResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 63d53e52695b8d0a93233af0
 *         brand:
 *           type: string
 *           example: Honda
 *         model:
 *           type: string
 *           example: X325
 *         price:
 *           type: number
 *           example: 10000
 *           format: double
 *         rate:
 *           type: number
 *           example: 2
 *           format: double
 *         kilometerage:
 *           type: number
 *           example: 10000
 *           format: double
 *         forSale:
 *           type: boolean
 *           example: true
 *         isLiked:
 *           type: boolean
 *           example: true
 *         isAppointmentRequested:
 *           type: boolean
 *           example: true
 *         isRated:
 *           type: boolean
 *           example: true
 *         location:
 *           type: string
 *           example: Homs
 *         description:
 *           type: string
 *           example: description
 *         images:
 *           type: array
 *           items:
 *            type: string
 *            default: 'link'
 *         createdAt:
 *           type: string
 *           format: date
 *           example: 2022-07-12T13:38:34.025Z
 *         updatedAt:
 *           type: string
 *           format: date
 *           example: 2022-07-12T13:38:34.025Z
 */
export const createCarSchema = object({
  body: object({
    brand: string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    }).min(3),
    price: number({
      required_error: 'price is required',
      invalid_type_error: 'price must be a number',
    })
      .nonnegative({ message: 'price must be postive' })
      .or(
        string()
          .regex(/\d+/)
          .transform(Number)
          .refine((n) => n >= 0)
      ),
    forSale: boolean().or(string().transform(Boolean)),
    model: string(),
    location: string(),
    description: string().optional(),
    kilometerage: number()
      .min(0)
      .or(
        string()
          .regex(/\d+/)
          .transform(Number)
          .refine((n) => n >= 0)
      ),
  }).strict(),
});
export const getCarSchema = object({
  params: object({
    _id: string(),
  }).strict(),
});
/**
 * @openapi
 * components:
 *   schemas:
 *     RateCarInput:
 *       type: object
 *       required:
 *         - rateValue
 *       properties:
 *         rateValue:
 *           type: number
 *           example: 2
 *           format: double
 *           minimum: 0
 *           maximum: 5
 *     RateCarResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 63d53e52695b8d0a93233af0
 *         owner:
 *           type: string
 *           example: 63d53e52695b8d0a93233af0
 *         car:
 *           type: string
 *           example: 6d2y3e52695b8d0a9323r42a
 *         rateValue:
 *           type: number
 *           example: 2
 *         createdAt:
 *           type: string
 *           format: date
 *           example: 2022-07-12T13:38:34.025Z
 *         updatedAt:
 *           type: string
 *           format: date
 *           example: 2022-07-12T13:38:34.025Z
 */
export const rateCarSchema = object({
  params: object({
    _id: string(),
  }),
  body: object({
    rateValue: number().int().min(1).max(5),
  }).strict(),
});
/**
 * @openapi
 * components:
 *   schemas:
 *     AddFavoriteCarResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 63d53e52695b8d0a93233af0
 *         owner:
 *           type: string
 *           example: 63d53e52695b8d0a93233af0
 *         car:
 *           type: string
 *           example: 6d2y3e52695b8d0a9323r42a
 *         createdAt:
 *           type: string
 *           format: date
 *           example: 2022-07-12T13:38:34.025Z
 *         updatedAt:
 *           type: string
 *           format: date
 *           example: 2022-07-12T13:38:34.025Z
 */
export const addFavoriteCarSchema = object({
  params: object({
    _id: string(),
  }),
});
/**
 * @openapi
 * components:
 *   schemas:
 *     deleteCarResponse:
 *       type: object
 *       properties:
 *         acknowledged:
 *           type: boolean
 *           example: true
 *         deleteCount:
 *           type: number
 *           example: 1
 */
export const deleteCarSchema = object({
  params: object({
    _id: string(),
  }),
});
/**
 * @openapi
 * components:
 *   schemas:
 *     deleteFavoriteCarResponse:
 *       type: object
 *       properties:
 *         acknowledged:
 *           type: boolean
 *           example: true
 *         deleteCount:
 *           type: number
 *           example: 1
 */
export const deleteFavoriteCarSchema = object({
  params: object({
    _id: string(),
  }),
});
/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateCarInput:
 *       type: object
 *       properties:
 *         brand:
 *           type: string
 *           example: Honda
 *           minLength: 1
 *         model:
 *           type: string
 *           example: 325
 *           maxLength: 100
 *           minLength: 1
 *         price:
 *           type: number
 *           example: 10000
 *           format: double
 *           minimum: 0
 *         kilometerage:
 *           type: number
 *           example: 10000
 *           format: double
 *           minimum: 0
 *         forSale:
 *           type: boolean
 *           example: true
 *         location:
 *           type: string
 *           example: Homs
 *           minLength: 1
 *         description:
 *           type: string
 *           example: description
 *         images:
 *           type: array
 *           items:
 *            type: string
 *            format: base64
 */
export const updateCarSchema = object({
  params: object({
    _id: string(),
  }),
  body: object({
    brand: string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    })
      .min(3)
      .optional(),
    price: number({
      required_error: 'price is required',
      invalid_type_error: 'price must be a number',
    })
      .nonnegative({ message: 'price must be postive' })
      .or(
        string()
          .regex(/\d+/)
          .transform(Number)
          .refine((n) => n >= 0)
      )
      .optional(),
    forSale: boolean().or(string().transform(Boolean)).optional(),
    model: string().optional(),
    location: string().optional(),
    description: string().optional(),
    kilometerage: number()
      .min(0)
      .or(
        string()
          .regex(/\d+/)
          .transform(Number)
          .refine((n) => n >= 0)
      )
      .optional(),
  }).strict(),
});
export const getCarsSchema = object({
  query: object({
    forSale: boolean().or(string().transform(Boolean)).optional(),
    price_max: number()
      .min(0)
      .or(
        string()
          .regex(/\d+/)
          .transform(Number)
          .refine((n) => n >= 0)
      ).or(string())
      .optional(),
    price_min: number()
      .min(0)
      .or(
        string()
          .regex(/\d+/)
          .transform(Number)
          .refine((n) => n >= 0)
      )
      .optional().or(string()),
    location: string().optional(),
    brand: string().optional(),
    odo_max: number()
      .min(0)
      .or(
        string()
          .regex(/\d+/)
          .transform(Number)
          .refine((n) => n >= 0)
      ).or(string())
      .optional(),
    odo_min: number()
      .min(0)
      .or(
        string()
          .regex(/\d+/)
          .transform(Number)
          .refine((n) => n >= 0)
      ).or(string())
      .optional(),
  }).optional(),
});
export type createCarInput = TypeOf<typeof createCarSchema>;
export type getCarInput = TypeOf<typeof getCarSchema>;
export type rateCarInput = TypeOf<typeof rateCarSchema>;
export type addFavoriteCarInput = TypeOf<typeof addFavoriteCarSchema>;
export type deleteFavoriteCarInput = TypeOf<typeof deleteFavoriteCarSchema>;
export type updateCarInput = TypeOf<typeof updateCarSchema>;
export type deleteCarInput = TypeOf<typeof deleteCarSchema>;
export type getCarsInput = TypeOf<typeof getCarsSchema>;
