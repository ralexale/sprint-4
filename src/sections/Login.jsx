import React from "react";
import logo from "../assets/logo.png";
import phone from "../assets/phone.png";
const Login = () => {
    return (
        <main className="flex flex-col items-center p-6 gap-5 ">
            <img
                className="w-[84px] h-[63px] object-cover   "
                src={logo}
                alt=""
            />
            <h2>Sing in</h2>
            <span className="text-center">
                Login or create an account with your phone number to start
                ordering
            </span>
            <img
                className="absolute top-[225px] left-[100px]"
                src={phone}
                alt=""
            />
            <input
                className="placeholder-gray-500 border-b outline-0 border-mainColor"
                type="number"
                placeholder="+1"
            />
        </main>
    );
};

export default Login;
