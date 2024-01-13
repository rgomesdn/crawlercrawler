const Sequelize = require('sequelize');
const database = require('./db');

const Customer = database.define('customer', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    cnpj: {
        type: Sequelize.STRING,
        allowNull: false
    },
    corporate_name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Customer;