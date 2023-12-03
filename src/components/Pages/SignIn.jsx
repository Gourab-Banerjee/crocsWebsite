// SignIn.js

import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaGoogle } from 'react-icons/fa';
import './SignIn.css';

const SignIn = () => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState({
    firstname: '',
    lastname: '',
    isSubscribed: false,
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [activeTab, setActiveTab] = useState('login');

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Add your sign-in logic here, e.g., API call or other authentication mechanism
    console.log('Login form submitted:', loginForm);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here, e.g., API call or other registration mechanism
    console.log('Registration form submitted:', registerForm);
  };

  return (
    <div className="sign-in-container">
      <div className="text-center">
        <div className="signin__details-title">Sign In Details</div>
      </div>

      <div className="block-authentication sl-popup">
        <div className="text-center">
          <div className="signin__details-title">Sign In Details</div>
        </div>

        <div className="block-content">
          <div className="sociallogin-or">
            <span>OR</span>
          </div>

          <div className="sociallogin-buttons">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/dialog/oauth/?client_id=491525552268891&display=popup&redirect_uri=https://www.crocs.com.kw/sociallogin/account/login/type/fb/&scope=email"
              className="social-login-button button-fb"
            >
              <FaFacebook />
            </a>

            {/* Instagram */}
            <a
              href="https://api.instagram.com/oauth/authorize/?client_id=3177845815772137&redirect_uri=https://www.crocs.com.kw/sociallogin/account/login/type/instagram/&response_type=code"
              className="social-login-button button-instagram"
            >
              <FaInstagram />
            </a>

            {/* Google */}
            <a
              href="https://accounts.google.com/o/oauth2/v2/auth?scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&access_type=offline&include_granted_scopes=true&state=state_parameter_passthrough_value&client_id=264918636520-7k027dsua2mlstnkqce8l0l1umol44l7.apps.googleusercontent.com&redirect_uri=https://www.crocs.com.kw/sociallogin/account/login/type/google/&response_type=code"
              className="social-login-button button-google"
            >
              <FaGoogle />
            </a>
          </div>
        </div>

        <div className="block-new-customer">
          <div className="block-title">
            <a
              href="#"
              id="sl_login_tab_title"
              onClick={() => handleTabChange('login')}
              className={activeTab === 'login' ? 'active' : ''}
            >
              Sign in with your email
            </a>
          </div>

          <div className="block-content" id="login_section" style={{ display: activeTab === 'login' ? 'block' : 'none' }}>
            <form className="form form-login" onSubmit={handleLoginSubmit}>
              {/* ... Existing code for email/password login ... */}
            </form>
          </div>

          <div className="block-title">
            <a
              href="#"
              id="sl_register_tab_title"
              onClick={() => handleTabChange('register')}
              className={activeTab === 'register' ? 'active' : ''}
            >
              Create an Account
            </a>
          </div>

          <div className="block-content" id="registration_section" style={{ display: activeTab === 'register' ? 'block' : 'none' }}>
            <form className="form create" onSubmit={handleRegisterSubmit}>
              {/* ... Existing code for registration ... */}
            </form>
          </div>

          <div className="block-title">
            <span className="sl-ajaxlogin-title-space">or</span>
          </div>
        </div>

        <div className="g__checkout" style={{ position: 'relative' }}>
          <div className="modal-gc-btn">
            <button className="action-close" data-role="closeBtn" type="button">
              <label>checkout as guest</label>
            </button>
          </div>

          <p className="text-center" style={{ paddingBottom: '15px', textAlign: 'center' }}>
            You can create an account after checkout.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
