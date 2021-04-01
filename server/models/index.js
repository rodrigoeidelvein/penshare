const Sequelize = require('sequelize');

const isDev = process.env.NODE_ENV !== 'production';

const dialectOptions = {}

if (!isDev) {
    dialectOptions.ssl.require = true;
    dialectOptions.ssl.rejectUnauthorized = true;
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model.js')(sequelize, Sequelize);

module.exports = db;