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

db.users = require('./user.model.js')(sequelize);
db.pads = require('./pad.model')(sequelize);

db.users.hasMany(db.pads, { as: "pads"});
db.pads.belongsTo(db.users, {
    foreignKey: "userId",
    as: "author"
});

db.likes = require('./like.model')(sequelize, Sequelize);

db.likes.belongsTo(db.users, { foreignKey: "userId", targetKey: "id" });
db.likes.belongsTo(db.pads, { foreignKey: "padId", targetKey: "id" });
db.pads.hasMany(db.likes, { foreignKey: "padId", targetKey: "id" });
db.users.hasMany(db.likes, { foreignKey: "userId", targetKey: "id" });

module.exports = db;