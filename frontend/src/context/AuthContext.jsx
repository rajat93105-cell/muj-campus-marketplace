import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    const login = async (email, password) => {
        try {
            setLoading(true);
            const { data } = await api.post("/auth/login", { email, password });
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            return data;
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password, hostelBlock) => {
        try {
            setLoading(true);
            const { data } = await api.post("/auth/register", {
                name,
                email,
                password,
                hostelBlock,
            });
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            return data;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
