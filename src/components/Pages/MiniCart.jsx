import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartData } from '../../features/GetCartDataSlice';
import './MiniCart.css';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { LiaLessThanSolid } from "react-icons/lia";
import { LiaGreaterThanSolid } from "react-icons/lia";

const MiniCart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.getCartData.data);
  const [isCartVisible, setCartVisibility] = useState(true);

  useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    console.log("cartId", cartId);
    dispatch(fetchCartData(cartId));
  }, [dispatch]);

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
          {cartData ? (
            <div>
              {cartData.items.length > 0 ? (
                <div>
                  {/* Render items in the cart */}
                  {cartData.items.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="top-details">
                      <img src={item.product.image.url} alt="" />
                      <div className="mid-details">
                      <p>{item.product.name}</p>
                      <div className="other-details">
                        <span><strong>COLOR:</strong></span>
                        <span><strong>SIZE:</strong></span>
                      </div>
                      </div>
                     
                      <div className="delete-icon">
                      <RiDeleteBin6Fill />

                      </div>
                      </div>
                      <div className="bottom-details">
                      <p className='bt-quantity'>QTY: <LiaLessThanSolid /> {item.quantity} <LiaGreaterThanSolid /></p>
                      <p className='bt-price'>KD {item.product.price.regularPrice.amount.value} </p>
                      </div>
                     
                    </div>
                  ))}
                  {/* Render total price */}
                  <div className="subtotal">
                    <p>SUBTOTAL:</p>
                    <p>KD {cartData.prices.grand_total.value} </p>
                  </div>
                  <div className="view-cart-button">view and edit cart</div>
                <div className="checkout-button">GO TO CHECKOUT</div>
                </div>
              ) : (
                <div className='cart-para'>
                  <p>YOU HAVE NO ITEMS IN YOUR SHOPPING CART</p>
                </div>
              )}
            </div>
          ) : (
            <p>YOU HAVE NO ITEMS IN YOUR SHOPPING CART</p>
          )}
        </div>
      )}
    </>
  );
};

export default MiniCart;