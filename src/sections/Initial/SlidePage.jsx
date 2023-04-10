import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import slide1 from "../../assets/slide-1.png";
import slide2 from "../../assets/slide-2.png";
import slide3 from "../../assets/slide-3.png";
import { useNavigate } from "react-router-dom/dist";

const SlidePage = () => {
    const [position, setPosition] = useState(0);
    const [clickCount, setClickCount] = useState(0);
    const navigate = useNavigate();
    const [scroll, setScroll] = useState(0);
    const [selectedDot, setSelectedDot] = useState(0);

    const handleClick = () => {
        setScroll(scroll + 100); // cambiar el valor 100 según sea necesario para ajustar la cantidad de desplazamiento
        setSelectedDot(selectedDot + 1);
        setPosition(position - 400);
        setClickCount(clickCount + 1);
    };

    useEffect(() => {
        if (clickCount === 3) {
            navigate("/login");
        }
    }, [clickCount, navigate]);
    return (
        <>
            <motion.main className="flex overflow-hidden relative  items-center justify-center  h-screen w-screen">
                <div className="flex">
                    <section
                        className="flex flex-col gap-6 items-center relative top-[-50px]"
                        style={{ transform: `translateX(${position}px)` }}
                    >
                        <img src={slide1} alt="Imagen" />
                        <span className="text-center w-[230px]  text-sm font-roboto text-darkfont ">
                            Choose what to eat choosing from a variety of
                            restaurants from the list
                        </span>
                    </section>
                    <section
                        className="flex flex-col absolute bottom-[180px] right-[-370px] gap-6 items-center p-1"
                        style={{ transform: `translateX(${position}px)` }}
                    >
                        <img className="" src={slide2} alt="Imagen" />
                        <span className="text-center w-[220px]  text-sm  font-roboto text-darkfont  ">
                            Choose where you want to deliver by indicating on
                            the map
                        </span>
                    </section>
                    <section
                        className="flex flex-col items-center gap-6 font absolute bottom-[200px]  right-[-770px]"
                        style={{ transform: `translateX(${position}px)` }}
                    >
                        <img className="" src={slide3} alt="Imagen" />
                        <span className="text-center w-[220px]  text-sm font-roboto text-darkfont ">
                            We will deliver as soon as possible
                        </span>
                    </section>

                    <div
                        style={{ display: "flex", alignItems: "center" }}
                        className="absolute top-[490px] right-[180px]"
                    >
                        <div
                            style={{
                                width: selectedDot === 0 ? "30px" : "10px", // cambiar el valor 20px según sea necesario para ajustar el ancho
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor:
                                    selectedDot === 0 ? "yellow" : "grey",
                                marginRight: "5px", // agregar un margen derecho para el espaciado
                                transition:
                                    "width 0.5s ease, background-color 0.5s ease",
                            }}
                        />
                        <div
                            style={{
                                width:
                                    selectedDot === 1 && scroll >= 100
                                        ? "30px"
                                        : "10px", // cambiar el valor 20px según sea necesario para ajustar el ancho
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor:
                                    selectedDot === 1 && scroll >= 100
                                        ? "yellow"
                                        : "grey",
                                marginRight: "5px", // agregar un margen derecho para el espaciado
                                transition:
                                    "width 0.5s ease, background-color 0.5s ease",
                            }}
                        />
                        <div
                            style={{
                                width:
                                    selectedDot === 2 && scroll >= 200
                                        ? "25px"
                                        : "10px", // cambiar el valor 20px según sea necesario para ajustar el ancho
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor:
                                    selectedDot === 2 && scroll >= 200
                                        ? "yellow"
                                        : "grey",
                                marginRight: "5px", // agregar un margen derecho para el espaciado
                                transition:
                                    "width 0.5s ease, background-color 0.5s ease",
                            }}
                        />
                    </div>

                    <button
                        className="absolute bg-mainColor w-[200px] m-auto rounded py-2 bottom-10 left-0 right-0"
                        onClick={handleClick}
                    >
                        Next
                    </button>
                </div>
            </motion.main>
        </>
    );
};

export default SlidePage;
