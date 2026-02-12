import {
    PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip,
} from "recharts";

const COLORS = ["#7c3aed", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

const Analytics = ({ products }) => {
    const categoryData = Object.values(
        products.reduce((acc, p) => {
            const cat = p.category || "Other";
            acc[cat] = acc[cat] || { name: cat, value: 0 };
            acc[cat].value += 1;
            return acc;
        }, {})
    );

    return (
        <div className="grid lg:grid-cols-2 gap-8 mt-12">
            {/* Category Distribution */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="font-semibold mb-4">Category Distribution</h3>
                <div className="h-64">
                    {categoryData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    dataKey="value"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label
                                >
                                    {categoryData.map((_, index) => (
                                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-400">
                            No products listed yet
                        </div>
                    )}
                </div>
            </div>

            {/* Revenue Trends */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="font-semibold mb-4">Revenue Over Time</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[]}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#7c3aed" />
                        </LineChart>
                    </ResponsiveContainer>
                    <div className="text-center text-gray-400 text-sm mt-2">
                        (Data verification pending)
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
