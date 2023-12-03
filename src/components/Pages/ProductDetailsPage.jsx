// ProductDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegHeart } from "react-icons/fa6";
import './ProductDetailsPage.css';
import { fetchProductByUrl } from '../../features/ProductDetailsSlice'; // Import the action creator

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

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed' || !productDetails) {
    return <div className='error-container'>
        <h2>Error loading product details.</h2>
        {/* <button onClick={handleRefresh}>Retry Now</button> */}
    </div>;
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

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        <div className="product-image-container">
          <img src={item.image.url} alt={item.name} />
        </div>
        <div className="product-info-container">
          <h3>{item.name}</h3>
          <div className='item-details'>
          <h2>Price: {item.price.regularPrice.amount.value} {item.price.regularPrice.amount.currency}</h2>
          <h5>SKU#: {item.sku}</h5>
          </div>
         <div className='product-controls'>
         <div className="quantity-control">
            <button onClick={handleDecrease}>-</button>
            <span>{count}</span>
            <button onClick={handleIncrease}>+</button>
          </div>
          <div className="add-to-cart">
            <button>Add to Cart</button>
          </div>
          <div className='hearts'>
          <a href="#!">
              <FaRegHeart size={37} color="white" />
            </a>
          </div>
         </div>
          
          <h3 className='information'>Product Information</h3>
          <p dangerouslySetInnerHTML={{ __html: String(item.short_description.html) }}></p>
          <p dangerouslySetInnerHTML={{ __html: String(item.feature) }}></p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
