const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-white transition-colors duration-300">
            {children}
        </div>
    );
};

export default Layout;
