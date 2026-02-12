import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { Heart, ArrowLeft, MessageCircle, Share2, MapPin } from "lucide-react";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth(); // Get current user
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        fetchProductDetails();
    }, [id]);

    const handleChatWithSeller = async () => {
        if (!user) {
            alert("Please login to chat with seller");
            navigate("/login");
            return;
        }
        if (user._id === product.seller._id) {
            alert("You cannot chat with yourself!");
            return;
        }

        try {
            // Initiate chat by sending a first message (optional, or just go to chat)
            // Strategy: Send a "Hey, I'm interested..." message automatically
            await api.post("/chat", {
                receiverId: product.seller._id,
                content: `👋 Hi, I'm interested in your listing: ${product.title}`,
                productId: product._id
            });

            navigate(`/chat?userId=${product.seller._id}`);
        } catch (error) {
            console.error("Failed to start chat", error);
        }
    };

    const fetchProductDetails = async () => {
        try {
            const res = await api.get(`/products/${id}`);
            setProduct(res.data);
        } catch (error) {
            console.error("Failed to fetch product", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found.</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-500 hover:text-purple-600 mb-8 transition"
            >
                <ArrowLeft size={20} className="mr-2" /> Back to Marketplace
            </button>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Image Section */}
                <div className="space-y-4">
                    <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden border border-gray-200 shadow-sm relative">
                        <img
                            src={product.image || product.imageUrl}
                            alt={product.title}
                            className="w-full h-full object-cover"
                        />
                        <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md text-gray-400 hover:text-red-500 transition">
                            <Heart size={24} />
                        </button>
                    </div>
                </div>

                {/* Details Section */}
                <div>
                    <div className="flex items-center space-x-2 text-sm text-purple-600 font-semibold mb-2">
                        <span className="bg-purple-50 px-3 py-1 rounded-full">{product.category}</span>
                        <span className={`px-3 py-1 rounded-full ${product.condition === "New" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                            }`}>
                            {product.condition}
                        </span>
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.title}</h1>
                    <div className="text-3xl font-bold text-gray-900 mb-6 font-mono">₹{product.price}</div>

                    <div className="flex items-center space-x-4 mb-8">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {product.seller?.name?.charAt(0) || "U"}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">{product.seller?.name || "Unknown Seller"}</p>
                                <p className="text-xs text-gray-500">{product.seller?.hostelBlock || "Campus"}</p>
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-8">
                        {product.description}
                    </p>

                    <div className="flex space-x-4">
                        <button
                            onClick={handleChatWithSeller}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition flex items-center justify-center space-x-2"
                        >
                            <MessageCircle size={20} />
                            <span>Chat with Seller</span>
                        </button>
                        <button className="bg-white border border-gray-200 text-gray-700 p-4 rounded-xl hover:bg-gray-50 transition shadow-sm">
                            <Share2 size={20} />
                        </button>
                    </div>

                    <p className="text-xs text-center text-gray-400 mt-4">
                        Safety Tip: Meet in public places like library or food court.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
