import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = ({ isAuth }) => {
    return <div>{isAuth ? <Navigate to={"/home"} /> : <Outlet />}</div>;
};

export default PublicRoutes;
