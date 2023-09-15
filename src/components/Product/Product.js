import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./product.css";
import { motion } from "framer-motion";
import {CartContext, isSubmittedContext, SearchContext} from "../../App";
import axios from 'axios'

const Product = () => {

    
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const { setCart } = useContext(CartContext);

    useEffect(() => {

        const fetchProduct = async () => {
                const options = {
                    method: 'GET',
                    url: 'https://amazon23.p.rapidapi.com/product-details',
                    params: {
                        asin: 'B08H8VZ6PV',
                        country: 'UK'
                    },
                    headers: {
                        'X-RapidAPI-Key': process.env.REACT_APP_STORE_API,
                        'X-RapidAPI-Host': 'amazon23.p.rapidapi.com'
                    }
                };

                try {
                    const response = await axios.request(options);
                    console.log(response.data);
                    setProduct(response.data)
                } catch (error) {
                    console.error(error);
                }
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            const data = await response.json();
            setProduct(data);
        };

        fetchProduct()

        const storedProducts = localStorage.getItem("cart");
        if (storedProducts) {
            setCart(JSON.parse(storedProducts));
        }
    }, [id]);

    const imageAnimation = {
        initial: {
            scale: 0,
        },
        animate: {
            scale: 1,
            transition: {
                duration: 0.5,
                delay: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 10,
            },
        },
    };

    const productAnimation = {
        initial: {
            scale: 0,
        },
        animate: {
            scale: 1,
            transition: {
                duration: 0.5,
                delay: 0.7,
                type: "spring",
                stiffness: 300,
                damping: 10,
            },
        },
    };

    console.log(product);
    return (
        <div className="product" key={product.id}>
            <motion.div
                className="product_image"
                variants={imageAnimation}
                initial="initial"
                animate="animate"
            >
                <img src={product.image} alt="" />
            </motion.div>
            <motion.div
                className="product_info"
                variants={productAnimation}
                initial="initial"
                animate="animate"
            >
                <h1>{product.title}</h1>
                <h2>£{product.price}</h2>
                <h3>
                    <span>Description: </span>
                    {product.description}
                </h3>
                <div className="quantity">
                    <p>Quantity: </p>
                    <select>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <button>BUY NOW</button>
            </motion.div>
        </div>
    );
};

export default Product;
