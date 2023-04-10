import React, { useEffect, useRef, useState } from "react";
import burguer from "../../assets/burguer.png";
import pizza from "../../assets/pizza.png";
import { motion } from "framer-motion";

const FoodCarussel = () => {
    const [width, setWidth] = useState(0);
    const carussel = useRef();

    useEffect(() => {
        setWidth(carussel.current.scrollWidth - carussel.current.offsetWidth);
    }, []);

    return (
        <motion.main
            ref={carussel}
            whileTap={"grabbing"}
            className="flex h-[40px] ml-28"
        >
            <motion.section
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                className="flex gap-4 cursor-grab"
            >
                <figure className="h-[32px] w-[106px] flex items-center justify-center p-2 bg-mainColor ">
                    All
                </figure>
                <figure className=" flex h-[32px] w-[130px] gap-2 items-center justify-center bg-[#F2F2F2] p-3 ">
                    <img src={burguer} alt="burguer" />
                    <span>Fast Food</span>
                </figure>
                <figure className="flex h-[32px] w-[130px] gap-2 items-center justify-center bg-[#F2F2F2] p-3 ">
                    <img src={pizza} alt="pizza" />
                    <span>Pizza</span>
                </figure>
                <figure className="flex h-[32px] w-[130px] gap-2 items-center justify-center bg-[#F2F2F2] p-3 ">
                    <img src={pizza} alt="pizza" />
                    <span>Pizza</span>
                </figure>
            </motion.section>
        </motion.main>
    );
};

export default FoodCarussel;
