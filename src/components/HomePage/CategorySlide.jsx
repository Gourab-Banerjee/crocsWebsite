import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "./ProductSlider.css";
import "./CategorySlides.css"

import axios from 'axios';




const CategorySlide = ({productImages,categoryImg,categoryTitle}) => {
  const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        const query = `{
          products(search: "", pageSize: 10) {
            items {
              id
              name
              sku
              price {
                regularPrice {
                  amount {
                    value
                    currency
                  }
                }
              }
              image {
                url
              }
            }
          }
        }`;
  
        try {
          const response = await fetch('/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
          });
  
          const data = await response.json();
  
          setProduct(data?.data?.products?.items);
        } catch (error) {
          console.error('Error fetching product data:', error);
          
          setError(error.message);
        }
      };
  
      fetchData();
    }, []);

    const handleViewAllClick = () => {
      // Navigate to the product listing page
      navigate('/productList');
    };
  
  return (
    <div className="category-slides-container">
  <div className='category-slider'>
 <div className='widget__border-icon'>
        <div className="widget__icon">
            <img className="img-fluid d-block" src={categoryImg} alt=""/>
                                <div className="widget__title">{categoryTitle}</div>
                                <div className="text-center" onClick={handleViewAllClick}><a className="widget__viewall" href="#!">VIEW ALL</a></div>
                            </div>
    </div>
  

    <div className='product-card-container' id='card-container'>
  {product.length !== 0 ?(
      

      <Swiper 
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={10}
          // slidesPerView={4}
          autoplay={true}
          navigation
          breakpoints={{
            // when window width is >= 640px
            375: {
              
              slidesPerView: 1,
            },
            430: {
               
               slidesPerView: 2,
            },
            640: {
             
              slidesPerView: 2,
            },
            // when window width is >= 768px
            768: {
              
              slidesPerView: 3,
            },
      
            980: {
              
              slidesPerView: 3,
            },
            1024:{
              
              slidesPerView:4,
            },
            1150: {
              
              slidesPerView: 4,
            },
          }}
          // pagination={{ clickable: true }}
        >
            {product.map((product, index) => (
              <SwiperSlide key={index}>
                <div className="product-card" >
                  <div className='card'></div>
                  <img src={productImages[index % productImages.length]} alt={`Product ${index + 1}`} />
                  <p>{product.name}</p>
          
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
      
          
      
     
  ):(
          <div className="error-container">
            <h2>Api Error! Check your connection</h2>
            {/* <h4>{error}</h4> */}
            {/* <button onClick={handleRefresh}>Retry Now</button> */}
          </div>
  )}
   </div>
  

    </div>
    </div>
  
   
  )
}

export default CategorySlide