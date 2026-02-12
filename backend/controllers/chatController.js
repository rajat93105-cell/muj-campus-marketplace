const asyncHandler = require("express-async-handler");
const Message = require("../models/Message");
const User = require("../models/User");

// 📨 SEND MESSAGE
const sendMessage = asyncHandler(async (req, res) => {
    const { receiverId, content, productId } = req.body;

    if (!receiverId || !content) {
        res.status(400);
        throw new Error("Receiver and content are required");
    }

    const message = await Message.create({
        sender: req.user._id,
        receiver: receiverId,
        content,
        product: productId || null,
    }); // TODO: Add socket.io emission here later

    const fullMessage = await Message.findById(message._id)
        .populate("sender", "name email")
        .populate("receiver", "name email")
        .populate("product", "title");

    res.status(201).json(fullMessage);
});

// 📜 GET MESSAGES WITH A USER
const getMessages = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const messages = await Message.find({
        $or: [
            { sender: req.user._id, receiver: userId },
            { sender: userId, receiver: req.user._id },
        ],
    })
        .sort({ createdAt: 1 })
        .populate("sender", "name email")
        .populate("receiver", "name email");

    res.json(messages);
});

// 👥 GET CONVERSATIONS (Users you have chattered with)
const getConversations = asyncHandler(async (req, res) => {
    // Find all messages where user is sender or receiver
    const messages = await Message.find({
        $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    })
        .sort({ createdAt: -1 })
        .populate("sender", "name email")
        .populate("receiver", "name email");

    // Extract unique users
    const users = new Map();

    messages.forEach((msg) => {
        const otherUser =
            msg.sender._id.toString() === req.user._id.toString()
                ? msg.receiver
                : msg.sender;

        if (!users.has(otherUser._id.toString())) {
            users.set(otherUser._id.toString(), {
                _id: otherUser._id,
                name: otherUser.name,
                email: otherUser.email,
                lastMessage: msg.content,
                timestamp: msg.createdAt
            });
        }
    });

    res.json(Array.from(users.values()));
});

module.exports = { sendMessage, getMessages, getConversations };
