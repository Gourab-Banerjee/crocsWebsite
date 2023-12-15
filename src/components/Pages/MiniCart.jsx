import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartData } from '../../features/GetCartDataSlice';
import './MiniCart.css';

const MiniCart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.data);
  const [isCartVisible, setCartVisibility] = useState(true);

  useEffect(() => {
    const cartId = "WJraG2cSPRvSvVwJBuWR7oEtKJ0QVCjW";
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
                      <p>{item.product.name}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: {item.product.price.regularPrice.amount.value} {item.product.price.regularPrice.amount.currency}</p>
                    </div>
                  ))}
                  {/* Render total price */}
                  <p>Total: {cartData.prices.grand_total.value} {cartData.prices.grand_total.currency}</p>
                </div>
              ) : (
                <div className='cart-para'>
                  <p>YOU HAVE NO ITEMS IN YOUR SHOPPING CART</p>
                </div>
              )}
            </div>
          ) : (
            <p>Loading cart...</p>
          )}
        </div>
      )}
    </>
  );
};

export default MiniCart;