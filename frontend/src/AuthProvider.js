import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/getUser")
      .then(res => {
        if (res.status === 200) {
          setUser(res.data);
          navigate("/", { replace: true });
        } else {
          navigate("/login", { replace: true });
        }
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        navigate("/login", { replace: true });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
