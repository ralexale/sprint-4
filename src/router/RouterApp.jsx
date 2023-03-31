import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../sections/Login";
import SlidePage from "../sections/SlidePage";
import Splash from "../sections/Splash";

const RouterApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Splash />} />
                <Route path="/SlidePage" element={<SlidePage />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RouterApp;
