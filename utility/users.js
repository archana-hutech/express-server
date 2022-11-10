const { where } = require('sequelize');
const { Users } = require('../model/db');
const db = require('../model/db');
const users = require('../model/users');

async function addUser(users) {
    try {
        const usersInfo = await db.Users.create(users)
        return usersInfo.get();
    } catch (error) {
        return ({ success: false, statusCode: 500, message: "internal server error", error: error.message });
    }
}

async function getUser(id = null) {
    try {
        const usersdetails = await db.Users.findAll({ where: id ? { id } : {} });
        return usersdetails;
    } catch (error) {
        //console.log(error);
        return ({ success: false, statusCode: 500, message: "internal server error", error: error.message });
    }
}

async function updateUser(id, user) {
    try {
        const updatedUser = await db.Users.update(user, { where: { id } });
        return user;
    } catch (error) {
        return ({ success: false, statusCode: 500, message: "internal server error", error: error.message });
    }
}

async function deletedUser(id) {
    try {
        const delUser = await db.Users.destroy({ where: { id } });
        return delUser;
    } catch (error) {
        return ({ success: false, statusCode: 500, message: "internal server error", error: error.message });
    }
}

module.exports = { addUser, getUser, updateUser, deletedUser };
