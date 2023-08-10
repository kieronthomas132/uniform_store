import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import { BiMenuAltRight } from "react-icons/bi";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { motion } from "framer-motion";
import {CartContext} from "../../App";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const Navbar = () => {
    const [isSidebar, setIsSidebar] = useState(false);
    const { cart } = useContext(CartContext);
    const [badge, setBadge] = useState(0);

    useEffect(() => {
        setBadge(cart.length);
    }, [cart]);


    const toggleSidebar = () => {
        setIsSidebar(!isSidebar);
    };


    const sidebarAnimation = {
        initial: {
            opacity: 0,
            y: "-10vh",
        },
        animate: {
            opacity: 1,
            y: "0",
            transition: { duration: 0.5 },
        },
    };

    return (
        <div className="navbar">
            <div className="navbar_logo">
                <h4>
                    <a href="/">Uniform</a>
                </h4>
            </div>
            <div className="navbar_links">
                <li>
                    <a href="/">Home</a>
                </li>
                <Link to="/">
                    <li>
                        <a href="">Products</a>
                    </li>
                </Link>
                <Link to="/cart">
                    <Tooltip title="Cart">
                        <Badge
                            badgeContent={badge}
                            color="primary"
                            className="sidebar_cart_icon"
                        >
                            <IconButton>
                                <ShoppingCartIcon sx={{ color: "white" }} />
                            </IconButton>
                        </Badge>
                    </Tooltip>
                </Link>
            </div>
            <div className="sidebar">
                <BiMenuAltRight className="sidebar_menu" onClick={toggleSidebar} />
            </div>
            {isSidebar && (
                <motion.div
                    className="sidebar_menu_links"
                    variants={sidebarAnimation}
                    initial="initial"
                    animate="animate"
                >
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <Link to="/">
                        <li>
                            <a href="">Products</a>
                        </li>
                    </Link>
                    <Link to="/cart">
                        <Tooltip title="Cart">
                            <Badge
                                badgeContent={badge}
                                color="primary"
                                className="sidebar_cart_icon"
                            >
                                <IconButton>
                                    <ShoppingCartIcon sx={{ color: "white" }} />
                                </IconButton>
                            </Badge>
                        </Tooltip>
                    </Link>
                </motion.div>
            )}
        </div>
    );
};

export default Navbar;