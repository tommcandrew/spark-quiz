const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
  const token = req.header("x-auth-token");

  //chceck for token
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  } else {
    try {
      //verify token
      const decoded = jwt.verify(token, "secretkey");
      //add user from payload
      req.user = decoded;
      next();
    } catch (e) {
      res.status(400).json({
        message: "Token is not valid",
      });
    }
  }
}

module.exports = checkAuth;
