
import { ROUTES } from "@muc/constants";
import { useAuth } from "@muc/context";
import { LinearProgress } from "@mui/material";

import { Navigate, Outlet, useLocation } from "react-router-dom";


export const SecureRoutes = () => {
    const { user, loading } = useAuth();
    const location = useLocation();
  
    if (loading) {
        return <LinearProgress />
    }


    return !user ? <Navigate to={ROUTES.Login} state={{ from: location }} replace /> : <Outlet />
}




export default SecureRoutes
