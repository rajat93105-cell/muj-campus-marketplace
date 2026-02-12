import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { Moon, Sun, Heart, Plus, MessageCircle } from "lucide-react";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold">
                        ⬢
                    </div>
                    <h1 className="text-xl font-semibold text-gray-900">
                        MUJ Marketplace
                    </h1>
                </Link>

                {/* Middle Links */}
                <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
                    <Link to="/marketplace" className="hover:text-purple-600 transition">
                        Marketplace
                    </Link>
                    {user && (
                        <Link to="/dashboard" className="hover:text-purple-600 transition">
                            Dashboard
                        </Link>
                    )}
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">

                    {user && (
                        <>
                            <Link to="/chat" className="p-2 rounded-full hover:bg-gray-100 transition relative group">
                                <MessageCircle className="text-gray-600 group-hover:text-purple-600" size={20} />
                            </Link>
                            <Link to="/wishlist" className="p-2 rounded-full hover:bg-gray-100 transition">
                                <Heart className="text-gray-600 hover:text-red-500" size={20} />
                            </Link>
                        </>
                    )}

                    {!user ? (
                        <>
                            <Link
                                to="/login"
                                className="text-gray-700 font-medium hover:text-purple-600"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-5 py-2 rounded-full shadow hover:shadow-lg transition"
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/sell"
                                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-5 py-2 rounded-full shadow hover:shadow-lg transition"
                            >
                                <Plus size={18} />
                                Sell
                            </Link>

                            {/* Avatar */}
                            <div className="relative">
                                <div
                                    onClick={() => setOpen(!open)}
                                    className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold cursor-pointer"
                                >
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>

                                {open && (
                                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                                        <div className="px-4 py-3 text-sm text-gray-600 border-b">
                                            {user.email}
                                        </div>

                                        <Link
                                            to="/dashboard"
                                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Dashboard
                                        </Link>

                                        <Link
                                            to="/wishlist"
                                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Wishlist
                                        </Link>

                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 text-red-500"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
