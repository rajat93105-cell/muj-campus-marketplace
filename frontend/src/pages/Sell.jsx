import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { UploadCloud } from "lucide-react";

const Sell = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        category: "",
        condition: "",
        price: "",
        description: "",
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (file) => {
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) return alert("Please upload an image");

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("title", form.title);
            formData.append("category", form.category);
            formData.append("condition", form.condition);
            formData.append("price", form.price);
            formData.append("description", form.description);
            formData.append("image", image);

            await api.post("/products", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            navigate("/marketplace");
        } catch (err) {
            console.error(err);
            alert("Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">

            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Sell an Item
            </h1>
            <p className="text-gray-500 mb-10">
                List your item for other MUJ students to find
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* IMAGE UPLOAD */}
                <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                    <label className="block text-lg font-semibold mb-4">
                        Product Images *
                    </label>

                    <div
                        className="border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-purple-500 transition"
                        onClick={() => document.getElementById("imageInput").click()}
                    >
                        {preview ? (
                            <img
                                src={preview}
                                alt="preview"
                                className="h-40 object-contain rounded-xl"
                            />
                        ) : (
                            <>
                                <UploadCloud size={40} />
                                <p className="mt-3">Add</p>
                                <p className="text-sm mt-2">
                                    Add up to 5 images. First image will be the cover.
                                </p>
                            </>
                        )}
                    </div>

                    <input
                        type="file"
                        id="imageInput"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleImageChange(e.target.files[0])}
                    />
                </div>

                {/* DETAILS */}
                <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm space-y-6">

                    <div>
                        <label className="font-medium">Product Name *</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g., HP Laptop 15 inch"
                            className="w-full mt-2 bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                            onChange={(e) =>
                                setForm({ ...form, title: e.target.value })
                            }
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="font-medium">Category *</label>
                            <select
                                required
                                className="w-full mt-2 bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                                onChange={(e) =>
                                    setForm({ ...form, category: e.target.value })
                                }
                            >
                                <option value="">Select category</option>
                                <option>Electronics</option>
                                <option>Books</option>
                                <option>Room Essentials</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="font-medium">Condition *</label>
                            <select
                                required
                                className="w-full mt-2 bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                                onChange={(e) =>
                                    setForm({ ...form, condition: e.target.value })
                                }
                            >
                                <option value="">Select condition</option>
                                <option>New</option>
                                <option>Like New</option>
                                <option>Good</option>
                                <option>Used</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="font-medium">Price (₹) *</label>
                        <input
                            type="number"
                            required
                            placeholder="Enter price"
                            className="w-full mt-2 bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                            onChange={(e) =>
                                setForm({ ...form, price: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <label className="font-medium">Description *</label>
                        <textarea
                            required
                            rows="4"
                            placeholder="Describe your item - include details like brand, model, age, defects..."
                            className="w-full mt-2 bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                            onChange={(e) =>
                                setForm({ ...form, description: e.target.value })
                            }
                        />
                    </div>

                </div>

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-5 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition"
                >
                    {loading ? "Listing..." : "List Item for Sale"}
                </button>

            </form>
        </div>
    );
};

export default Sell;
