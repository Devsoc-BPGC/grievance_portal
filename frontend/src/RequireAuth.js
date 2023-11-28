import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "./useAuth";
function UnauthorisedUser(){
    const {setAuth} = useAuth();
    useEffect(() => {
        localStorage.removeItem('user');
        alert("Error: Unauthorised User. Please contact PS division in case you are not registered.");
        setAuth({});
        window.location.reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return <h1>Error 401: Unauthorised User. Please contact PS division in case you are not registered.</h1>
}
function RequireAuth() {
    const { auth } = useAuth();
    const location = useLocation();
    console.log("AAAA", auth);
    return (
        auth?.name
                ? <UnauthorisedUser />
                : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth;