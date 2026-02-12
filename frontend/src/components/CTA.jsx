import { Link } from "react-router-dom";

const CTA = () => {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
                <div className="rounded-3xl bg-gradient-to-r from-purple-600 to-blue-500 text-white p-16 text-center shadow-xl">
                    <h2 className="text-4xl font-bold">
                        Ready to Start Trading?
                    </h2>

                    <p className="mt-4 text-lg opacity-90">
                        Join hundreds of MUJ students already using the marketplace.
                    </p>

                    <div className="mt-8 flex justify-center gap-6">
                        <Link
                            to="/sell"
                            className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:scale-105 transition inline-block"
                        >
                            Start Selling
                        </Link>
                        <Link
                            to="/marketplace"
                            className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-purple-600 transition inline-block"
                        >
                            Browse Items
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
