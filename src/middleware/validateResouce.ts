import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodIssue } from 'zod';

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      const message: string = error.issues.reduce(
        (prev: ZodIssue, issue: ZodIssue) =>
          prev.message + '\n' + issue.message,
        { message: '' }
      );
      return res.status(400).send({ response: 0, message, data: {} });
    }
  };
export default validate;
