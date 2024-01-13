const Sequelize = require('sequelize');
const sequelize = new Sequelize('database_name', 'database_user', 'database_password', {dialect: 'mysql', host: 'database_host'});

module.exports = sequelize;