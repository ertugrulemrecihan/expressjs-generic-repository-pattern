import httpStatus from 'http-status';
import client from '../helpers/redis/RedisClient';
import RedisHelper from '../helpers/redis/RedisHelper';
import ApiDataSuccess from '../responses/success/ApiDataSuccess';
import { NextFunction, Request, Response } from 'express';
import { isArray } from 'util';

const cache =
  (controller: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    if (client.isReady) {
      const controllerName = controller.constructor.name;
      req.controllerName = controllerName;

      const cachedData = await RedisHelper.getCache(req);

      if (cachedData) {
        return ApiDataSuccess.sendData(
          JSON.parse(cachedData),
          'Cached data retrieved',
          httpStatus.OK,
          res
        );
      }
      return next();
    } else {
      return next();
    }
  };

export = cache;
