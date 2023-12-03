import React from 'react'
import "./TopFooter.css"

const TopFooter = () => {
  return (
    <div className='riskFree'>
        <h4>
            Risk Free Shopping
        </h4>
        <div className='topFooter-row'>
            <div className='topFooter-column'>
           <img src="https://prod.aaw.com/media/wysiwyg/common/crocs/shipping.png" alt="" />
           <h4 class="headline">Free Shipping</h4>
           <div class="content">


  <p>Same Day Delivery | Order before 1PM to receive your order today.</p>
                </div>

            </div>
            <div className='topFooter-column'>
            <img src="https://prod.aaw.com/media/wysiwyg/common/crocs/returns.png" alt='' />
            <h4 class="headline">Free Returns</h4>
            <div class="content">
                    <p >Changed your mind? No problem. Our free return process makes it easy</p>
                </div>
                </div>
                <div className='topFooter-column'>
                <img src="https://prod.aaw.com/media/wysiwyg/common/crocs/clean.png" alt='' />
                <h4 class="headline" >Easy to Clean</h4>
                <div class="content">
                    <p>Washes off with soap and water.</p>
                </div>
                </div>
                <div className='topFooter-column'>
                <img src="https://prod.aaw.com/media/wysiwyg/common/crocs/digicert.png" alt='' />
                <h4 class="headline" >Your Information Is Secure</h4>
                <div class="content">
                    <p>100% secured transaction using SSL encrypted connection.</p>
                </div>
                </div>
        </div>

    </div>
  )
}

export default TopFooter