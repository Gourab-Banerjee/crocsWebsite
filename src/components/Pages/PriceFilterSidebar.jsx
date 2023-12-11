// PriceFilterSidebar.js

import React from 'react';
import Slider from '@mui/material/Slider';
import { FaTimes } from 'react-icons/fa';
import { FaPlus , FaMinus} from "react-icons/fa6";

const PriceFilterSidebar = ({
  price,
  priceHandler,
  isPriceSliderVisible,
  toggleSliderVisibility,
  closeSidebar
}) => {
  return (
    <div className="price-filter-sidebar">
      <div className="sidebar-header">
        <div className='sidebar-header-left'>
        <h5>FILTERS</h5>
        </div>
        <div className='sidebar-header-right'>
        <button className="sidebar-close-button" onClick={closeSidebar}>
          <FaTimes />
        </button>

        </div>
        
      </div>

      {/* Price Filter */}
      <div className='filters-item'>
        <div className='filter-sidebar-row'>
          <div className='row-para'>PRICE</div>
          <div className='row-button'>
            <button onClick={toggleSliderVisibility}>
              {isPriceSliderVisible ? <FaMinus /> : <FaPlus />}
            </button>
          </div>
        </div>
        {isPriceSliderVisible && (
          <>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={100}
              max={5000}
            />
          </>
        )}
      </div>

      {/* Gender Filter */}
      <div className='filters-item'>
        {/* Placeholder for Gender Filter */}
        <div className='filters-sidebar-row'>
          <div className='row-para'>GENDER</div>
          <div className='row-button'>
            {/* Placeholder for button */}
          </div>
        </div>
        {/* Placeholder for gender options */}
      </div>



      

      {/* Footwear Sizes Filter */}
      <div className='filters-item'>
        {/* Placeholder for Footwear Sizes Filter */}
        <div className='sidebar-row'>
          <div className='row-para'>FOOTWEAR SIZES</div>
          <div className='row-button'>
            {/* Placeholder for button */}
          </div>
        </div>
        {/* Placeholder for size options */}
      </div>

      
    </div>
  );
};

export default PriceFilterSidebar;
