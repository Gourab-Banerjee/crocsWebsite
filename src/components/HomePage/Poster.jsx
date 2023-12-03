import React from 'react'
import "./Poster.css"
const Poster = ({src}) => {
  return (
    <div className='poster-container'>
<img src={src} alt="" style={{width:"100%"}} />
    </div>
  )
}

export default Poster