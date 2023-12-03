import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, fetchProducts, setCurrentPage, setPriceRange  } from '../../features/ProductSlice';
import { Link } from 'react-router-dom';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Slider from '@mui/material/Slider';
import "./ProductListPage.css"

const ProductListPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const currentPage = useSelector((state) => state.products.currentPage);
  const itemsPerPage = useSelector((state) => state.products.itemsPerPage);
  const minPrice = useSelector((state) => state.products.minPrice);
  const maxPrice = useSelector((state) => state.products.maxPrice);
  const [price, setPrice] = useState([minPrice, maxPrice]);
  const [isPriceSliderVisible, setIsPriceSliderVisible] = useState(false);
  const [isGenderSliderVisible, setIsGenderSliderVisible] = useState(false);

  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleRefresh = () => {
    dispatch(clearError());
  };
  
  


 
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const priceHandler = (e, newPrice) => {
    e.preventDefault(); // Prevent default form submission behavior
    setPrice(newPrice);
    setTimeout(() => {
      dispatch(setPriceRange({ minPrice: newPrice[0], maxPrice: newPrice[1] }));
      dispatch(fetchProducts());
    }, 2000);
    
   
  };

 

  const togglePriceSliderVisibility = () => {
    setIsPriceSliderVisible(!isPriceSliderVisible);
    setIsGenderSliderVisible(false);
  };

  const toggleGenderSliderVisibility = () => {
    setIsGenderSliderVisible(!isGenderSliderVisible);
    setIsPriceSliderVisible(false);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  
  if (status === 'failed') {
    return <div className='error-container'>
        <h2>Api Error! Check your connection</h2>
        <h4>{error}</h4>
        <button onClick={handleRefresh}>Retry Now</button>
    </div>;
  }



  return (

    <div>
      <div className='page-main'>
      <div className='page-title-wrapper'>
        <h1>All Products</h1>
      </div>
      

      <div className='products-page'> 
      <div className='filters'>
        <div className='filters-header'><h5>FILTERS</h5></div>
        <div className='filters-item'>
          <p onClick={togglePriceSliderVisibility}>PRICE {isPriceSliderVisible ? <FaAngleUp /> : <FaAngleDown />}
          </p>
          {isPriceSliderVisible && (
            <>
              <Slider
                value={price}
                
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={100}
                max={5000}
                onChange={priceHandler}
              />
            </>
          )}
        </div>

        <div className='filters-item'>
          <p onClick={toggleGenderSliderVisibility}>GENDER {isGenderSliderVisible ? <FaAngleUp /> : <FaAngleDown />}</p>
          {isGenderSliderVisible && (
                    <div className="gender-section">
                      <div className="sub-gender-section">
                        <input type='checkbox' name="men" className="gender-input" /><a style={{ textDecoration: 'none', color: 'black' }} href="#!">Men</a><br />
                        <input type="checkbox" name="women" className="gender-input" /><a style={{ textDecoration: 'none', color: 'black' }} href="#!">Women</a> <br />
                        <input type="checkbox" name="kids" className="gender-input" /><a style={{ textDecoration: 'none', color: 'black' }} href="#!">Kids</a><br />
                        <input type="checkbox" name="girls" className="gender-input" /><a style={{ textDecoration: 'none', color: 'black' }} href="#!">Girls</a> <br />
                        <input type="checkbox" name="boys" className="gender-input" /><a style={{ textDecoration: 'none', color: 'black' }} href="#!">Boys</a> <br />
                        <input type="checkbox" name="unisex_kids" className="gender-input" /><a style={{ textDecoration: 'none', color: 'black' }} href="#!">Unisex Kid</a>s <br />
                        <input type="checkbox" name="unisex" className="gender-input" /><a style={{ textDecoration: 'none', color: 'black' }} href="#!">Unisex</a> <br />
                      </div>
                    </div>
                  )}
        </div>

        <div className='filters-item'>
          <p>DEPARTMENT</p>
        </div>

      </div>

      <div className='product-items'>
      
      <ul>
        {currentItems.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.url_key}`}>

            <img className='product-img' src={product.image.url} alt={product.name} />
            <p className='product-name'>{product.name}</p>
            <h4 className='product-price'>KD{product.price.regularPrice.amount.value}</h4>
            </Link>
          </li>
        ))}
      </ul>
      
      </div>
      </div>
    

     

    </div>
     <div className="pagination">
     <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
     {'<'}
     </button>
     <span>{currentPage}</span>
     <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= products.length}>
     {'>'}
     </button>
   </div><br />
    </div>
  )
}

export default ProductListPage