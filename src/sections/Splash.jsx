import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom/dist";

const Splash = () => {
    const navigate = useNavigate();

    const [first, setfirst] = useState("hola");

    return (
        <main className="grid place-items-center justify-center h-screen w-screen bg-mainColor overflow-hidden ">
            <motion.figure
                initial={{ x: 300, scale: 0.5 }}
                animate={{ x: 0, scale: 1, rotate: -360 }}
                transition={{ type: "spring", stiffness: 50 }}
            >
                <img className="h-[113px] w-[121]" src={logo} alt="" />
            </motion.figure>
        </main>
    );
};

export default Splash;
