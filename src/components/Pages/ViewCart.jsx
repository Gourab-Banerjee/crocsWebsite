import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartData } from '../../features/GetCartDataSlice';
import "./ViewCart.css"
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

const ViewCart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.getCartData.data);
  const status = useSelector((state) => state.getCartData.status);
  const error = useSelector((state) => state.getCartData.error);

  useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    // Replace 'yourCartId' with the actual cart ID you want to fetch
    dispatch(fetchCartData(cartId));
  }, [dispatch]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="view-container">
      <div className='view-cart-container'>
        <div className="cart-title">My Shopping Bag</div>
        <div className="cart-container">
          <div className="cart-table">
            {cartData && cartData.items && cartData.items.length > 0 ? (
              <div style={{width:"100%"}}>
                <table>
                  <thead className='table-head'>
                    <tr>
                      <th>Method</th>
                      <th>Item</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                    </tr>
                   
                  </thead>
                  <div className="lines"></div>
                  <tbody>
                    {cartData.items.map((item) => (
                      <tr key={item.id}>
                        <td style={{width:"25%"}}><div className="method"></div></td>
                        <td style={{width:"20%"}}>
                          <div className="table-img"><img src={item.product.image.url} alt={item.product.name} style={{ width: '100px', height: '100px' }} /></div>
                        </td>
                        <td style={{width:"20%"}}>
                          <div className="table-data-name">{item.product.name}</div>
                        <div className="other-detail">
                        <p><strong>COLOR:</strong></p>
                        <p><strong>SIZE:</strong></p>
                      </div>
                        </td>
                        <td>
                          <div className="table-data-price">KD {item.product.price.regularPrice.amount.value}</div>
                           </td>
                        <td><div className="table-data-quantity">
                        <FaMinus />
                          <div className="table-data-qty">{item.quantity}</div>
                          <FaPlus />
                          
                          </div>
                          <div className="update">
                          <FaShoppingCart />
                          <span>update</span>
                          </div>
                          </td>
                        <td>
                        <div className="table-data-price">KD {item.product.price.regularPrice.amount.value * item.quantity}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="lines2"></div>
                <div className="shopping-bag">
                <div className="shopping" id='first-bag'>Update Shopping Bag</div>
                <div className="shopping" id='second-bag'>Continue Shopping</div>
                </div>
                
              </div>
            ) : (
              <p>No items in the cart.</p>
            )}
          </div>
          <div className="cart-summary">
            <div className="cart-summary-container">
            <div className="summary-title">Summary</div>
            <div className="lines2"></div>
            <div className="ads"><p>Add <strong>KD 5.00 </strong> more to get <strong>FREE SHIPPING!</strong></p></div>
            <div className="lines2"></div>
            <div className="summary-count">
              <div className="summary-count-title">Subtotal</div>
              
              {cartData && cartData.prices && cartData.prices.grand_total ? (
              <div className='summary-count-value'>KD {cartData.prices.grand_total.value}</div>
            ) : (
              <p>Total not available.</p>
            )}
            </div>
            <div className="summary-count">
              <div className="summary-count-title">Discount</div>
              
              {cartData && cartData.prices && cartData.prices.grand_total ? (
              <div className='summary-count-value'>KD 0.00</div>
            ) : (
              <p>Total not available.</p>
            )}
            </div>
            <div className="lines2"></div>
            <div className="summary-count" id='total-order'>
              <div className="summary-count-title">Order Total</div>
              
              {cartData && cartData.prices && cartData.prices.grand_total ? (
              <div className='summary-count-value'>KD {cartData.prices.grand_total.value}</div>
            ) : (
              <p>Total not available.</p>
            )}
            </div>
            <div className="tabby-container">
            <div className="tabby-text-container">
              <div className="tabby-text">
                <span>
                  or 4 interest-free payments of <strong>KWD 5.000.</strong> No
                  fees. Shariah-compliant.
                </span>
              </div>
              <div className="learn-more">
                <span>Learn more</span>
              </div>
            </div>
          </div>
          <div className="tabby-container">
            <div className="tabby-text-container" id="second-text">
              <div className="tabby-text">
                <span>
                  Split in upto 4 interest-free payments of KWD 5, or pay in
                  full!
                </span>
              </div>
              <div className="learn-more">
                <span>Learn more</span>
              </div>
            </div>
            <div className="tabby-logo">
              <img
                src="https://cdn.tamara.co/widget-v2/assets/tamara-grad-en.ac5bf912.svg"
                alt=""
              />
            </div>
          </div>
          <div className="cart-checkout">Proceed to Checkout</div>
            
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCart;
