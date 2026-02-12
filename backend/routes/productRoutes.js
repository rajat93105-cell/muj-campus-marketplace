const express = require("express");
const router = express.Router();
const {
    addProduct,
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    markAsSold,
    getMyProducts,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

router.post("/", protect, upload.single("image"), addProduct);
// ⚠️ Route order matters! /my-products must be before /:id
router.get("/my-products", protect, getMyProducts);
router.get("/", getProducts);

router.get("/:id", getProductById);
router.delete("/:id", protect, deleteProduct);
router.put("/:id", protect, updateProduct);
router.patch("/:id/sold", protect, markAsSold);

module.exports = router;
