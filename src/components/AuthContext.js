import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        console.log('token : ' + storedToken);
        if (storedToken) {
            setToken(storedToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
    }, []);

    const login = (jwt) => {
        localStorage.setItem('jwtToken', jwt);
        setToken(jwt);
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        setToken(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
