// UserDetails.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../../features/UserDetailsSlice';
import "./UserDetails.css";

const UserDetails = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails.userDetails);
  const status = useSelector((state) => state.userDetails.status);
  const error = useSelector((state) => state.userDetails.error);
  const [isUserVisible, setUserVisibility] = useState(true);
  const customerToken = localStorage.getItem('signInToken');


  useEffect(() => {
    dispatch(fetchUserDetails(customerToken));
  }, [dispatch]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // if (status === 'failed') {
  //   return <p>Error: {error}</p>;
  // }
  const handleCloseClick = () => {
    setUserVisibility(false);
  };
  const handleLogOut=()=>{
    localStorage.removeItem('signInToken')
    localStorage.removeItem('customerCartId')
    localStorage.removeItem("cartId")
    setUserVisibility(false);
  }


  return (
    <>
    {isUserVisible && (
      <div className="user-details-container">
        <div className="user-details-header">
        <h3 className='user-heading'>User Details</h3>
        <button className="cart-button" onClick={handleCloseClick}>
              <span>&times;</span>
              </button>
        </div>
       
      {userDetails ? (
        <div className='user-details'>
          
          <p> <strong>First Name:</strong> {userDetails.firstname}</p>
          <p>  <strong>Last Name:</strong> {userDetails.lastname}</p>
          <p>  <strong>Email:</strong> {userDetails.email}</p>
          <div className="log-out" onClick={handleLogOut}>Logout</div>
          
          {/* Add other user details as needed */}
        </div>
      ):(<div className="error">{error}</div>)}
      
    </div>

    )}
    </>
    
  );
}

export default UserDetails;
