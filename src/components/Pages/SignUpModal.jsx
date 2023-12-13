import React, { useState } from "react";
import "./SignInModal.css";
import "./SignUpModal.css";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const SignUpModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isSubscribed: false,
  });
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = formData;

    const graphqlQuery = `
      mutation {
        createCustomer(
          input: {
            firstname: "${firstName}"
            lastname: "${lastName}"
            email: "${email}"
            password: "${password}"
            is_subscribed: true
          }
        ) {
          customer {
            firstname
            lastname
            email
            is_subscribed
          }
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
      console.log("User registration response:", data);

      // Close the modal or perform other actions based on the response
      //   onClose();
    } catch (error) {
      console.error("Error during user registration:", error);
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
      <div className="create-account">Sign in with your Email</div>
      <div className="sign-in-form">
        <div className="form-title">
          <span>Create An Account</span>
        </div>
        <div className="form-input-container">
          <form action="" onSubmit={handleSignUp}>
            <div className="input-box">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>

            <div className="input-box">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                name="LastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>

            <div className="newsletter">
              <input
                type="checkbox"
                name="isSubscribed"
                id="isSubscribed"
                checked={formData.isSubscribed}
                onChange={(e) =>
                  setFormData({ ...formData, isSubscribed: e.target.checked })
                }
              />
              <label htmlFor="">Sign Up for Newsletter</label>
            </div>
            <div className="input-box">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="input-box">
              <label htmlFor="passwsord">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <div className="input-box">
              <label htmlFor="passwsord">Confirm Password *</label>
              <input
                type="password"
                name="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>

            <div className="submit-box">
              <div className="submit-button">
                <button type="submit">Create</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="or" id="OR">
        <strong>OR</strong>
      </div>

      <div className="guest">checkout as guest</div>
      <div className="acc-after-checkout">
        You can create an account after checkout
      </div>
    </div>
  );
};

export default SignUpModal;
