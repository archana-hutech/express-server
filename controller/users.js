let express = require('express');
let route = express.Router();
const { addUser, getUser } = require('../utility/users');

//post
//utility
//return response 

route.post('/adduser', async (req, res) => {
    try {
        console.log(req);
        const crtUser = await addUser(req.body);
        res.status(crtUser?.statusCode).json(crtUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server error" });
    }

});

route.get('/', async (req, res) => {
    try {
        const userInfo = await getUser();
        res.status(userInfo?.statusCode).json(userInfo);
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" });
    }
});

//get user by id
route.get('/:id', async (req, res) => {
    try {
        let user = await getUser(req?.params?.id)
        res.status(200).json({
            success: true,
            message: "user found",
            users: user.get()
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" });
    }
});

module.exports = route;
