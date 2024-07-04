import redis = require('redis');

const REDIS_RECONNECT_TIMEOUT = parseInt(
  process.env.REDIS_RECONNECT_TIMEOUT as string
);

const client = redis.createClient({
  socket: {
    host: 'localhost',
    port: 6379,
    reconnectStrategy: () => {
      return (REDIS_RECONNECT_TIMEOUT || 1000) * 1000;
    },
  },
});

export = client;
