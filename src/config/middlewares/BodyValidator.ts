import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { z, ZodSchema } from 'zod';
import ApiError from '../responses/error/ApiError';

class BodyValidator {
  validate =
    (schema: ZodSchema<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
      if (Object.keys(req.body || {}).length === 0) {
        return next(
          new ApiError('Request body must not be empty', httpStatus.BAD_REQUEST)
        );
      }

      try {
        schema.parse(req.body);
        next();
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errorMessage = `${error.errors[0].path.join(',')}: ${
            error.errors[0].message
          }`;
          return next(new ApiError(errorMessage, httpStatus.BAD_REQUEST));
        }
        next(
          new ApiError('Something went wrong', httpStatus.INTERNAL_SERVER_ERROR)
        );
      }
    };
}

export default BodyValidator;
