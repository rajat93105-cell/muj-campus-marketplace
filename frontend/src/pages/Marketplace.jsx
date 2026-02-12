import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { Search } from "lucide-react";

const categories = [
    "All",
    "Room Essentials",
    "Books & Study",
    "Electronics",
    "Other",
];

const Marketplace = () => {
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const { data } = await api.get("/products");
        setProducts(data.products || []); // Ensure array fallback
    };

    const filtered = products.filter((p) => {
        const matchCategory =
            activeCategory === "All" || p.category === activeCategory;
        const matchSearch = p.title
            .toLowerCase()
            .includes(search.toLowerCase());

        return matchCategory && matchSearch;
    });

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">

            {/* Header */}
            <h1 className="text-4xl font-bold text-purple-600">
                Marketplace
            </h1>
            <p className="text-gray-500 mt-2">
                {filtered.length} items available from MUJ students
            </p>

            {/* Search */}
            <div className="relative mt-8">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search for items..."
                    className="w-full bg-white rounded-full pl-14 pr-6 py-4 shadow-sm border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-4 mt-8">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-3 rounded-full border transition ${activeCategory === cat
                                ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
                {filtered.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Marketplace;
