import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, fetchProducts, setCurrentPage, setPriceRange  } from '../../features/ProductSlice';
import { Link } from 'react-router-dom';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { FaPlus , FaMinus} from "react-icons/fa6";
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
  const [isSizeSliderVisible,setIsSizeSliderVisible]=useState(false)

  
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

  const toggleSizeSliderVisibility = () => {
    setIsSizeSliderVisible(!isSizeSliderVisible);
    // setIsPriceSliderVisible(false);
    // setIsGenderSliderVisible(false);
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

    <div className='listing-page'>
      <div className='page-main'>
      <div className='page-title-wrapper'>
        <h1>All Products</h1>
      </div>
      

      <div className='products-page'> 
      <div className='filters'>
        <div className='filters-header'><h5>FILTERS</h5></div>
        <div className='filters-item'>
          <div className='sidebar-row'>
            <div className='row-para'>PRICE</div>
            <div className='row-button'>
              <button onClick={togglePriceSliderVisibility}>{isPriceSliderVisible ? <FaMinus /> : <FaPlus /> }</button>
            </div>
          </div>
          {/* <p onClick={togglePriceSliderVisibility}>PRICE {isPriceSliderVisible ? <FaMinus /> : <FaPlus /> }
          </p> */}
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
        <div className='sidebar-row'>
            <div className='row-para'>GENDER</div>
            <div className='row-button'>
              <button onClick={toggleGenderSliderVisibility}>{isGenderSliderVisible  ? <FaMinus /> : <FaPlus /> }</button>
            </div>
          </div>
          {/* <p onClick={toggleGenderSliderVisibility}>GENDER {isGenderSliderVisible ? <FaMinus /> : <FaPlus /> }</p> */}
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
        <div className='sidebar-row'>
            <div className='row-para'>FOOTWEAR SIZES</div>
            <div className='row-button'>
              <button onClick={toggleSizeSliderVisibility}>{isSizeSliderVisible ? <FaMinus /> : <FaPlus /> }</button>
            </div>
          </div>
          {/* <p onClick={toggleSizeSliderVisibility}>FOOTWEAR SIZES {isSizeSliderVisible ? <FaMinus /> : <FaPlus /> }</p> */}
          {isSizeSliderVisible && (
            <div className='size-section'>
<input type='checkbox' name="men" className="gender-input" /><a style={{ textDecoration: 'none', color: 'black' }} href="#!">Men</a><br />
                        <input  name="women" className="gender-input" /><a style={{ textDecoration: 'none', color: 'black' }} href="#!">Women</a> <br />
                        <input  name="kids" className="gender-input" /><a style={{ textDecoration: 'none', color: 'black' }} href="#!">Kids</a><br />
                        <input  name="girls" className="gender-input" /><a style={{ textDecoration: 'none', color: 'black' }} href="#!">Girls</a> <br />
                        <input  name="boys" className="gender-input" /><a style={{ textDecoration: 'none', color: 'black' }} href="#!">Boys</a> <br />
                        <input  name="unisex_kids" className="gender-input" /><a style={{ textDecoration: 'none', color: 'black' }} href="#!">Unisex Kid</a>s <br />
                        <input  name="unisex" className="gender-input" /><a style={{ textDecoration: 'none', color: 'black' }} href="#!">Unisex</a> <br />
            </div>
          )}
        </div>
        <div className=''>
          <h3>Compare Products</h3>
          <p>you have no items to compare.</p>
        </div>
        <div className=''>
          <h3>My Wish List</h3>
          <p>you have no items in your wishlist</p>
        </div>

      </div>

      <div className='product-items'>
      
      <ul>
        {currentItems.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.url_key}`}>

            {/* <img className='product-img' src={product.image.url} alt={product.name} /> */}
            <img src="https://prod.aaw.com/media/catalog/product/cache/b8e9ee3e3eebf01caeedeb184a52afee/5/2/525252b6bc2de85aedfb32d5856e347606d54e60b66b6b60613053452117492c.jpeg" alt={product.name} className='product-img'/>
            <p className='product-name' style={{color:"black"}}>{product.name}</p>
            <h4 className='product-price'>KD {product.price.regularPrice.amount.value}</h4>
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