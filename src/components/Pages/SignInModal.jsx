import React, { useState } from "react";
import "./SignInModal.css";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const SignInModal = ({ onClose }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async (e) => {
    e.preventDefault();

    const graphqlQuery = `
          mutation {
            generateCustomerToken(
              email: "${loginData.email}"
              password: "${loginData.password}"
            ) {
              token
            }
          }
        `;

    try {
      const response = await fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: graphqlQuery }),
      });

      const data = await response.json();
      

      // Handle the response data
      console.log("User sign-in response:", data);

      const token= data.data.generateCustomerToken.token
      localStorage.setItem("logInToken", token)

      // Close the modal or perform other actions based on the response
      onClose();
    } catch (error) {
      console.error("Error during user sign-in:", error);
      // Handle error, e.g., display an error message
    }
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
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
            </div>

            <div className="input-box">
              <label htmlFor="passwsord">Password *</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
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
      <div className="create-account">Create An Account</div>
      <div className="or" id="OR">
        <strong>OR</strong>
      </div>
      <div className="line"></div>
      <div className="guest">checkout as guest</div>
      <div className="acc-after-checkout">
        You can create an account after checkout
      </div>
    </div>
  );
};

export default SignInModal;
