import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const Settings = () => {
    const { user, login } = useAuth(); // We might need a way to update user in context
    const [form, setForm] = useState({
        name: user?.name || "",
        hostelBlock: user?.hostelBlock || "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (form.password && form.password !== form.confirmPassword) {
            alert("Passwords do not match!");
            setLoading(false);
            return;
        }

        try {
            const updateData = {
                name: form.name,
                hostelBlock: form.hostelBlock
            };
            if (form.password) updateData.password = form.password;

            const { data } = await api.put("/auth/profile", updateData);

            // Optionally update local storage or context if needed
            // login(data.email, form.password || "oldpassword"); // This is tricky, maybe just alert for now
            alert("Profile updated successfully!");

            // Clear password fields
            setForm(prev => ({ ...prev, password: "", confirmPassword: "" }));
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl bg-white p-8 rounded-2xl shadow-sm mt-10">
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email (Read Only)</label>
                    <input
                        type="email"
                        value={user?.email}
                        disabled
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hostel Block</label>
                    <select
                        name="hostelBlock"
                        value={form.hostelBlock}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition"
                    >
                        {/* Add options matching Register.jsx if possible, or just text input */}
                        <option value="">Select Block</option>
                        {["B1", "B2", "B3", "B4", "B5", "G1", "G2", "G3", "G4"].map(b => (
                            <option key={b} value={b}>{b}</option>
                        ))}
                    </select>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Change Password</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Leave empty to keep current"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition"
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700 transition shadow-lg hover:shadow-purple-500/30"
                >
                    {loading ? "Saving Changes..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
};

export default Settings;
