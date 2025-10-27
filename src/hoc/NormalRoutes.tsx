
import { ROUTES } from "@muc/constants";
import { useAuth } from "@muc/context";
import { LinearProgress } from "@mui/material";

import { Navigate, Outlet, useLocation } from "react-router-dom";


export const NormalRoutes = () => {
    const { user ,loading} = useAuth();
    const location = useLocation();
    // console.log(user, "this is user in the secure rotues")

if(loading){
    return<LinearProgress/>
}

    return !user ? <Outlet /> : <Navigate to={ROUTES.HOME} state={{ from: location }} replace />
}







export default NormalRoutes
