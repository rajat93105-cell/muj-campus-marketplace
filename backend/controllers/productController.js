const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../config/cloudinary");

// 🛍 ADD PRODUCT (Protected)
const addProduct = asyncHandler(async (req, res) => {
    const { title, description, price, category, condition } = req.body;
    let hostelBlock = req.body.hostelBlock || req.user.hostelBlock; // Auto-fill from user profile
    let imageUrl = req.body.imageUrl;

    if (!title || !description || !price || !category || !condition || !hostelBlock) {
        res.status(400);
        throw new Error("All fields are required");
    }

    // Image Upload to Cloudinary
    if (req.file) {
        const uploadStream = (buffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "muj-marketplace" },
                    (error, result) => {
                        if (result) resolve(result);
                        else reject(error);
                    }
                );
                stream.end(buffer);
            });
        };

        const result = await uploadStream(req.file.buffer);
        imageUrl = result.secure_url;
    }

    const product = await Product.create({
        title,
        description,
        price,
        category,
        condition,
        hostelBlock,
        seller: req.user._id, // from auth middleware
        imageUrl,
    });

    res.status(201).json(product);
});

// 📦 GET PRODUCTS WITH FILTERING + PAGINATION
const getProducts = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;

    const keyword = req.query.keyword
        ? {
            title: {
                $regex: req.query.keyword,
                $options: "i",
            },
        }
        : {};

    const category = req.query.category
        ? { category: req.query.category }
        : {};

    const priceFilter =
        req.query.minPrice && req.query.maxPrice
            ? {
                price: {
                    $gte: Number(req.query.minPrice),
                    $lte: Number(req.query.maxPrice),
                },
            }
            : {};

    const filter = {
        isDeleted: false,
        status: { $ne: "sold" }, // Filter out sold items
        ...keyword,
        ...category,
        ...priceFilter,
    };

    const count = await Product.countDocuments(filter);

    const products = await Product.find(filter)
        .populate("seller", "name email hostelBlock")
        .limit(limit)
        .skip(limit * (page - 1))
        .sort({ createdAt: -1 });

    res.json({
        products,
        page,
        pages: Math.ceil(count / limit),
        totalProducts: count,
    });
});

// 📦 GET SINGLE PRODUCT
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate(
        "seller",
        "name email hostelBlock"
    );

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

// ❌ DELETE PRODUCT (Soft Delete - Only Owner)
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    // Check ownership
    if (product.seller.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("Not authorized to delete this product");
    }

    // Soft Delete
    product.isDeleted = true;
    product.deletedAt = new Date();
    await product.save();

    res.json({ message: "Product soft-deleted successfully" });
});

// ✏ UPDATE PRODUCT (Only Owner)
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    if (product.seller.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("Not authorized to update this product");
    }

    product.title = req.body.title || product.title;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.condition = req.body.condition || product.condition;
    product.hostelBlock = req.body.hostelBlock || product.hostelBlock;
    product.imageUrl = req.body.imageUrl || product.imageUrl;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
});

// 🟢 MARK AS SOLD (Only Owner)
const markAsSold = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    if (product.seller.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("Not authorized");
    }

    product.status = "sold";
    await product.save();

    res.json({ message: "Product marked as sold", product });
});

// 📦 GET MY PRODUCTS (Protected)
const getMyProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({
        seller: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(products);
});

module.exports = {
    addProduct,
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    markAsSold,
    getMyProducts,
};
