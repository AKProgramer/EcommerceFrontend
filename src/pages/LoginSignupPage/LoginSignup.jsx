import React, { useState } from 'react';
import Login from '../../components/LoginSignup/Login'; 
import Signup from '../../components/LoginSignup/Signup'; 
import './LoginSignup.css';  

function LoginSignup() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  return (
    <div className={`containerr ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-containerr">
        <div className="signin-signup">
         <Login/>
          <Signup/>
        </div>
      </div>
      <div className="panels-containerr">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Welcome to FAST Mart Login page</p>
            <button className="btn transparent" id="sign-up-btn" onClick={handleSignUpClick}>
              Sign Up
            </button>
          </div>
          <img src="/fast.png" className="image h-full w-full" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Welcome to FAST Mart Signup page</p>
            <button className="btn transparent" id="sign-in-btn" onClick={handleSignInClick}>
              Sign In
            </button>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
