import client = require('./RedisClient');
import redisHelper = require('./RedisHelper');

let showErrorMessage = true;
let showDisconnectedMessage = true;

client.on('ready', async () => {
  try {
    await client.ping();
    showDisconnectedMessage = true;
    console.log('Connected to Redis 🚀');
    redisHelper.removeByPattern(`${process.env.APP_NAME}.*`);
  } catch (error) {
    if (showDisconnectedMessage) {
      console.log('Disconnected to Redis 🚫');
      showDisconnectedMessage = false;
    }
  }
});

client.on('error', async () => {
  if (showErrorMessage) {
    console.log('Redis connection failed 🚫');
    showErrorMessage = false;
  }
});

const connectRedis = async () => {
  client.connect();
};

export = () => {
  connectRedis();
};
