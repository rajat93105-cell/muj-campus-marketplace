import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, Home } from "lucide-react";

const Register = () => {
    const { register, loading } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        hostelBlock: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(
                form.name,
                form.email,
                form.password,
                form.hostelBlock
            );
            navigate("/dashboard");
        } catch (error) {
            console.error("Registration Error:", error);
            alert(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 px-6 transition-colors duration-300">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10 border border-gray-200 transition-colors duration-300">

                <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {[
                        { field: "name", icon: User, placeholder: "Full Name" },
                        { field: "email", icon: Mail, placeholder: "Email" },
                        { field: "password", icon: Lock, placeholder: "Password" },
                        { field: "hostelBlock", icon: Home, placeholder: "Hostel Block" },
                    ].map(({ field, icon: Icon, placeholder }) => (
                        <div key={field} className="flex items-center bg-gray-100 rounded-xl px-4 py-3 border border-transparent focus-within:border-purple-500 transition">
                            <Icon className="text-gray-400 mr-3" size={18} />
                            <input
                                type={field === "password" ? "password" : "text"}
                                required
                                placeholder={placeholder}
                                className="bg-transparent outline-none w-full text-gray-700"
                                onChange={(e) =>
                                    setForm({ ...form, [field]: e.target.value })
                                }
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] transition"
                    >
                        {loading ? "Creating..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-gray-500 mt-8">
                    Already have an account?{" "}
                    <Link to="/login" className="text-purple-600 font-medium hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
