import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import ApiError from '../responses/error/ApiError';

const ErrorHandler = (
  err: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .json(err.toJSON());
  }

  console.error(err);

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    error: {
      message: 'Internal Server Error',
    },
    success: false,
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
  });
};

export default ErrorHandler;
