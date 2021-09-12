const knex = require('../../services/knex');

const findUserByEmail = (email) => {
  return knex('users')
    .where({ email })
    .then((user) => user[0]);
};

const register = (user) => {
  return knex('users')
    .insert(user)
    .returning('*')
    .then((user) => user[0]);
};

module.exports = {
  findUserByEmail,
  register,
};
