import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    useEffect(() => {
        axios.get("/api/getUser").then(res => {
            console.log("res",res)
            setAuth(res?.data);
            navigate("/", { replace: true });
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;