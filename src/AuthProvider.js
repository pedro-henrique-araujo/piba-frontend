import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(localStorage.getItem('token') || null);

    function updateToken(newToken) {
        setToken(newToken);
        if (newToken) {
            localStorage.setItem('token', newToken);
            return;
        }
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={
            { token, setToken: updateToken }
        }>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}