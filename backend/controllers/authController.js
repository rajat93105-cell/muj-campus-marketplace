const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

// REGISTER USER
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, hostelBlock } = req.body;
    console.log("Register Request Body:", req.body); // Log incoming data

    if (!name || !email || !password || !hostelBlock) {
        res.status(400);
        throw new Error("All fields are required");
    }

    // MUJ Email Validation
    if (!email.endsWith("@muj.manipal.edu")) {
        res.status(400);
        throw new Error("Only MUJ email addresses are allowed");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        hostelBlock,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            hostelBlock: user.hostelBlock,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// LOGIN USER
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            hostelBlock: user.hostelBlock,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// 👤 UPDATE USER PROFILE
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.hostelBlock = req.body.hostelBlock || user.hostelBlock;

        // Email update is sensitive, typically requires re-verification, 
        // but for now let's allow it with the same MUJ validation if needed.
        // user.email = req.body.email || user.email; 

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            hostelBlock: updatedUser.hostelBlock,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

module.exports = { registerUser, loginUser, updateUserProfile };
