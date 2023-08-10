import React, { useContext, useEffect, useState } from "react";
import "./products.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {CartContext, isSubmittedContext, SearchContext} from "../../App";
import axios from "axios";
const Products = () => {
    const [product, setProduct] = useState([]);
    const [isFilter, setIsFilter] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(product);
    const { cart, setCart } = useContext(CartContext);

    useEffect(() => {

        const fetchProducts = async () => {
            const response = await fetch(
                "https://fakestoreapi.com/products?limit=21"
            );
            const json = await response.json();
            setProduct(json);
            setFilteredProducts(json);
        };

        fetchProducts()

        const storedProducts = localStorage.getItem("cart");
        if (storedProducts) {
            setCart(JSON.parse(storedProducts));
        }
    }, []);
    
    const handleClick = () => {
        setIsFilter(!isFilter);
    };
    const handleBuyClick = (product) => {
        setCart([...cart, product]);
        localStorage.setItem("cart", JSON.stringify([...cart, product]));
    };


    const fadeAnimation = {
        hidden: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: { duration: 1, delay: 1.6 },
        },
    };

    const productsAnimation = {
        hidden: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: { duration: 1, delay: 1.5 },
        },
    };

    const filterProducts = (e) => {
        const selectedFilter = e.target.value;
        if (selectedFilter === "All") {
            setFilteredProducts(product);
        } else {
            setFilteredProducts(
                product.filter((product) => product.category === selectedFilter)
            );
        }
    };

    return (
        <div className="products" id="products">
            <motion.div
                className="product_buttons"
                variants={fadeAnimation}
                initial="hidden"
                animate="animate"
            >
                <button onClick={() => setFilteredProducts(product)}>All</button>
                <button
                    onClick={() =>
                        setFilteredProducts(
                            product.filter(
                                (product) => product.category === "men's clothing"
                            )
                        )
                    }
                >
                    Men's clothing
                </button>
                <button
                    onClick={() =>
                        setFilteredProducts(
                            product.filter(
                                (product) => product.category === "women's clothing"
                            )
                        )
                    }
                >
                    Women's
                </button>
                <button
                    onClick={() =>
                        setFilteredProducts(
                            product.filter((product) => product.category === "jewelery")
                        )
                    }
                >
                    Jewelery
                </button>
                <button
                    onClick={() =>
                        setFilteredProducts(
                            product.filter((product) => product.category === "electronics")
                        )
                    }
                >
                    Electronics
                </button>
            </motion.div>
            <motion.div
                className="product_filter"
                variants={fadeAnimation}
                initial="hidden"
                animate="animate"
            >
                <h2 onClick={handleClick}>Filter</h2>
                {isFilter && (
                    <div className="product_buttons_filter">
                        <button onClick={() => setFilteredProducts(product)}>All</button>
                        <button
                            onClick={() =>
                                setFilteredProducts(
                                    product.filter(
                                        (product) => product.category === "men's clothing"
                                    )
                                )
                            }
                        >
                            Men's
                        </button>
                        <button
                            onClick={() =>
                                setFilteredProducts(
                                    product.filter(
                                        (product) => product.category === "women's clothing"
                                    )
                                )
                            }
                        >
                            Women's
                        </button>
                        <button
                            onClick={() =>
                                setFilteredProducts(
                                    product.filter((product) => product.category === "jewelery")
                                )
                            }
                        >
                            Jewelry
                        </button>
                        <button
                            onClick={() =>
                                setFilteredProducts(
                                    product.filter(
                                        (product) => product.category === "electronics"
                                    )
                                )
                            }
                        >
                            Electronics
                        </button>
                    </div>
                )}
            </motion.div>
            <motion.div
                className="product_items"
                variants={productsAnimation}
                initial="hidden"
                animate="animate"
            >
                {
                    filteredProducts.map((product) => (
                        <div key={product.id} className="product_item">
                            <Link to={`/product/${product.id}`}>
                                <img src={product.image} alt="" />
                                <p>{product.title}</p>
                            </Link>
                            <p>
                                <strong>£{product.price}</strong>
                            </p>
                            <button onClick={() => handleBuyClick(product)}>BUY NOW</button>
                        </div>
                    ))}
                {!filterProducts && <CircularProgress className="progress_bar" />}
            </motion.div>
        </div>
    );
};

export default Products;