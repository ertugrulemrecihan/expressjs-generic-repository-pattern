import { Request } from 'express';
import client from './RedisClient';
import { RedisCommandArgument } from '@redis/client/dist/lib/commands';

const createKey = (req: Request) => {
  const methodName = req.route.stack[req.route.stack.length - 1].name;

  const redisKey = `${process.env.APP_NAME}.${
    req.controllerName
  }.${methodName}${JSON.stringify(req.query)}${JSON.stringify(
    req.params
  )}${JSON.stringify(req.body)}${JSON.stringify(req.headers.authorization)}`;

  return redisKey;
};

const cache = async (req: Request, value: any) => {
  if (client.isReady) {
    const cacheKey = createKey(req);

    try {
      await client.set(cacheKey, JSON.stringify(value), {
        EX: parseInt(process.env.REDIS_CACHE_EXP as string) * 60,
      });
    } catch {}
  }
};

const getCache = async (req: Request) => {
  let cachedData = null;

  if (client.isReady) {
    const cacheKey = createKey(req);

    try {
      cachedData = await client.get(cacheKey);
    } catch {}
  }

  return cachedData;
};

const removeByPattern = async (pattern: RedisCommandArgument) => {
  if (client.isReady) {
    try {
      const keys = await client.keys(pattern);
      await client.del(keys);
    } catch {}
  }
};

const removeByClassName = async (className: string) => {
  const pattern = `${process.env.APP_NAME}.${className}.*`;

  await removeByPattern(pattern);
};

export = {
  cache,
  getCache,
  removeByPattern,
  removeByClassName,
};
