// import logo from './logo.svg';
// import './App.css';
import "./online.css"
import "./common.css"


import React, { useState, useEffect } from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

import Header from "./components/Common/Header/Header";
import Footer from "./components/Common/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";


import ProductListPage from "./components/Pages/ProductListPage";
import ProductDetailsPage from "./components/Pages/ProductDetailsPage";
import OfflinePage from "./components/Pages/OfflinePage";
import NotFound from "./components/Pages/NotFound";
import SignIn from "./components/Pages/SignIn";
import SignInModal from "./components/Pages/SignInModal";
import SignUpModal from "./components/Pages/SignUpModal";


function App() {

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);
  return (
    <div className="container">
     

      
      <Router>
     <Header />
     
     {!isOnline && <OfflinePage />}

     {isOnline && (
      <>
      {/* Message box for online status */}
      {/* <div className="online-message-box">
              <p>Online</p>
            </div> */}
      <Routes>
     <Route  path="/" element={<HomePage/>}/>
     <Route path="/productList" element={<ProductListPage />} />
     <Route path="/product/:url_key" element={<ProductDetailsPage/>} />

     <Route path="*" element={<NotFound />} />
     <Route path="/signIn" element={<SignInModal />} />
     <Route path="/signUp" element={<SignUpModal />} />
     </Routes>
     </>
     )}
      
     <Footer />
     </Router>
     
    </div>
  );
}

export default App;
