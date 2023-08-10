import './index.css'
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import Product from './components/Product/Product';
import { Routes, Route } from 'react-router'
import {createContext, useState} from 'react'
import Cart from './components/Cart/Cart';

export const CartContext = createContext()
function App() {
  const [cart, setCart] = useState([])


  return (
      <CartContext.Provider value={{ cart, setCart }}>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path='/' element={<Header />} />
          </Routes>
          <Routes>
            <Route path='/' element={<Products />} />
            <Route path='/product/:id' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </div>
      </CartContext.Provider>

  );
}

export default App;
