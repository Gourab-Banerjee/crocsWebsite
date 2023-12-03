import React, { useState } from 'react';
import './MiniCart.css';

const MiniCart = () => {
  const [isCartVisible, setCartVisibility] = useState(true);

  const handleCloseClick = () => {
    setCartVisibility(false);
  };

  return (
    <>
      {isCartVisible && (
        <div className="mini-cart">
          <div className="cart-head">
            <p className="cart-header">My Cart</p>
            <button className="cart-button" onClick={handleCloseClick}>
            <span>&times;</span>
            </button>
          </div>
          <div className='cart-para'>
         <p>YOU HAVE NO ITEMS IN YOUR SHOPPING CART</p>
         </div>
        </div>
      )}
    </>
  );
};

export default MiniCart;