import React, { useEffect, useState } from "react";
import "./HeaderMenu.css";

import { LiaSearchSolid } from "react-icons/lia";
import { FaHeart } from "react-icons/fa";
import { ImUser } from "react-icons/im";
import { BsCartFill } from "react-icons/bs";
import MiniCart from "../../Pages/MiniCart";


const HeaderMenuBar = () => {
  const [productItems, setProductItems] = useState([]);
  const [error, setError] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  
  const [showSearchInput, setShowSearchInput] = useState(false);

  const [isMiniCartOpen, setMiniCartOpen] = useState(false);

  const handleCartClick = () => {
    setMiniCartOpen(!isMiniCartOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      const query = `{
        categoryList(filters: {ids:{eq: "467"}}) {
          uid,
          name,
          id,
          level,
          children_count
          children {
            id
            level
            name
            path
            url_path
            url_key
            image
            description
            children {
              id
              level
              name
              path
              url_path
              url_key
              image
              description
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

        const responseData = await response.json();
        setProductItems(responseData?.data?.categoryList[0]?.children);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const renderDropdown = (children) => {
    return (
      <ul className="dropdown">
        {children.map((child, idx) => (
          <li key={idx}>
            <a href={`#${child.path}`}>{child.name}</a>
          </li>
        ))}
      </ul>
    );
  };

  

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };
  return (
    <div className="menuBar">
 <div className={`header-content ${showSidebar ? "sidebar-open" : ""}`}>
         {showSidebar ? (
          <div className="menu-icon closing-icon" onClick={toggleSidebar}>
            {/* You can use a suitable icon for closing the sidebar */}
            <span>&times;</span>
          </div>
        ) : (
          <div className="menu-icon opening-icon" onClick={toggleSidebar}>
            {/* You can use a suitable icon for opening the sidebar */}
            <span>&#9776;</span>
          </div>
        )}
      <div className="header-content-top">
        <div className="logo desktop-logo desktop-logo-all">
          <a href="/" className="anchorLogo">
            <img
              src="https://static.aawweb.com/media/logo/stores/5/Crocs_logo_wordmark_logotype-01.png"
              title=""
              alt=""
              width="170"
            />
          </a>
        </div>
       
      </div>

      {showSidebar ? (
        // Sidebar content
        <div className="sidebar">
           <div className="close-button" onClick={toggleSidebar}>
              <span>&times;</span>
            </div>
          <ul className="sidebar-links">
            {productItems.map((item, id) => (
              <li key={id}>
                <a href={`#${item.path}`} onClick={toggleSidebar}>
                  {item.name}
                </a>
                {renderDropdown(item.children)}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        // Main content area
        <div className="navigation">
          {productItems?.length !== 0 && (
            <ul className="megamenu">
              {productItems.map((item, id) => {
                if (item?.children?.length !== 0) {
                  return (
                    <li key={id}>
                      <a href="#!">{item?.name}</a>
                      {renderDropdown(item.children)}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          )}
        </div>
      )}

<div className="header-content-right">
        <ul className="right-links">
          <li className="search-icon"  onMouseEnter={toggleSearchInput} onMouseLeave={toggleSearchInput}>
            <a href="#!">
              <LiaSearchSolid size={30} color="black" />
            </a>
            {/* {showSearchInput && (
              <div className="search-input-container">
                <input type="text" placeholder="Search..." />
              </div>
            )} */}
          </li>
          <li className="heart">
            <a href="#!" >
              <FaHeart size={25} color="black" />
            </a>
          </li>
          <li>
            <a href="#!">
              <ImUser size={25} color="black" />
            </a>
          </li>
          <li>
            <a href="#!" onClick={handleCartClick}>
              <BsCartFill size={25} color="black" />
            </a>
          </li>
        </ul>
      </div>
      {isMiniCartOpen && <MiniCart />}

    </div>

    {error && (
          <div className="error-container">
            <h2>Api Error! Check your connection</h2>
            {/* <h4>{error}</h4> */}
            {/* <button onClick={handleRefresh}>Retry Now</button> */}
          </div>
        )}

    <div className="fullSearch">
      <input type="text" placeholder="🔍  Search Entire Store Here..."/>
    </div>
    </div>
   
  );
};

export default HeaderMenuBar;
