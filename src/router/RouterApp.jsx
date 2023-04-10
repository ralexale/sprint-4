import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Splash from "../sections/Initial/Splash";
import SlidePage from "../sections/Initial/SlidePage";
import Login from "../sections/login/Login";
import CreateAccount from "../sections/login/CreateAccount";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import Home from "../sections/Home/Home";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import VerificationCode from "../sections/login/VerificationCode";
import Profile from "../sections/profile/Profile";
import Search from "../sections/search/Search";
import Orders from "../sections/orders/Orders";
import Restaurants from "../sections/restaurants/Restaurants";
import Restaruant from "../sections/restaurant/Restaruant";
import Dishes from "../sections/restaurant/dishes/Dishes";
import Location from "../sections/location/Location";

const RouterApp = () => {
    const [isLogin, setIsLogin] = useState(undefined);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user?.uid) {
                setIsLogin(true);
            } else {
                setIsLogin(false);
            }
        });
    }, [setIsLogin]);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRoutes isAuth={isLogin} />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/restaurants" element={<Restaurants />} />
                    <Route path="/location" element={<Location />} />

                    <Route path="restaurant/:resId" element={<Restaruant />} />
                    <Route path="dish/:dishId" element={<Dishes />} />
                </Route>
                <Route element={<PublicRoutes isAuth={isLogin} />}>
                    <Route path="/" element={<Splash />} />
                    <Route path="/SlidePage" element={<SlidePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/CreateAccount" element={<CreateAccount />} />
                    <Route
                        path="/VerificationCode"
                        element={<VerificationCode />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default RouterApp;
