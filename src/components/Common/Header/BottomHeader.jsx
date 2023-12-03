import React from 'react'
import PanelHeader from './PanelHeader'

import "./BottomHeader.css"
import HeaderMenuBar from './HeaderMenuBar'


const BottomHeader = () => {
  return (
    <div className='bottom-header'>
        <PanelHeader />
      
        <HeaderMenuBar />
        
    </div>
  )
}

export default BottomHeader