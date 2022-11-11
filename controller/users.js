let express = require('express');
const { Users } = require('../model/db');
const users = require('../model/users');
let route = express.Router();
const { addUser, getUser, updateUser, deletedUser } = require('../utility/users');

// post user
route.post('/adduser', async (req, res) => {
    try {
        const crtUser = await addUser(req.body);
        res.status(crtUser?.statusCode).json(crtUser);
    } catch (error) {
        res.status(statusCode).json({ success: false, message: "internal server error", error: error.message });
    }

});

//get user
route.get('/getuser', async (req, res) => {
    try {
        const userInf = await getUser();
        res.status(userInf?.statusCode).json(userInf)
    } catch (error) {
        res.status(statusCode).json({ success: false, message: "internal server error", error: error.message });
    }
});

//get user by id
route.get('/getbyid/:id', async (req, res) => {
    try {
        let userdetail = await getUser(req?.params?.id)
        res.status(userdetail?.statusCode).json(userdetail)
    } catch (error) {
        res.status(statusCode).json({ success: false, message: "internal server error", error: error.message });
    }
});

//update user by id
route.put('/updateuser/:id', async (req, res) => {
    try {
        let userdispaly = await updateUser(req?.params?.id, req?.body)
        res.status(userdispaly?.statusCode).json(userdispaly)
    } catch (error) {
        res.status(statusCode).json({ success: false, message: "internal server error", error: error.message });
    }
});

//delete by id
route.delete('/delete/:id', async (req, res) => {
    try {
        let userdelete = await deletedUser(req?.params?.id)
        res.status(userdelete?.statusCode).json(userdelete)
    } catch (error) {
        res.status(statusCode).json({ success: false, message: "internal server error", error: error.message });
    }
})

module.exports = route;
