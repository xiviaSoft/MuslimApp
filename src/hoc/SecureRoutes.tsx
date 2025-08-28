
import { ROUTES } from "@muc/constants";
import { useAuth } from "@muc/context";

import { Navigate, Outlet, useLocation } from "react-router-dom";


export const SecureRoutes = () => {
    const { user } = useAuth();
    const location = useLocation();
    console.log(user, "this is user in the secure rotues")



    return !user ? <Navigate to={ROUTES.HOME} state={{ from: location }} replace /> : <Outlet />
}




export default SecureRoutes
