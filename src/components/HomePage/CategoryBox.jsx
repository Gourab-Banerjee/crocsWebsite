import React from 'react'
import "./CategoryBox.css"

const CategoryBox = () => {
  return (
    <div>
        <div className='box-container'>
           <div className='0ne-stop'>
           <h3>Your One Stop Shop for Shoes, Sandals, Clogs, & More </h3>
           </div>
           <div className='shop-row'>
            <div className='shop-col'>
              <h4>Shop Women's</h4>
            </div>
            <div className='shop-col'>
              <h4>Shop Men's</h4>
            </div>
           </div>

           <div className='shop-row'>
           <div className='shop-col'>
              <h4>Shop Kid's</h4>
            </div>
            <div className='shop-col'>
              <h4>Shop Jibbitz</h4>
            </div>
           </div>
           {/* <div class="crocs-insta"><a target="_blank" rel="noreferrer noopener" href="https://instagram.com/crocskuwait" class="wx-title-image-container css-1220633"><img src="https://api.woxo.tech/instagram/userpicture?source=@crocskuwait" class="wx-title-image css-jo78u7" alt="" style={{width}}/></a>
           <h2 class="wx-title css-1r0tfio"> @crocskuwait</h2>
           </div> */}
        </div>
    </div>
  )
}

export default CategoryBox