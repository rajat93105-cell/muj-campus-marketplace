const express = require("express");
const router = express.Router();
const { toggleWishlist, getWishlist } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/wishlist", protect, toggleWishlist);
router.get("/wishlist", protect, getWishlist);

module.exports = router;
