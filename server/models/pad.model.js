const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Pad = sequelize.define("pad", {
        id: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            defaultValue: null
        },
        rawContent: {
            type: DataTypes.TEXT,
            defaultValue: null
        },
        title: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        type: {
            type: DataTypes.STRING,
            validate: {
                isIn: [["PUBLIC", "PRIVATE"]]
            },
            defaultValue: "PUBLIC",
            allowNull: false
        }
    });

    return Pad;
}