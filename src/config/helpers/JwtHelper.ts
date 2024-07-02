import JWT = require('jsonwebtoken');

const generateAccessToken = (data: Object) => {
  return JWT.sign({ data }, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: process.env.JWT_ACCESS_EXP,
  });
};

export = {
  generateAccessToken,
};
