import React from 'react'
import "./PanelHeader.css";
const PanelHeader = () => {
  return (
    <div className='panel-header-container'>
    <div className='panel-header'>
        <ul className='panel-header-links'>
            <li><a href="#!">SIGN IN</a></li>
            <li>OR</li>
            <li><a href="#!"> CREATE AN ACCOUNT</a></li>
        </ul>
        </div>
    </div>
  )
}

export default PanelHeader