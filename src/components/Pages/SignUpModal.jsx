import React, { useState } from "react";
import "./SignInModal.css";
import "./SignUpModal.css";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import SignInModal from "./SignInModal";
import { useNavigate } from "react-router-dom";

const SignUpModal = ({ onClose }) => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isSubscribed: false,
  });

  const [showSignIn, setShowSignIn] = useState(false);
  const [errors, setErrors] = useState({});

  const [signUpError, setSignUpError] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;

    const validationErrors = { ...errors };

    if (name === "firstName") {
      const namePattern = /^[a-zA-Z\s]+$/;
      // Only alphabetic characters and spaces allowed
      if (value.length < 3) {
        validationErrors.firstName = "firstName must be at least 3 characters";
      } else if (!namePattern.test(value)) {
        validationErrors.firstName =
          "Name should only contain alphabetic characters";
      } else {
        delete validationErrors.firstName;
      }
    }else if (name === "lastName") {
      const namePattern = /^[a-zA-Z\s]+$/;
      // Only alphabetic characters and spaces allowed
      if (value.length < 3) {
        validationErrors.lastName = "lastName must be at least 3 characters";
      } else if (!namePattern.test(value)) {
        validationErrors.lastName =
          "Name should only contain alphabetic characters";
      } else {
        delete validationErrors.lastName;
      }
    }else if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(value)) {
        validationErrors.email = "Email is not valid";
      }
      // } else {
      //   // Check if the email already exists in the user list
      //   const emailExists = userList.some((user) => user.email === value);
      //   if (emailExists) {
      //     validationErrors.email = "Email already exists";
      //   } 
      else {
          delete validationErrors.email;
        }
      }
    
   
    else if (name === "password") {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
      if (value.length < 8) {
        validationErrors.password = "Password must be at least 8 characters";
      } else if (!passwordRegex.test(value)) {
        validationErrors.password =
          "Password should contain one digit, one lowercase, one uppercase";
      } else {
        delete validationErrors.password;
      }
    } else if (name === "confirmPassword") {
      if (value !== formData.password) {
        validationErrors.confirmPassword = "Passwords do not match";
      } else {
        delete validationErrors.confirmPassword;
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors(validationErrors);
  };
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

        // Check for errors in the response
    if (data.errors) {
      const errorMessages = data.errors.map((error) => error.message);
      console.error("User sign-in errors:", errorMessages);

      // Set the error messages in the state
      setSignUpError(errorMessages.join(", "));
      return;
    }

      // Handle the response data
      console.log("User registration response:", data);

      // Close the modal or perform other actions based on the response
        onClose();
    } catch (error) {
      console.error("Error during user registration:", error);
      // Handle error, e.g., display an error message
    }
  };
  const toggleSignIn = () => {
   
    setShowSignIn(true);
    
  };

  const closeSignIn =()=>{
    setShowSignIn(false)
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
      <div className="create-account" onClick={toggleSignIn}>Sign in with your Email</div>
      {showSignIn && <SignInModal onClose={closeSignIn} />}
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
                onChange={handleChange}
              />
               
            
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}
           
            </div>

            <div className="input-box">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
               
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            
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
                onChange={handleChange}  
              />
              
            
              {errors.email && <span className="error">{errors.email}</span>}
              {signUpError && <div className="error-message">{signUpError}</div>}
           
            </div>

            <div className="input-box">
              <label htmlFor="passwsord">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
               
           
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            
            </div>

            <div className="input-box">
              <label htmlFor="confirmPasswsord">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              
            
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            
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
