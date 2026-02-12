import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import CTA from "../components/CTA";

const Home = () => {
    return (
        <Layout>
            <Hero />
            <Categories />
            <CTA />
        </Layout>
    );
};

export default Home;
