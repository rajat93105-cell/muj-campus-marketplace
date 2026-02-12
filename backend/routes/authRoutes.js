const express = require("express");
const router = express.Router();
const { registerUser, loginUser, updateUserProfile } = require("../controllers/authController");

console.log("AuthRoutes Loaded");

const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", protect, updateUserProfile); // Protected route

module.exports = router;
