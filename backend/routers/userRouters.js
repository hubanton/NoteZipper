const express = require("express");
const {
  registerUser,
  authUser,
  updateUserProfile,
} = require("../controllers/userControllers");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").put(protect, updateUserProfile);

module.exports = router;
