import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye } from "lucide-react";

const Login = () => {
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(form.email, form.password);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login Error:", error);
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 px-6 transition-colors duration-300">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10 border border-gray-200 transition-colors duration-300">

                <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white text-xl font-bold">
                        ⬢
                    </div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        MUJ Marketplace
                    </h1>
                </div>

                <h2 className="text-3xl font-bold text-center text-gray-900">
                    Welcome Back
                </h2>

                <p className="text-center text-gray-500 mt-2 mb-8">
                    Sign in to your account
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="mt-2 flex items-center bg-gray-100 rounded-xl px-4 py-3 border border-transparent focus-within:border-purple-500 transition">
                            <Mail className="text-gray-400 mr-3" size={18} />
                            <input
                                type="email"
                                required
                                className="bg-transparent outline-none w-full text-gray-700"
                                placeholder="your@muj.manipal.edu"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-2 flex items-center bg-gray-100 rounded-xl px-4 py-3 border border-transparent focus-within:border-purple-500 transition">
                            <Lock className="text-gray-400 mr-3" size={18} />
                            <input
                                type="password"
                                required
                                className="bg-transparent outline-none w-full text-gray-700"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={(e) =>
                                    setForm({ ...form, password: e.target.value })
                                }
                            />
                            <Eye className="text-gray-400 cursor-pointer hover:text-purple-500 transition" size={18} />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] transition"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>

                </form>

                <p className="text-center text-gray-500 mt-8">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-purple-600 font-medium hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
