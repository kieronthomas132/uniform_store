import React, { useRef } from "react";
import "./header.css";
import Ecommerce from "../assets/e-commerce.webp";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { AiOutlineArrowDown } from "react-icons/ai";

const Header = () => {
    const checkAnimation = {
        initial: {
            y: [-20, 1],
            transition: {
                y: {
                    repeat: Infinity,
                    duration: 1,
                    ease: "easeInOut",
                    repeatType: "reverse",
                },
            },
        },
    };

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    return (
        <div
            className="header"
            id="header"
            ref={ref}
            style={{
                transform: isInView ? "none" : "translateX(-200px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            }}
        >
            <div
                className="header_motto"
                style={{
                    transform: isInView ? "none" : "translateX(-200px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                }}
            >
                <h1>WINTER SALE IS NOW ON!</h1>
            </div>
            <div className="header_img">
                <img
                    src={Ecommerce}
                    alt=""
                    style={{
                        transform: isInView ? "none" : "translateX(500px)",
                        opacity: isInView ? 1 : 0,
                        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                    }}
                />
            </div>
            <motion.div
                className="check"
                variants={checkAnimation}
                animate="initial"
            >
                <p>CHECK OUT THE SALE BELOW</p>
                <AiOutlineArrowDown />
            </motion.div>
        </div>
    );
};

export default Header;