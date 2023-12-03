import React from 'react'
import "./NotFound.css"
import { Link } from 'react-router-dom';


const NotFound = () => {
  return (
    <div className='page-404'>

        <div className='left-col-404'>
        <img class="img-fluid mx-auto d-block" src="https://static.aawweb.com/media/wysiwyg/404/404-oops_2x.png" alt="Crocs Kuiwat"/>
         {/* Button to go to the home page */}
         <Link to='/'>
          <button className='go-to-home-button'>Back to Home Page</button>
        </Link>
        </div> 


        <div className='right-col-404'>
        <img class="img-fluid mx-auto d-block" src="https://static.aawweb.com/media/wysiwyg/404/404-img_2x.png" alt="Crocs Kuiwat"/>
        </div>
    </div>
  )
}

export default NotFound