const Sequelize = require('sequelize');
const db = require('../index');

module.exports = db.define('template', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  }
})
