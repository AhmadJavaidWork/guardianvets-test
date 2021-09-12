const { body, validationResult } = require('express-validator');

const registerValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ success: false, data: { errors: errors.array() } });
  }
  next();
};

const validations = [
  body('email').isEmail(),
  body('email').isLength({ max: 255 }),
  body('password').isLength({ min: 8, max: 50 }),
];

const userView = (user) => {
  user = {
    id: user.id,
    email: user.email,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  };
  return user;
};

const userTokenView = (user) => {
  user = {
    id: user.id,
    email: user.email,
  };
  return user;
};

module.exports = {
  registerValidator,
  validations,
  userTokenView,
  userView,
};
