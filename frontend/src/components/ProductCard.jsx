import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const ProductCard = ({ product }) => {
    const { user } = useAuth(); // Need to access auth to check wishlist? 
    // Ideally we pass isWishlisted prop or check internal list. 
    // For now simple alert on wishlist click.

    const handleWishlist = async (e) => {
        e.preventDefault(); // prevent navigation
        if (!user) return alert("Please login to save items");
        try {
            await api.post("/users/wishlist", { productId: product._id });
            alert("Wishlist updated!"); // Replace with toast later
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition border border-gray-200 group">

            <div className="relative">
                <img
                    src={product.imageUrl || product.image} // Fallback for imageUrl
                    alt={product.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                />

                <span className={`absolute top-4 left-4 px-3 py-1 text-sm rounded-full font-medium ${product.condition === "New"
                    ? "bg-green-100 text-green-600"
                    : "bg-orange-100 text-orange-600"
                    }`}>
                    {product.condition}
                </span>

                <button
                    onClick={handleWishlist}
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:text-red-500 transition"
                >
                    <Heart size={18} />
                </button>
            </div>

            <div className="p-5">
                <h2 className="font-semibold text-lg truncate">
                    {product.title}
                </h2>

                <p className="text-purple-600 font-bold text-xl mt-3">
                    ₹{product.price}
                </p>

                <Link
                    to={`/product/${product._id}`}
                    className="block mt-4 text-sm text-purple-600 hover:underline"
                >
                    View Details →
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
