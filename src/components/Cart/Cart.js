import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../App";
import "./cart.css";
const Cart = () => {
    const { cart, setCart } = useContext(CartContext);
    const [noProducts, setNoProducts] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [productBought, setProductBought] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const storedProducts = localStorage.getItem("cart");
        if (storedProducts) {
            setCart(JSON.parse(storedProducts));
            if (cart.length === 0) {
                setNoProducts(true);
            } else {
                setNoProducts(false);
            }
        } else {
            setNoProducts(true);
        }
    }, [cart]);

    const removeItem = (id) => {
        const newCarts = cart.filter((product) => product.id !== id);
        localStorage.setItem("cart", JSON.stringify(newCarts));
        setCart(newCarts);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if ((firstName, lastName, email, password)) {
            setCart([]);
            localStorage.removeItem("cart");
            setProductBought(true);
            setError("");
        } else {
            setProductBought(false);
            setError("Please fill out the required fields");
        }
    };

    const total = cart.reduce((acc, product) => acc + product.price, 0);

    return (
        <div className="cart">
            <h1>{noProducts ? "Currently No Products in Your Cart" : "Your Cart"}</h1>
            <h1>
                {productBought
                    ? "Your order is complete and will be dispatched shortly"
                    : null}
            </h1>
            <div className="cart_component">
                <div className="cart_items">
                    {cart &&
                        cart
                            .reduce((unique, item) => {
                                if (!unique.some((e) => e.id === item.id)) {
                                    unique.push(item);
                                }
                                return unique;
                            }, [])
                            .map((product) => {
                                const count = cart.filter((i) => i.id === product.id).length;
                                return (
                                    <div className="cart_product" key={product.id * 2}>
                                        <img src={product.image} alt={product.title}/>
                                        <p>{product.title}</p>
                                        <p>Price: £{product.price}</p>
                                        <p>Quantity: {count}</p>
                                        <button
                                            className="remove"
                                            onClick={() => removeItem(product.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                );
                            })}
                </div>
                {!noProducts && !productBought && (
                    <form onSubmit={handleSubmit}>
                        <div className="cart_order">
                            <h1>Checkout Here</h1>
                            <h2>Total: £{total}</h2>
                            <h3>{error}</h3>
                            <div className="firstname">
                                <label>First Name:</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="lastname">
                                <label>Last Name:</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="email">
                                <label>Email:</label>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="password">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button>BUY NOW</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Cart;