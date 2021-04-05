const Sequelize = require('sequelize');

const isDev = process.env.NODE_ENV !== 'production';

const dialectOptions = {
    ssl: {}
}

if (!isDev) {
    dialectOptions.ssl = false;
    dialectOptions.ssl.rejectUnauthorized = true;
}

console.log(process.env.DATABASE_URL)

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: process.env.DB_ENABLE_SSL && {
        require: true
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model.js')(sequelize, Sequelize);

module.exports = db;