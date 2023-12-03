import React from "react";
import "./TopHeader.css";
import { TfiTruck } from "react-icons/tfi";

const TopHeader = () => {
  return (
    <>
      <div className="top_header-promo">
        <div className="quoteContainer">
          <span className="wpx-sub">
            <TfiTruck size={18} /> Same Day Delivery | Order before 1PM to
            receive your order today!{" "}
          </span>
        </div>
      </div>
      <div className="header-global-promo">
        <img
          src="https://prod.aaw.com/media/weltpixel/multistore/logo_inactive/stores/21/arabic_2.png"
          alt="Crocs العربية"
        />
      </div>
    </>
  );
};

export default TopHeader;
