require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});

const Rates = sequelize.define('Rates', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    currency: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    rate: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  }
);

module.exports = { sequelize, Rates };