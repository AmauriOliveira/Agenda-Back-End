export default {
  jwt: {
    secret: process.env.SECRET_MD5,
    expiresIn: '1d',
  },
};
