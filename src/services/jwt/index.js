const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const { jwtSecret, expiresIn } = require('../../config');

const jwtSign = Promise.promisify(jwt.sign);
const jwtVerify = Promise.promisify(jwt.verify);

const sign = (user, options = { expiresIn }, method = jwtSign) =>
  method({ user }, jwtSecret, options);

const signSync = (user, options) => sign(user, options, jwt.sign);

const verify = (token) => jwtVerify(token, jwtSecret);

module.exports = {
  sign,
  signSync,
  verify,
};
