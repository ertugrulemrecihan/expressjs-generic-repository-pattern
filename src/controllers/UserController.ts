import { NextFunction, Request, Response } from 'express';
import UserBusiness = require('../app/business/UserBusiness');
import IBaseController = require('./interfaces/base/IBaseController');
import IUserModel = require('../app/model/interfaces/IUserModel');
import ApiError from '../config/responses/error/ApiError';
import httpStatus = require('http-status');
import passwordHelper = require('../config/helpers/PasswordHelper');
import jwtHelper = require('../config/helpers/JwtHelper');
import ApiDataSuccess from '../config/responses/success/ApiDataSuccess';

class UserController implements IBaseController<UserBusiness> {
  login(req: Request, res: Response, next: NextFunction): void {
    const reqUser = req.body as IUserModel;
    const userBusiness = new UserBusiness();

    userBusiness.findOneByQuery({ email: reqUser.email }, (error, result) => {
      if (error) {
        return next(
          new ApiError('An error occurred', httpStatus.INTERNAL_SERVER_ERROR)
        );
      }

      if (!result) {
        return next(
          new ApiError('Email or password incorrect', httpStatus.NOT_FOUND)
        );
      }

      const user = result as IUserModel;

      const hashedPassword = passwordHelper.passwordToHash(
        reqUser.password
      ).hashedPassword;

      if (user.password !== hashedPassword) {
        return next(
          new ApiError('Email or password incorrect', httpStatus.NOT_FOUND)
        );
      }

      const tokenData = {
        id: user.id,
        email: user.email,
      };

      const token = jwtHelper.generateAccessToken(tokenData);

      const response = {
        accessToken: token,
      };

      ApiDataSuccess.sendData(response, 'User logged in', httpStatus.OK, res);
    });
  }

  register(req: Request, res: Response, next: NextFunction): void {
    const reqUser = req.body as IUserModel;
    const userBusiness = new UserBusiness();

    userBusiness.findOneByQuery({ email: reqUser.email }, (error, result) => {
      if (error) {
        return next(
          new ApiError('An error occurred', httpStatus.INTERNAL_SERVER_ERROR)
        );
      }

      if (result) {
        return next(
          new ApiError('User already registered', httpStatus.CONFLICT)
        );
      }

      reqUser.password = passwordHelper.passwordToHash(
        reqUser.password
      ).hashedPassword;

      userBusiness.create(reqUser, (error, result) => {
        if (error) {
          return next(
            new ApiError('An error occurred', httpStatus.INTERNAL_SERVER_ERROR)
          );
        }

        const response = {
          id: result.id,
          email: result.email,
          name: result.name,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt,
        };

        ApiDataSuccess.sendData(
          response,
          'User registered',
          httpStatus.CREATED,
          res
        );
      });
    });
  }

  fetchAll(req: Request, res: Response): void {}

  findById(req: Request, res: Response): void {}

  findOneByQuery(req: Request, res: Response): void {}

  fetchByQuery(req: Request, res: Response): void {}

  create(req: Request, res: Response): void {}

  update(req: Request, res: Response): void {}

  delete(req: Request, res: Response): void {}
}

export = UserController;
