import React, { useState } from 'react'
import "./PanelHeader.css";
import SignInModal from '../../Pages/SignInModal';
import SignUpModal from '../../Pages/SignUpModal';

const PanelHeader = () => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const openSignInModal = () => {
    setIsSignInModalOpen(true);
  };

  const closeSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };
  return (
    <div className='panel-header-container'>
    <div className='panel-header'>
        <ul className='panel-header-links'>
            <li><a href="#!" onClick={openSignInModal}>SIGN IN</a></li>
            <li>OR</li>
            <li><a href="#!" onClick={openSignUpModal}> CREATE AN ACCOUNT</a></li>
        </ul>
        </div>
        {/* Conditionally render the sign-in modal */}
      {isSignInModalOpen && <SignInModal onClose={closeSignInModal} />}

{/* Conditionally render the sign-up modal */}
{isSignUpModalOpen && <SignUpModal onClose={closeSignUpModal} />}
    </div>
  )
}

export default PanelHeader