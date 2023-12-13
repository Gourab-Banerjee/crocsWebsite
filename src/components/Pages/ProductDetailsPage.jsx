// ProductDetailsPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRegHeart } from "react-icons/fa6";
import "./ProductDetailsPage.css";
import { fetchProductByUrl } from "../../features/ProductDetailsSlice"; // Import the action creator
import { addToCart } from "../../features/CartSlice";

const ProductDetailsPage = () => {
  const { url_key } = useParams();
  // const [product, setProduct] = useState([]);
  const [count, setCount] = useState(1); // Initial count is set to 1

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails.items);
  const status = useSelector((state) => state.productDetails.status);

  useEffect(() => {
    // Dispatch the fetchProductByUrl action to update the state with product details
    dispatch(fetchProductByUrl(url_key));
  }, [dispatch, url_key]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed" || !productDetails) {
    return (
      <div className="error-container">
        <h2>Error loading product details.</h2>
        {/* <button onClick={handleRefresh}>Retry Now</button> */}
      </div>
    );
  }

  const item = productDetails[0];

  if (!item || !item.image) {
    return null;
  }

  // Event handlers for count buttons
  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleAddToCart = () => {
    const cartItem = {
      sku: item.sku,
      quantity: {count},
      cartId: "WJraG2cSPRvSvVwJBuWR7oEtKJ0QVCjW",
    };

    dispatch(addToCart(cartItem));
  };

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        <div className="product-image-container">
          <img src={item.image.url} alt={item.name} />
        </div>
        <div className="product-info-container">
          <p className="pdp-name">{item.name}</p>
          <div className="item-details">
            <h2 className="pdp-price">
              KD {item.price.regularPrice.amount.value}{" "}
            </h2>
            <h5 className="pdp-sku">SKU#: {item.sku}</h5>
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
          <div className="product-controls">
            <div className="quantity-control">
              <button onClick={handleDecrease}>-</button>
              <span>{count}</span>
              <button onClick={handleIncrease}>+</button>
            </div>
            <div className="add-to-cart">
              <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
            <div className="hearts">
              <a href="#!">
                <FaRegHeart size={37} color="white" />
              </a>
            </div>
          </div>

          <h3 className="information">Product Information</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: String(item.short_description.html),
            }}
          ></p>
          <p dangerouslySetInnerHTML={{ __html: String(item.feature) }}></p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
