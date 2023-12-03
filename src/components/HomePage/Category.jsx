import React from "react";
import "./Category.css";
const Category = () => {
  return (
    <div className="category-container">
      <div className="container-row">
        <div className="category-col">
          <div className="crocs-img">
            <a href="#!">
              <img
                src="https://static.aawweb.com/media/wysiwyg/assets/crocs/Women-cx.jpg"
                alt="Crocs Kuiwat"
              />
            </a>
          </div>
        </div>
        <div className="category-col">
          <div className="crocs-img">
            <a href="#!">
              <img
                src="https://static.aawweb.com/media/wysiwyg/assets/crocs/Men-cx.jpg"
                alt="Crocs Kuiwat"
              />
            </a>
          </div>
        </div>
        <div className="category-col">
          <div className="crocs-img">
            <a href="#!">
              <img
                src="https://static.aawweb.com/media/wysiwyg/assets/crocs/kids-cx.jpg"
                alt="Crocs Kuiwat"
              />
            </a>
          </div>
        </div>
        <div className="category-col">
          <div className="crocs-img">
            <a href="#!">
              <img
                src="https://static.aawweb.com/media/wysiwyg/assets/crocs/Jibbitz-cx.jpg"
                alt="Crocs Kuiwat"
              />
              
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
