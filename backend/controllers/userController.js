const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// ❤️ TOGGLE WISHLIST
const toggleWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const index = user.wishlist.indexOf(productId);

    if (index === -1) {
        // Add to wishlist
        user.wishlist.push(productId);
    } else {
        // Remove from wishlist
        user.wishlist.splice(index, 1);
    }

    await user.save();

    // Populate wishlist to return full objects if needed, or just IDs
    // For toggle, returning the updated list of IDs is usually enough for frontend state
    res.json(user.wishlist);
});

// 📋 GET USER WISHLIST
const getWishlist = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate("wishlist");

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.json(user.wishlist);
});

module.exports = { toggleWishlist, getWishlist };
