const Sequelize = require('sequelize');
const Model = require('./models/model');


const dbName = 'boilermaker';

// use database url in environment variable, otherwise use local database url if no environment variable is available
const db = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`, {
  logging: false,
});


// associations can be made here


// ^^^^^^^^^


module.exports = {
  db,
  Model
};
