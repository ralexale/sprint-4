import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleError, userLogoutAsync } from "../../redux/actions/loginActions";
import Footer from "./Footer";
import Restaurants from "../restaurants/Restaurants";

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(toggleError(null));
    }, []);
    const logOut = () => {
        dispatch(userLogoutAsync());
    };
    return (
        <section className="flex flex-col items-center justify-center h-screen w-screen overflow-hidden pl-4">
            <Restaurants />
            <Footer />
        </section>
    );
};

export default Home;
