import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { Heart } from "lucide-react";

const Wishlist = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const { data } = await api.get("/users/wishlist");
            setProducts(data || []);
        } catch (error) {
            console.error("Failed to fetch wishlist", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                <Heart className="text-red-500 fill-current" size={36} />
                My Wishlist
            </h1>
            <p className="text-gray-500 mt-2 mb-10">
                Items you've saved for later
            </p>

            {loading ? (
                <p>Loading...</p>
            ) : products.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-3xl">
                    <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
