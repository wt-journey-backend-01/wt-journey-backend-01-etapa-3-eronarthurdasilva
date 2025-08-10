const knexConfig = require('../knexfile');
const knex = require('knex');

const environment = process.env.NODE_ENV || 'development';
const db = knex(knexConfig[environment]);

module.exports = db;