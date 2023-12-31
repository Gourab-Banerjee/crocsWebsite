import React, { useEffect, useState } from "react";
import "./HomePage.css"
import FullPoster from "./FullPoster";
import ProductSlider from "./ProductSlider";
import Poster from "./Poster";
import Category from "./Category";
import CategoryBox from "./CategoryBox";
import Banners from "./Banners";
import CategorySlide from "./CategorySlide";
import { useDispatch, useSelector } from 'react-redux';
import { createEmptyCart } from "../../features/CreateEmptyCart";
import { FadeLoader } from "react-spinners"; // Import the ClipLoader component from react-spinners



// import images
import { bannerImages1, bannerImages2, productImages1, productImages2, categoryProductImages1, categoryProductImages2, categoryProductImages3 } from "../images/images";
import FullBanner from "./FullBanner";



const HomePage = () => {
  const dispatch = useDispatch();
  const cartId = useSelector((state) => state.emptyCart.cartId);

  const[loading, setLoading]=useState(true)

  useEffect(() => {
    // Check if cartId exists in local storage
    const existingCartId = localStorage.getItem("cartId");
    setTimeout(() => {
      if (existingCartId) {
        dispatch(createEmptyCart.fulfilled(existingCartId));
      } else {
        dispatch(createEmptyCart());
      }
      
      // Set loading state to false when the data is loaded
      setLoading(false);
    }, 2000);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="spinner-container">
        <FadeLoader  size={100} color={"#123abc"} loading={loading} />
      </div>
    );
  }
  return (
    <div>
      <FullBanner slideImages={bannerImages1} />

      <FullPoster src="https://prod.aaw.com/media/wysiwyg/brands-logo/new-tabby-blk-en.jpg" />
      
      <div className="homePageContainer">
        <div className="container-wrap">
          <Poster src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/h/p/hp-crocs-gift-card1_2560x788.jpg" />
        <ProductSlider
        title="UP TO 25% - 70% OFF!"
        backGroundColor="#e41e2d"
        images={productImages1}
      />
      <ProductSlider
        title="NEW ARRIVALS"
        backGroundColor="#6b599f"
        images={productImages2}
      />
      <Category />
      <ProductSlider
        title="TRENDING"
        backGroundColor="#36a585"
        images={productImages1}
      />
      <Poster src="https://prod.aaw.com/media/wysiwyg/brands-logo/new-tamara-blk-en.jpg" />
      <Poster src="https://static.aawweb.com/media/wysiwyg/assets/crocs/2023/cx-jibbitz-hp-en-large.jpg" />
      <Poster src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/1/_/1_2560x788_en_crocsatwork-min.jpg" />


      <CategorySlide
        productImages={categoryProductImages2}
        categoryImg="https://static.aawweb.com/media/wysiwyg/assets/crocs/crocs-kw-widget-clogs-2.png"
        categoryTitle="CLOGS"
      />

      <CategorySlide
        productImages={categoryProductImages1}
        categoryImg="https://static.aawweb.com/media/wysiwyg/assets/crocs/crocs-kw-widget-slides.png"
        categoryTitle="SLIDES"
      />
      
      <Banners slideImages={bannerImages2} />
      
      <CategorySlide
        productImages={categoryProductImages3}
        categoryImg="https://static.aawweb.com/media/wysiwyg/assets/crocs/sandals_img-2023.png"
        categoryTitle="SANDALS"
      />
      <Poster src="https://static.aawweb.com/media/wysiwyg/assets/crocs/2023/crocs-jibbitx-june-21-23-2560x788.jpg" />
      <Poster src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/2/5/2560x788-min_3__1.jpg" />

      <CategoryBox />

        </div>
     

      </div>
      
    </div>
  );
};

export default HomePage;
