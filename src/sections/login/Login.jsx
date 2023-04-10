import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import { google, facebook } from "../../firebase/firebaseConfig";
import { motion } from "framer-motion";
import { BsGoogle, BsFacebook } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLoginProviderAsync } from "../../redux/actions/loginActions";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Swal from "sweetalert2";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth } from "../../firebase/firebaseConfig";

const numberRegx = /^[0-9]{10}$/;
const schema = yup
    .object({
        number: yup
            .string()
            .matches(numberRegx, "el numero telefonico debe ser de 10 digitos")
            .required("no ha ingresado el numero telefonico"),
    })
    .required();

const Login = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const onSubmitForm = (data) => {
        dispatch(userLoginAsync(data));
        if (!user.error) {
            navigate("/");
        }
    };

    const onSubmit = (data) => {
        generateRecaptcha();
        const appVerifier = window.recaptchaVerifier;
        sendSms(data.number, appVerifier);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const generateRecaptcha = () => {
        try {
            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptch-container",
                {
                    size: "invisible",
                    callback: () => {},
                },
                auth
            );
        } catch (error) {
            console.log(error);
        }
    };

    const sendSms = (number, recaptchaVerifier) => {
        signInWithPhoneNumber(auth, `+57${number}`, recaptchaVerifier)
            .then((response) => {
                (window.confirmationResult = response), console.log(response);
                Swal.fire(
                    "Excelente",
                    `Te enviaremos un mensaje para confirmar a ${number}`,
                    "success"
                );
            })
            .then((res) => {
                navigate("/VerificationCode");
            })

            .catch((error) => {
                console.log(error);
                Swal.fire(
                    "Ops!",
                    `Ocurrió un error al realizar tu solicitud ${error.message}`,
                    "error"
                );
            });
    };

    const sesionProvider = (provider) => {
        dispatch(userLoginProviderAsync(provider));
    };

    return (
        <main className="flex flex-col items-center h-screen p-6 gap-4">
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

            <form
                onSubmit={handleSubmit(onSubmit)}
                className=" flex flex-col gap-5 text-center"
            >
                <label htmlFor="" className="flex flex-col gap-3">
                    <input
                        {...register("number")}
                        className="border-2 border-blue-200 p-2 rounded-md"
                        type="text"
                        placeholder="+57"
                    />
                </label>
                {errors.number ? (
                    <span className="bg-red-200 p-2 text-white">
                        {errors.number.message}
                    </span>
                ) : (
                    <></>
                )}
                <button
                    type="submit"
                    className="bg-mainColor font-roboto font-semibold p-3 rounded-md"
                >
                    Enviar sms
                </button>
            </form>
            <div id="recaptch-container"></div>
            <motion.section
                className="flex flex-col gap-6 "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeOut", duration: 2 }}
            >
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                        sesionProvider(google);
                    }}
                    className="bg-mainColor text-darkfont  font-roboto font-semibold rounded px-10 py-2 flex items-center gap-2  shadow-xl shadow-darkColor/25"
                >
                    log in with <BsGoogle className="text-xl" />
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                        sesionProvider(facebook);
                    }}
                    className="bg-mainColor   text-darkfont font-roboto rounded px-10 py-2 flex items-center gap-2 font-semibold shadow-xl shadow-darkColor/25"
                >
                    log in with <BsFacebook className="text-xl" />
                </motion.button>
            </motion.section>
            <Link to={"/CreateAccount"}>
                <button className="mt-20 hover:text-blue-600 hover:underline cursor-pointer active:text-blue-600">
                    Don't have an account ? create one here!
                </button>
            </Link>
        </main>
    );
};

export default Login;
