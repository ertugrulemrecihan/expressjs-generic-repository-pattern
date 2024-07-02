import { NextFunction, Request, Response } from 'express';
import ApiError from '../responses/error/ApiError';
import httpStatus from 'http-status';
import JWT from 'jsonwebtoken';
import IUserModel from '../../app/model/interfaces/IUserModel';
import UserBusiness from '../../app/business/UserBusiness';

interface IVerifiedToken extends JWT.JwtPayload {
  data: {
    id: string;
    email: string;
  };
}

const authenticateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return next(new ApiError('Access denied', httpStatus.UNAUTHORIZED));
  }

  const decoded: IVerifiedToken = JWT.verify(
    token,
    process.env.JWT_ACCESS_SECRET as string
  ) as IVerifiedToken;

  if (!decoded) {
    return next(new ApiError('Access denied', httpStatus.UNAUTHORIZED));
  }

  const userBusiness = new UserBusiness();
  userBusiness.findById(parseInt(decoded.data.id), (error, result) => {
    if (error) {
      return next(
        new ApiError('An error occurred', httpStatus.INTERNAL_SERVER_ERROR)
      );
    }

    if (!result) {
      return next(new ApiError('User not found', httpStatus.NOT_FOUND));
    }

    req.user = result as IUserModel;
    next();
  });
};

export default authenticateMiddleware;
