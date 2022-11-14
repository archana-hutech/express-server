async function createJWTToken(info) {
    //get the matched user details
    //create JWT token which includes info
    //return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

    //return { idToken: "", refreshToken: "na" };
}

async function authorizeUser(req, res, next) {
    console.log("Authorizing user permission.....");
    next();
    // const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1];
    // if (token == null) res.send(401);
    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //   if (err) return res.send(403);
    //   console.log(user);
    //   req.user = user;
    //   next();
    // });
}

module.exports = { createJWTToken, authorizeUser };