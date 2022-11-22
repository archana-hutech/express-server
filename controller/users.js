const express = require("express");
const jwt = require("jsonwebtoken");
const { Users } = require("../model/db");
const users = require("../model/users");
let route = express.Router();
const {
  addUser,
  getUser,
  updateUser,
  deletedUser,
  loginUtility,
} = require("../utility/users");
const { authorizeUser } = require("../utility/auth");

// signup user
route.post("/signup", async (req, res) => {
  try {
    console.log("user signup.........");
    let respose = await addUser(req.body);
    res.status(respose?.statusCode).json(respose);
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "failed to register user",
      error: error.message,
    });
  }
});

route.post("/login", async (req, res) => {
  try {
    console.log("login success........");
    const userExist = await loginUtility(req.body.email, req.body.password);
    res.status(userExist?.statusCode).json(userExist);
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "failed to login",
      error: error.message,
    });
  }
});

// post user
route.post("/adduser", authorizeUser, async (req, res) => {
  try {
    console.log("add user.........");
    const crtUser = await addUser(req.body);
    res.status(crtUser?.statusCode).json(crtUser);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
});

//get user
route.get("/getuser", authorizeUser, async (req, res) => {
  try {
    const userInf = await getUser();
    res.status(userInf?.statusCode).json(userInf);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
});

//get user by id
route.get("/getbyid/:id", authorizeUser, async (req, res) => {
  try {
    let userDetail = await getUser(req?.params?.id);
    res.status(userDetail?.statusCode).json(userDetail);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
});

//update user by id
route.put("/updateuser/:id", authorizeUser, async (req, res) => {
  try {
    let userDispaly = await updateUser(req?.params?.id, req?.body);
    res.status(userDispaly?.statusCode).json(userDispaly);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
});

//delete by id
route.delete("/delete/:id", authorizeUser, async (req, res) => {
  try {
    let userDelete = await deletedUser(req?.params?.id);
    res.status(userDelete?.statusCode).json(userDelete);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
});

module.exports = route;
