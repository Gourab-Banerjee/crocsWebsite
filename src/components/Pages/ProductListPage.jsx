import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, fetchProducts, setCurrentPage, setPriceRange  } from '../../features/ProductSlice';
import { Link } from 'react-router-dom';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { FaPlus , FaMinus} from "react-icons/fa6";
import Slider from '@mui/material/Slider';
import "./ProductListPage.css"
import PriceFilterSidebar from './PriceFilterSidebar';
import Skeleton from 'react-loading-skeleton';

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
  const [isSizeSliderVisible,setIsSizeSliderVisible]=useState(false) ;
   const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  
  
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

  const toggleSidebarVisibility = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
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
              <div className="size-section-size">19-20</div>
              <div className="size-section-size">37-38</div>
              <div className="size-section-size">38-39</div>
              <div className="size-section-size">39-40</div>
              <div className="size-section-size">41-42</div>
              <div className="size-section-size">42-43</div>
              <div className="size-section-size">43-44</div>
              <div className="size-section-size">45-46</div>
              <div className="size-section-size">25-26</div>
              <div className="size-section-size">20-21</div>
              <div className="size-section-size">22-23</div>
              <div className="size-section-size">23-24</div>
              <div className="size-section-size">24-25</div>
              <div className="size-section-size">27-28</div>
              <div className="size-section-size">28-29</div>
              <div className="size-section-size">29-30</div>
              <div className="size-section-size">30-31</div>
              <div className="size-section-size">32-33</div>
              <div className="size-section-size">33-34</div>
              <div className="size-section-size">34-35</div>
              <div className="size-section-size">36-37</div>
              <div className="size-section-size">46-47</div>
              <div className="size-section-size">48-49</div>
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
       {/* Responsive Sidebar Button */}
       <div className="filter-button-responsive" onClick={toggleSidebarVisibility}>
            <p>Filters</p>
          </div>

          {/* Price Filter Sidebar */}
          {isSidebarVisible && (
            <PriceFilterSidebar
              price={price}
              priceHandler={priceHandler}
              isPriceSliderVisible={isPriceSliderVisible}
              toggleSliderVisibility={togglePriceSliderVisibility}
              closeSidebar={closeSidebar}
            />
          )}

      <div className='product-items'>
<div className="product-items-top">
<div className="product-item-count"><p>ITEMS 1 TO 71</p></div>
<div className="sort-options">
<label htmlFor="sortSelect" style={{ marginTop: "11px", fontSize:"12px", textTransform:"uppercase" }}>Sort By</label>
            <select id="sortSelect" >
              <option value="" selected>POPULAR</option>
              <option >PRICE(LOW TO HIGH)</option>
              <option >PRICE(HIGH TO LOW)</option>
              <option value="">NEWEST ARRIVALS</option>
              <option value="">BESTSELLERS</option>
            </select>
            </div>
</div>

<div className="product-items-bottom">
<ul>
        {currentItems.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.url_key}`}>
<div className="single-product">
{/* <img className='product-img' src={product.image.url} alt={product.name} /> */}
<img src="https://prod.aaw.com/media/catalog/product/cache/b8e9ee3e3eebf01caeedeb184a52afee/5/2/525252b6bc2de85aedfb32d5856e347606d54e60b66b6b60613053452117492c.jpeg" alt={product.name} className='product-img'/>
            <p className='product-name' style={{color:"black"}}>{product.name}</p>
            <h4 className='product-price'>KD {product.price.regularPrice.amount.value}</h4>
</div>
            
            </Link>
          </li>
        ))}
      </ul>
</div>


      
     
      
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