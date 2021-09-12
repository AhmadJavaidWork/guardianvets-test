import moment from 'moment';
import queries from './queries';
import { sign } from '../../services/jwt';
import { genHash } from '../../services/bcrypt';
import { userTokenView, userView } from './helpers';

export const checkUserExists = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await queries.findUserByEmail(email);
    if (user) {
      return res.json({ success: false, error: 'User already exists' });
    }
    next();
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};

export const register = async ({ body }, res) => {
  try {
    const user = body;
    user.password = await genHash(user.password);
    const userInfo = await queries.register(user);
    const accessToken = await sign(userTokenView(userInfo));
    return res.json({
      success: true,
      data: { user: userView(userInfo), accessToken },
    });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};

export const signIn = async ({ user }, res) => {
  try {
    user = userView(user);
    const accessToken = await sign(userTokenView(user));
    return res.json({ success: true, data: { user, accessToken } });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};

export const signOut = async (req, res) => {
  try {
    const loggedInTimeStamp = parseInt(+new Date() / 1000) - req.iat;
    const formattedLoggedinTime = moment
      .utc(loggedInTimeStamp * 1000)
      .toString()
      .split(' ')[4];
    req.logout();

    return res.json({ success: true, loggedinTime: formattedLoggedinTime });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};
