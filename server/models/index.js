const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: process.env.DB_ENABLE_SSL && {
        require: true,
        rejectUnauthorized: false
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model.js')(sequelize, Sequelize);
db.pads = require('./pad.model')(sequelize, Sequelize);

db.users.hasMany(db.pads, { as: "pads"});
db.pads.belongsTo(db.users, {
    foreignKey: "userId",
    as: "author"
});

module.exports = db;