const Sequelize = require('sequelize');
const database = require('./db');

const Pca = database.define('pcas', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_customer: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    identification: {
        type: Sequelize.STRING,
        allowNull: false
    },
    budget_value: {
        type: Sequelize.STRING,
        allowNull: false
    },
    items: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Pca;