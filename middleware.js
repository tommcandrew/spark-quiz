const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  console.log("checking token");
  const token = req.header("x-auth-token");

  //chceck for token
  if (!token) {
    console.log("no token");
    return res.status(401).json({ message: "No token, authorization denied" });
  } else {
    try {
      //verify token
      const decoded = jwt.verify(token, "secretkey");
      //add user from payload
      req.user = decoded;
      console.log("everythings grand");
      next();
    } catch (e) {
      console.log("tokens not valid");
      res.status(400).json({
        message: "Token is not valid",
      });
    }
  }
}

module.exports = auth;
