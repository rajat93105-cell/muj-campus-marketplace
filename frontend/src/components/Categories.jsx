const categories = [
    {
        title: "Electronics",
        desc: "Laptops, phones, accessories",
        image: "https://images.unsplash.com/photo-1510557880182-3eec6d5d1b8b"
    },
    {
        title: "Books & Study Material",
        desc: "Textbooks, notes, calculators",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
    },
    {
        title: "Room Essentials",
        desc: "Furniture, bedding, decor",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
    },
    {
        title: "Other Useful Stuff",
        desc: "Cycles, bags, equipment",
        image: "https://images.unsplash.com/photo-1520975918318-7d8c1c9c0c5e"
    }
];

import { useNavigate } from "react-router-dom";

const Categories = () => {
    const navigate = useNavigate();
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-4xl font-bold text-center text-gray-900">
                    Curated <span className="text-purple-600">Categories</span>
                </h2>

                <p className="text-center text-gray-600 mt-4">
                    Only relevant campus essentials. No spam, no junk.
                </p>

                <div className="grid md:grid-cols-4 gap-8 mt-14">
                    {categories.map((cat, index) => (
                        <div
                            key={index}
                            onClick={() => navigate("/marketplace")}
                            className="relative rounded-2xl overflow-hidden group shadow-lg cursor-pointer"
                        >
                            <img
                                src={cat.image}
                                className="h-64 w-full object-cover group-hover:scale-110 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 text-white">
                                <h3 className="text-lg font-semibold">{cat.title}</h3>
                                <p className="text-sm opacity-80">{cat.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Categories;
