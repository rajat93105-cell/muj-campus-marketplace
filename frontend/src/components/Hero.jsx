import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="bg-gradient-to-b from-white to-gray-100 py-20">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

                {/* Left */}
                <div>
                    <span className="inline-block px-4 py-1 text-sm font-medium rounded-full bg-purple-100 text-purple-600">
                        🎓 Exclusive for MUJ Students
                    </span>

                    <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
                        Buy & Sell <span className="text-purple-600">Campus Essentials</span> with Ease
                    </h1>

                    <p className="mt-6 text-lg text-gray-600 max-w-xl">
                        The trusted marketplace for Manipal University Jaipur. Trade textbooks, electronics, room essentials and more with fellow students.
                    </p>

                    <div className="mt-8 flex gap-4">
                        <Link
                            to="/marketplace"
                            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 transition flex items-center"
                        >
                            Browse Marketplace →
                        </Link>

                        <Link
                            to="/sell"
                            className="border border-gray-300 px-8 py-3 rounded-full hover:bg-gray-100 transition flex items-center"
                        >
                            Start Selling
                        </Link>
                    </div>

                    <p className="mt-6 text-sm text-gray-500">
                        Trusted by 500+ Students
                    </p>
                </div>

                {/* Right */}
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b"
                        className="rounded-3xl shadow-2xl"
                        alt="Students"
                    />
                </div>

            </div>
        </section>
    );
};

export default Hero;
