const { where } = require('sequelize');
const { Users } = require('../model/db');
const db = require('../model/db');
const users = require('../model/users');

async function addUser(users) {
    try {
        const usersInfo = await db.Users.create(users)
        return ({ success: true, statusCode: 200, message: "user created successfully", user: { usersInfo } });
    } catch (error) {
        return ({ success: false, statusCode: 404, message: "user not found", error: error.message });
    }
}

async function getUser(id = null) {
    try {
        const usersdetails = await db.Users.findAll({ where: id ? { id } : {} });
        if (!usersdetails.length) throw "user not found";
        return ({ success: true, statusCode: 200, message: "got user details", user: { usersdetails } });
    } catch (error) {
        return ({ success: false, statusCode: 404, message: "user not found", error: error.message });
    }
}

async function updateUser(id, user) {
    try {
        const updatedUser = await db.Users.update(user, { where: { id } });
        return ({ success: true, statusCode: 200, message: "user update successful", user: { user } });
    } catch (error) {
        return ({ success: false, statusCode: 404, message: "user not found", error: error.message });
    }
}

async function deletedUser(id) {
    try {
        const delUser = await db.Users.destroy({ where: { id } });
        return ({ success: true, statusCode: 200, message: "user deleted successfully" });
    } catch (error) {
        return ({ success: false, statusCode: 404, message: "user not found", error: error.message });
    }
}

module.exports = { addUser, getUser, updateUser, deletedUser };
