const { where } = require('sequelize');
const { Users } = require('../model/db');
const db = require('../model/db');
const users = require('../model/users');
const { createJWTToken } = require("../utility/auth");
const User = Users
async function loginUtility(email, password) {
    try {
        const userInfoExist = await User.findOne({ where: { email, password } });
        const userDetails = userInfoExist.get();
        if (userDetails?.id) {
            const tokenIfo = await createJWTToken(userDetails?.id, userDetails?.email)
            //console.log({ tokenIfo });
            return ({ success: true, statusCode: 200, ...tokenIfo, message: "user login success" });
        } else {
            return ({ success: false, statusCode: 401, message: "unauthorize" });
        }
    } catch (error) {
        console.log(error);
        return ({ success: false, statusCode: 500, message: "internal server error", error: error.message })
    }

}

async function addUser(users) {
    try {
        //console.log(users);
        const usersInfo = await User.create(users);
        //console.log({ usersInfo });
        if (users) {
            return ({ success: true, statusCode: 200, message: "user created successfully", user: usersInfo.get() });
        } else {
            return {
                success: false,
                statusCode: 500,
                message: "failed to register user",
            };
        }
    } catch (error) {
        return ({ success: false, statusCode: 500, message: "internal server error", error: error.message });
    }
}

async function getUser(id = null) {
    try {
        const usersDetails = await User.findAll({ where: id ? { id } : {} });
        //console.log(usersDetails);
        if (usersDetails.length > 0) {
           return ({ success: true, statusCode: 200, message: "User details found", user: id?usersDetails[0]:usersDetails });
        }else{
            return ({ success: false, statusCode: 404, message: "User details not found" });
        }
    } catch (error) {
        return ({ success: false, statusCode: 404, message: "user not found", error: error.message });
    }
}

async function updateUser(id, user) {
    try {
        const updatedUser = await User.update(user, { where: { id } });
        return ({ success: true, statusCode: 200, message: "user update successful", user: user });
    } catch (error) {
        return ({ success: false, statusCode: 500, message: "internal server error", error: error.message });
    }
}

async function deletedUser(id) {
    try {
        const delUser = await User.destroy({ where: { id } });
        return ({ success: true, statusCode: 200, message: "user deleted successfully" });
    } catch (error) {
        return ({ success: false, statusCode: 500, message: "internal server error", error: error.message });
    }
}

module.exports = { addUser, getUser, updateUser, deletedUser, loginUtility };
