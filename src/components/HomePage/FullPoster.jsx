import React from 'react'
import "./FullPoster.css"
const FullPoster = ({src}) => {
  return (
    <div className='fullPoster-container'>
<img src={src} alt="" style={{width:"100%"}} />
    </div>
  )
}

export default FullPoster