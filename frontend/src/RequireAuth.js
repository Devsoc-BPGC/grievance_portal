import { useEffect,useState } from "react";
import { Navigate, Outlet, useLocation,useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
const axios = require('axios')
function UnauthorisedUser(){
    const {setAuth} = useAuth();
    useEffect(() => {
        localStorage.removeItem('user');
        alert("Error: Unauthorised User. Please contact Developers' Society BITS Goa in case you are not registered.");
        setAuth({});
        window.location.reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return <h1>Error 401: Unauthorised User. Please contact Developers' Society BITS Goa in case you are not registered.</h1>
}

function RequireAuth() {
    const { auth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    return (
            auth
                ? <Outlet />
                : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth;