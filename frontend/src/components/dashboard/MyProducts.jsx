import { Trash2, CheckCircle, Edit } from "lucide-react";
import api from "../../services/api";

const MyProducts = ({ products, refreshProducts }) => {

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;
        try {
            await api.delete(`/products/${id}`);
            refreshProducts();
        } catch (error) {
            console.error("Failed to delete", error);
            alert("Failed to delete product");
        }
    };

    const handleMarkSold = async (id) => {
        try {
            await api.patch(`/products/${id}/sold`);
            refreshProducts();
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold mb-6">My Listings</h2>

            {products.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                    <p className="text-gray-500 text-lg">You haven't listed any products yet.</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-medium text-gray-500">Product</th>
                                    <th className="p-4 font-medium text-gray-500">Price</th>
                                    <th className="p-4 font-medium text-gray-500">Status</th>
                                    <th className="p-4 font-medium text-gray-500">Date</th>
                                    <th className="p-4 font-medium text-gray-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p) => (
                                    <tr key={p._id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden">
                                                    <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{p.title}</p>
                                                    <p className="text-xs text-gray-500">{p.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-purple-600 font-bold">₹{p.price}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.status === 'sold' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                {p.status || 'Available'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-500 text-sm">
                                            {new Date(p.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-2">
                                                {p.status !== 'sold' && (
                                                    <button
                                                        onClick={() => handleMarkSold(p._id)}
                                                        title="Mark as Sold"
                                                        className="p-2 hover:bg-green-50 text-green-600 rounded-full transition"
                                                    >
                                                        <CheckCircle size={18} />
                                                    </button>
                                                )}
                                                <button
                                                    title="Edit"
                                                    className="p-2 hover:bg-blue-50 text-blue-600 rounded-full transition"
                                                // Add edit functionality later if needed
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(p._id)}
                                                    title="Delete"
                                                    className="p-2 hover:bg-red-50 text-red-600 rounded-full transition"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyProducts;
