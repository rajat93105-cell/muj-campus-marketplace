const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        condition: {
            type: String,
            required: true,
        },
        hostelBlock: {
            type: String,
            required: true,
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        imageUrl: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            enum: ["available", "sold"],
            default: "available",
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
