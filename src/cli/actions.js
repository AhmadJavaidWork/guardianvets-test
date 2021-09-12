const bcrypt = require('bcrypt');
const moment = require('moment');
const queries = require('../api/user/queries');
const { genHash } = require('../services/bcrypt');
const { sign, verify } = require('../services/jwt');
const { userTokenView, userView } = require('../api/user/helpers');

const emailValidationRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const registerValidator = (email, password) => {
  const isEmailValid = emailValidationRegEx.test(email);
  if (!isEmailValid) return 'Invalid Email';
  if (password.length < 8)
    return 'Password is too short. Password must be between 8 to 50 characters long';
  if (password.length > 50)
    return 'Password is too long. Password must be between 8 to 50 characters long';
  return true;
};

const logger = (data) => {
  console.log('Details:');
  console.log('Id:    ', data.user.id);
  console.log('Email: ', data.user.email);
  console.log('Token: ', data.accessToken);
  return;
};

const register = async (email, password) => {
  const validation = registerValidator(email, password);
  if (validation !== true) {
    console.log(validation);
    return;
  }
  const checkUserExists = await queries.findUserByEmail(email);
  if (checkUserExists) {
    console.log('A user with this email already exists');
    return;
  }
  password = await genHash(password);
  const userInfo = await queries.register({ email, password });
  const accessToken = await sign(userTokenView(userInfo));
  const output = {
    user: userView(userInfo),
    accessToken,
  };
  logger(output);
  return;
};

const login = async (email, password) => {
  const user = await queries.findUserByEmail(email);
  if (!user) {
    console.log('Wrong Email Address');
    return;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const accessToken = await sign(userTokenView(user));
    const output = {
      user: userView(user),
      accessToken,
    };
    logger(output);
    return;
  }
  console.log('Wrong Password');
  return;
};

const logout = async (token) => {
  try {
    const { user, iat } = await verify(token);
    if (user) {
      const loggedInTimeStamp = parseInt(+new Date() / 1000) - iat;
      const formattedLoggedinTime = moment
        .utc(loggedInTimeStamp * 1000)
        .toString()
        .split(' ')[4];
      console.log(`Logged in time ${formattedLoggedinTime}`);
      return;
    }
    console.log('Token is invalid or is already expired');
    return;
  } catch (error) {
    console.log('Token is invalid or is already expired');
  }
};

module.exports = {
  register,
  login,
  logout,
};
