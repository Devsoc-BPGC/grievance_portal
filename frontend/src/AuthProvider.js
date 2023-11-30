import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("/api/getUser").then(res => {
            if(res.status===200){
                setAuth(true)
                navigate("/", { replace: true });
            }
            else {
                navigate("/login",{replace:true})
            }
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