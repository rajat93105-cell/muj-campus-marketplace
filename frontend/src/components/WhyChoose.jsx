import { Shield, Box, Users } from "lucide-react";

const WhyChoose = () => {
    return (
        <section className="bg-gray-50 py-20 px-8">
            <h2 className="text-4xl font-bold text-center">
                Why <span className="text-purple-600">Choose Us?</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">

                <div className="bg-white p-8 rounded-2xl shadow-md text-center">
                    <Shield className="mx-auto text-purple-600 mb-4" size={40} />
                    <h3 className="text-xl font-semibold">Verified Students Only</h3>
                    <p className="text-gray-600 mt-3">Only MUJ students with valid university email can join.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-md text-center">
                    <Box className="mx-auto text-purple-600 mb-4" size={40} />
                    <h3 className="text-xl font-semibold">Curated Categories</h3>
                    <p className="text-gray-600 mt-3">Only campus-relevant items, no spam or junk.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-md text-center">
                    <Users className="mx-auto text-purple-600 mb-4" size={40} />
                    <h3 className="text-xl font-semibold">Campus Community</h3>
                    <p className="text-gray-600 mt-3">Trade safely with trusted fellow students.</p>
                </div>

            </div>
        </section>
    );
};

export default WhyChoose;
