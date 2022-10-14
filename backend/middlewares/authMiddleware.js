const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decode token to verify access
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decodedToken.id).select("-password");

      next();
    } catch (error) {
      res.status(404);
      throw new Error("Unauthorized access, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Unauthorized access, no token provided");
  }
});

module.exports = protect;
