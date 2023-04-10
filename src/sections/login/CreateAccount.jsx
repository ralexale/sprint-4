import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { motion } from "framer-motion";
import { onAuthStateChanged } from "firebase/auth";

import {
    createUserWithEmailAndPasswordAsync,
    updateProfileAsync,
} from "../../redux/actions/loginActions";
import { fileUpload } from "../../services/service";
import { auth } from "../../firebase/firebaseConfig";

const CreateAccount = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading } = useSelector((store) => store.login);
    const [updateUser, setupdateUser] = useState(false);
    const onSubmit = async (data) => {
        const photo = data.photo[0] ? await fileUpload(data.photo[0]) : "";
        const user = {
            name: data.name,
            email: data.email,
            password: data.password,
            photo: photo,
            location: data.location,
            birthday: data.birthday,
        };
        if (updateUser) {
            dispatch(updateProfileAsync(user));
        } else {
            dispatch(
                createUserWithEmailAndPasswordAsync({
                    ...user,
                    phone: data.number,
                })
            );
        }
    };
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setupdateUser(true);
            }
        });
    }, []);
    useEffect(() => {
        if (error.status) {
            Swal.fire(
                "Ops!",
                `Ocurrió un error al procesar la solicitud ${error.message}`
            );
        } else if (error.status === false) {
            Swal.fire("Exito!", `El usuario ha sido creado exitosamente`).then(
                () => {
                    navigate("/restaurants");
                }
            );
        }
    }, [error]);
    const handleLocation = () => {
        navigate("/locationMap");
    };
    return (
        <motion.section
            initial={{ y: "100vh" }}
            transition={{ duration: 1 }}
            animate={{ y: 0 }}
            className="flex flex-col gap-12 p-8 h-screen"
        >
            <h1 className="font-bold text-3xl">Create account</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col h-full justify-between"
            >
                <div className="flex flex-col gap-3">
                    <label className="flex flex-col border-b">
                        <span className="text-xs text-gray-400">NAME</span>
                        <input
                            {...register("name")}
                            className="p-1 outline-none focus:border-b focus:border-black"
                            type="text"
                        />
                    </label>
                    <label className="flex flex-col border-b">
                        <span className="text-xs text-gray-400">EMAIL</span>
                        <input
                            {...register("email")}
                            className="p-1 outline-none focus:border-b focus:border-black"
                            type="text"
                        />
                    </label>
                    {!updateUser ? (
                        <label className="flex flex-col border-b">
                            <span className="text-xs text-gray-400">
                                NUMBER
                            </span>
                            <input
                                {...register("number")}
                                className="p-1 outline-none focus:border-b focus:border-black"
                                type="text"
                            />
                        </label>
                    ) : (
                        <></>
                    )}
                    <label className="flex flex-col border-b">
                        <span className="text-xs text-gray-400">PASSWORD</span>
                        <input
                            {...register("password")}
                            className="p-1 outline-none focus:border-b focus:border-black"
                            type="password"
                        />
                    </label>
                    <label className="flex flex-col gap-3">
                        <span className="text-xs text-gray-400">
                            Profile Photo
                        </span>
                        <input
                            {...register("photo")}
                            className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-mainColor file:text-darkfont
                            hover:file:bg-violet-100"
                            type="file"
                        />
                    </label>
                    <label className="flex flex-col gap-3">
                        <span className="text-xs text-gray-400">Address</span>

                        <input {...register("location")} type="text" />
                    </label>
                    <label className="flex flex-col gap-3">
                        <span className="text-xs text-gray-400">Birthday</span>
                        <input
                            {...register("birthday")}
                            className="p-1 outline-none focus:border-b focus:border-black"
                            type="text"
                        />
                    </label>
                </div>
                <button
                    disabled={loading}
                    type="submit"
                    className="p-4 bg-yellow-300 rounded-md w-11/12 flex items-center justify-center mx-auto font-semibold h-11"
                >
                    Sing In
                </button>
            </form>
        </motion.section>
    );
};

export default CreateAccount;
