let express = require('express');
const { Users } = require('../model/db');
const users = require('../model/users');
let route = express.Router();
const { addUser, getUser, updateUser, deletedUser } = require('../utility/users');

// post user
route.post('/adduser', async (req, res) => {
    try {
        const crtUser = await addUser(req.body);
        res.status(200).json(crtUser);
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" });
    }

});

//get user
route.get('/getuser', async (req, res) => {
    try {
        const userInf = await getUser();
        res.status(200).json(userInf);
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" });
    }
});

//get user by id
route.get('/getbyid/:id', async (req, res) => {
    try {
        let userdetail = await getUser(req?.params?.id)
        res.status(200).json({ userdetail });
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" });
    }
});

//update user by id
route.put('/updateuser/:id', async (req, res) => {
    try {
        let userdispaly = await updateUser(req?.params?.id, req?.body)
        res.status(200).json({ userdispaly });
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" });
    }
});

//delete by id
route.delete('/delete/:id', async (req, res) => {
    try {
        console.log(req?.params?.id);
        let userdelete = await deletedUser(req?.params?.id)
        res.status(200).json({ userdelete });
        return userdelete;
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" });
    }
})

module.exports = route;
