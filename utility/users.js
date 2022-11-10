const { Users } = require('../model/db');
const db = require('../model/db');
const users = require('../model/users');

// exports.createUser = async (req, res) => {
//     const { name, email, phone, password } = req.body;
//     const { rows } = await db.query(
//         "INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4)",
//         [name, email, phone, password]
//     );
// }

async function addUser(users) {
    try {
        console.log("users", users);
        const usersInfo = await db.Users.create(users)
        console.log(usersInfo);
        return ({ success: usersInfo?.length > 0, statusCode: usersInfo?.length > 0 ? 200 : 404, message: usersInfo.length > 0 ? "User found" : "No user found" });
    } catch (error) {
        //console.log(error);
        return ({ success: false, statusCode: 500, message: "internal server error", error: error.message });
    }
}

async function getUser(id = null) {
    try {
        const users = await db.Users.findAll({ where: id ? { id } : {} })
        return ({ success: users?.length > 0, statusCode: users?.length > 0 ? 200 : 404, message: users.length > 0 ? "User found" : "No user found" });
    } catch (error) {
        return ({ success: false, statusCode: 500, message: "internal server error", error: error.message });
    }
}

module.exports = { addUser, getUser };

