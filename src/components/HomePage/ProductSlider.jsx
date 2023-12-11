import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./ProductSlider.css";

const ProductSlider = ({ title, backGroundColor, images }) => {
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
        const response = await fetch("/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        const result = await response.json();

        if (result.errors) {
          throw new Error(result.errors[0].message);
        }

        setProduct(result.data.products.items);
      } catch (error) {
        console.log("error", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);
  const handleViewAllClick = () => {
    // Navigate to the product listing page
    navigate("/productList");
  };

  return (
    <div
      className="product-container"
      style={{ backgroundColor: backGroundColor || "#ffffff" }}
    >
      <div className="product-offer">
        <h2 className="offer-price">{title}</h2>
      </div>
      <div className="view" onClick={handleViewAllClick}>
        <p>VIEW ALL</p>
      </div>

      <div className="product-card-container">
        {product.length !== 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={10}
            autoplay={true}
            navigation
            breakpoints={{
              // when window width is >= 640px
              375: {
                slidesPerView: 2,
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
              1024: {
                slidesPerView: 4,
              },
              1150: {
                slidesPerView: 4,
              },
            }}

            // pagination={{ clickable: true }}
          >
            {product.map((product, index) => (
              <SwiperSlide key={index}>
                <div className="product-card">
                  <img
                    src={images[index % images.length]}
                    alt={`Product ${index + 1}`}
                  />
                  <div className="product-card-details">
                    <p className="product-card-name">{product.name}</p>
                    <h5 className="product-card-price">
                      KD {product.price.regularPrice.amount.value}
                    </h5>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="error-container">
            <h2>Api Error! Check your connection</h2>
            {/* <h4>{error}</h4> */}
            {/* <button onClick={handleRefresh}>Retry Now</button> */}
          </div>
        )}
      </div>
      {/* Navigation arrows
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div> */}
    </div>
  );
};

export default ProductSlider;
