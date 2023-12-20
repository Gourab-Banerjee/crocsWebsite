import React, { useState } from "react";
import "./SignInModal.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../../features/SignInSlice';
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import SignUpModal from "./SignUpModal"; 
import {createCustomerCart} from "../../features/CreateCustomerCart"

const SignInModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const signInToken = useSelector((state) => state.signIn.signInData);
  const customerCartId = useSelector((state)=>state.customerCart.cartId);
  const status = useSelector((state) => state.signIn.status);
  const error = useSelector((state) => state.signIn.error);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loginErrors, setLoginErrors] = useState({});
  const [showSignUp, setShowSignUp] = useState(false);


  // const [signInError, setSignInError] = useState(null);



  const handleChange = (e) => {
    const { value, name } = e.target;
    const validationErrors = { ...loginErrors };
    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(value)) {
        validationErrors.email = "Email is not valid";
      } else {
        delete validationErrors.email;
      }
    } else if (name === "password") {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
      if (value.length < 8) {
        validationErrors.password = "Password must be at least 8 characters";
      } else if (!passwordRegex.test(value)) {
        validationErrors.password = "Password is not matched";
      } else {
        delete validationErrors.password;
      }
    }
    setLoginData(() => {
      return {
        ...loginData,
        [name]: value,
      };
    });

    setLoginErrors(validationErrors);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Dispatch the sign-in action
    dispatch(signInUser(loginData));
    localStorage.setItem("signInToken", signInToken)

dispatch(createCustomerCart())
localStorage.setItem("customerCartId", customerCartId);


    // Close the modal or perform other actions based on the response
      // onClose();




    // const graphqlQuery = `
    //       mutation {
    //         generateCustomerToken(
    //           email: "${loginData.email}"
    //           password: "${loginData.password}"
    //         ) {
    //           token
    //         }
    //       }
    //     `;

    // try {
    //   const response = await fetch("/graphql", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ query: graphqlQuery }),
    //   });

    //   const data = await response.json();

    //    // Check for errors in the response
    // if (data.errors) {
    //   const errorMessages = data.errors.map((error) => error.message);
    //   console.error("User sign-in errors:", errorMessages);

    //   // Set the error messages in the state
    //   setSignInError(errorMessages.join(", "));
    //   return;
    // }
      

    //   // Handle the response data
    //   console.log("User sign-in response:", data);

    //   const token= data.data.generateCustomerToken.token
    //   localStorage.setItem("logInToken", token)

    //   // Close the modal or perform other actions based on the response
    //   onClose();
    // } catch (error) {
    //   console.error("Error during user sign-in:", error);

    //   // Handle error, e.g., display an error message
    // }
  };

  const toggleSignUp = () => {
   
    setShowSignUp(true);
    
  };

  const closeSignUp =()=>{
    setShowSignUp(false)
    onClose()
  };


  return (
    <div className="sign-in-modal">
      {/* Your sign-in or sign-up form goes here */}
      <div className="sign-in-details-title">
        <h2>Sign In Details</h2>
      </div>
      <div className="line"></div>

      {/* Add form fields, buttons, etc. */}
      <button className="sign-in-close" onClick={onClose}>
        &times;
      </button>
      <div className="social-medias">
        <div className="social-media-header">Sign In With Social Media</div>
        <div className="social-media-facebook">
          <div className="social-media-icon" id="facebook">
            <FaFacebookF />
          </div>
          <div className="social-media-text" id="facebook">
            Sign In With Facebook
          </div>
        </div>

        <div className="social-media-instagram">
          <div className="social-media-icon" id="instagram">
            <FaInstagram />
          </div>
          <div className="social-media-text" id="instagram">
            Sign In With Instagram
          </div>
        </div>

        <div className="social-media-google">
          <div className="social-media-icon" id="google">
            <FcGoogle />
          </div>
          <div className="social-media-text" id="google">
            Sign In With Google
          </div>
        </div>
      </div>
      <div className="or">OR</div>
      <div className="sign-in-form">
        <div className="form-title">
          <span>Sign In With Your Email</span>
        </div>
        <div className="form-input-container">
          <form action="" onSubmit={handleSignIn}>
            <div className="input-box">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
              />
              
              {loginErrors.email && (
                <span className="error">{loginErrors.email}</span>
              )}
              {error && <div className="error-message">{error}</div>}
            
            </div>

            <div className="input-box">
              <label htmlFor="passwsord">Password *</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
              />
             
              {loginErrors.password && (
                <span className="error">{loginErrors.password}</span>
              )}
           
            </div>
            <div className="submit-box">
              <div className="submit-button">
                <button type="submit">Sign In</button>
              </div>
              <div className="forgot-password">Forgot Your Password?</div>
            </div>
          </form>
        </div>
      </div>
     
      <div className="create-account" onClick={toggleSignUp}>Create An Account</div>
      {/* <div className="create-account" ><Link to="/signUp">Create An Account</Link></div> */}

      <div className="or" id="OR">
        <strong>OR</strong>
      </div>
      <div className="line"></div>
      <div className="guest">checkout as guest</div>
      <div className="acc-after-checkout">
        You can create an account after checkout
      </div>
      {showSignUp && <SignUpModal onClose={closeSignUp} />}
    </div>
  );
};

export default SignInModal;
