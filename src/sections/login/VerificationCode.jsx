import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyCodeAsync } from "../../redux/actions/loginActions";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth } from "../../firebase/firebaseConfig";

const regex = /^[0-9]{6}$/;
const schema = yup
    .object({
        code: yup
            .string()
            .matches(regex, "el código de verificación debe tener 6 digitos")
            .required("no ha ingresado ningún código"),
    })
    .required();

const VerificationCode = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error } = useSelector((store) => store.login);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data) => {
        dispatch(verifyCodeAsync(data.code));
        if (error.status) {
            Swal.fire("Ops!", `Ha ocurido un error: ${error.message}`, "error");
        } else {
            Swal.fire(
                "Exito!",
                "Código verificado exitosamente",
                "success"
            ).then(() => {
                console.log(user);
                console.log(auth.currentUser);
                if (auth.currentUser.displayName && auth.currentUser.photoURL) {
                    navigate("/");
                } else {
                    navigate("/home");
                }
            });
        }
    };

    return (
        <div className="formphone m-5">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=" p-5 flex flex-col gap-5 text-center"
            >
                <label htmlFor="" className="flex flex-col gap-3">
                    <span>Ingrese el código de verificación</span>
                    <input
                        {...register("code")}
                        className="border-2 border-blue-200 p-2 rounded-md"
                        type="text"
                        placeholder="código sms"
                    />
                </label>
                {errors.code ? (
                    <span className="bg-red-200 p-2 text-white">
                        {errors.code.message}
                    </span>
                ) : (
                    <></>
                )}
                <button
                    type="submit"
                    className="bg-mainColor font-semibold p-3 rounded-md"
                >
                    Verificar código
                </button>
            </form>
        </div>
    );
};

export default VerificationCode;
