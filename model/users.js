const db = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define(
        "users",
        {
            name: {
                type: db.DataTypes.UUID,
                primarykey: true,
                defaultValue: db.DataTypes.UUIDV4
            },
            name: db.DataTypes.STRING,
            email: { type: db.DataTypes.STRING, allowNull: false, unique: true },
            phone: { type: db.DataTypes.STRING, allowNull: false },
            password: db.DataTypes.STRING,
        },
        { tableName: "users" }
    );

    return Users;
};