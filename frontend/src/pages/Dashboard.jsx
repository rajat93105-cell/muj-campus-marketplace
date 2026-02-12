import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import api from "../services/api";
import Overview from "../components/dashboard/Overview";
import MyProducts from "../components/dashboard/MyProducts";
import Analytics from "../components/dashboard/Analytics";
import Settings from "../components/dashboard/Settings";
import { LayoutDashboard, Package, BarChart2, Settings as SettingsIcon } from "lucide-react";

const Dashboard = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        fetchMyProducts();
    }, []);

    const fetchMyProducts = async () => {
        try {
            const { data } = await api.get("/products/my-products");
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch my products", error);
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case "overview":
                return <Overview products={products} />;
            case "products":
                return <MyProducts products={products} refreshProducts={fetchMyProducts} />;
            case "analytics":
                return <Analytics products={products} />;
            case "settings":
                return <Settings />;
            default:
                return <Overview products={products} />;
        }
    };

    const menuItems = [
        { id: "overview", label: "Overview", icon: LayoutDashboard },
        { id: "products", label: "My Products", icon: Package },
        { id: "analytics", label: "Analytics", icon: BarChart2 },
        { id: "settings", label: "Settings", icon: SettingsIcon },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">

            {/* Sidebar */}
            <div className="hidden md:block w-64 bg-white border-r p-6 sticky top-0 h-screen">
                <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white">
                        ⬢
                    </div>
                    Seller Hub
                </h2>

                <div className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${activeTab === item.id
                                    ? "bg-purple-50 text-purple-600"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-purple-600"
                                    }`}
                            >
                                <Icon size={20} />
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 md:p-10">
                <h1 className="text-3xl font-bold mb-8">
                    {activeTab === "overview" && (
                        <span>
                            Welcome back, <span className="text-purple-600">{user?.name}</span>
                        </span>
                    )}
                    {activeTab === "products" && "My Listings"}
                    {activeTab === "analytics" && "Analytics"}
                    {activeTab === "settings" && "Account Settings"}
                </h1>

                {renderContent()}
            </div>
        </div>
    );
};

export default Dashboard;
