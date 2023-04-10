import React, { useEffect, useRef, useState } from "react";
import promo1 from "../../assets/Promo1.png";
import promo2 from "../../assets/Promo2.png";
import { motion } from "framer-motion";
const Carussel = () => {
    const [width, setWidth] = useState(0);
    const carussel = useRef();

    useEffect(() => {
        setWidth(carussel.current.scrollWidth - carussel.current.offsetWidth);
    }, []);

    return (
        <motion.main
            ref={carussel}
            whileTap={"grabbing"}
            className="flex h-[100px]"
        >
            <motion.section
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                className="flex gap-4 cursor-grab"
            >
                <img src={promo1} alt="" />
                <img src={promo1} alt="" />
                <img src={promo1} alt="" />
            </motion.section>
        </motion.main>
    );
};

export default Carussel;
