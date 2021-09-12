const { genSalt, hash } = require('bcrypt');

const genHash = async (password) => {
  const salt = await genSalt(10);
  password = await hash(password, salt);
  return password;
};

module.exports = {
  genHash,
};
