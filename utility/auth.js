const db = require("../model/db");
const users = require("../model/users");
const jwt = require("jsonwebtoken");

async function createJWTToken(id, email) {
  //get the matched user details
  //create JWT token which includes id & email
  const token = jwt.sign(
    { user: { id, email } },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  console.log(token);
  return { idToken: token, refreshToken: "na" };
}

async function authorizeUser(req, res, next) {
  console.log("Authorizing user permission.....");
  const authHeader = req.headers["authorization"];
  const tokenDetails = authHeader ? authHeader.split(" ")[1] : null;
  if (tokenDetails == null) res.send(401);
  jwt.verify(tokenDetails, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(401);
    } else {
      console.log("Authorized user");
      req.user = user;
      next();
    }
  });
}

module.exports = { createJWTToken, authorizeUser };
