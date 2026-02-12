const Overview = ({ products }) => {
    const totalListings = products.length;
    const sold = products.filter((p) => p.status === "sold").length;
    const revenue = products
        .filter((p) => p.status === "sold")
        .reduce((acc, p) => acc + (p.price || 0), 0);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-gray-500 text-sm">Total Listings</p>
                <h2 className="text-3xl font-bold mt-2">{totalListings}</h2>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-gray-500 text-sm">Items Sold</p>
                <h2 className="text-3xl font-bold mt-2">{sold}</h2>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <h2 className="text-3xl font-bold mt-2">₹{revenue}</h2>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-gray-500 text-sm">Wishlist Saves</p>
                <h2 className="text-3xl font-bold mt-2">0</h2>
            </div>
        </div>
    );
};

export default Overview;
