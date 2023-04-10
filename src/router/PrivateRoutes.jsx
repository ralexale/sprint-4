import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = ({ isAuth }) => {
    return <div>{isAuth ? <Outlet /> : <Navigate to="/" />}</div>;
};

export default PrivateRoutes;
