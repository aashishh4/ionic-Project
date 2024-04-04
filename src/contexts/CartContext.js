import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });



  const addToCart = (product) => {
    const existingProductIndex = cartItems.findIndex((item) => item.product_id === product.product_id);

    if (existingProductIndex !== -1) {
        const updatedCart = cartItems.map((item, index) =>
            index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedCart);
    } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.product_id !== productId);
    setCartItems(updatedCart);
  };

  const updateQuantity = (productId, change) => {
    const updatedCart = cartItems.map((item) => {
      if (item.product_id === productId) {
        const updatedItem = { ...item, quantity: item.quantity + change };
        updatedItem.totalPrice = updatedItem.price * updatedItem.quantity;
        return updatedItem;
      }
      return item;
    });

    const filteredCart = updatedCart.filter((cartItem) => cartItem.quantity > 0);
    setCartItems(filteredCart);
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};




export default CartContext;
export const useAuth = () => useContext(CartContext);



// Yeh ek state hook hai jo cartItems ko store karta hai. 
// Agar local storage mein cartItems mojood hain, to unhein use karega,
//  nahi to ek khali array use karega.


// addToCart ek function hai jo ek product ko cart mein add karta hai.
// Agar product pehle se cart mein hai to quantity badha di jati hai,
//  nahi to naya product cart mein add kiya jata hai.


// useEffect hook local storage mein cartItems ko store karta hai. 
// Yeh cartItems ki value change hone par chalta hai.

// Provider component ek context provide karta hai apne children ke liye,
//  jo in values ko access kar sakte hain:
//  cartItems, addToCart, removeFromCart, aur updateQuantity.