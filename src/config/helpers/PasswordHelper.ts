import CryptoJs from 'crypto-js';

const passwordToHash = (plainPassword: string) => {
  const hashedPassword = CryptoJs.HmacSHA256(
    plainPassword,
    process.env.PASSWORD_HASH as string
  ).toString();

  return {
    hashedPassword,
  };
};

export = {
  passwordToHash,
};
