const knex = require('knex');
const config = require('./knexConfig');

const environmentConfig = config[process.env.NODE_ENV];
const connection = knex(environmentConfig);

module.exports = connection;
