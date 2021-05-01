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
db.roles = require('./role.model.js')(sequelize);
db.padAuthorizations = require('./padAuthorization.model')(sequelize, db.users, db.roles);

db.users.hasMany(db.pads, { as: "pads"});
db.pads.belongsTo(db.users, {
    foreignKey: "userId",
    as: "author"
});

db.users.hasMany(db.padAuthorizations, {
    as: "sharedPads"
})
db.padAuthorizations.belongsTo(db.users, {
    foreignKey: "userId",
    as: "author"
});

db.pads.hasMany(db.padAuthorizations, { as: "padId" });
db.padAuthorizations.belongsTo(db.pads);

db.roles.hasMany(db.padAuthorizations, { as: "sharedPads" });
db.padAuthorizations.belongsTo(db.roles, {
    foreignKey: "roleId",
    as: "role"
});

module.exports = db;