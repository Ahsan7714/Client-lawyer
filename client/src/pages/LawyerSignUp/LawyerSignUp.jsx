import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LawyerSignUp.css';
import LoginNavbar from '../../components/LoginSignUpNavbar/LoginNavbar';

const LawyerSignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [lawyerLicense, setLawyerLicense] = useState(null);
  const [picture, setPicture] = useState(null);
  const [cnic, setCnic] = useState(null);

  // Function to handle file input changes
  const handleFileChange = (e, setStateFunction) => {
    const file = e.target.files[0];
    setStateFunction(file);
  };

  // Function to handle form submission
  const handleSignUp = () => {
    // You can access the state values here and perform the signup logic
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('City:', city);
    console.log('Province:', province);
    console.log('Lawyer License:', lawyerLicense);
    console.log('Picture:', picture);
    console.log('CNIC:', cnic);

    // Perform signup logic here...
  };

  return (
    <>
      <LoginNavbar />
      <div className="login-container">
        <div className="signup-page">
          <h1>Sign Up</h1>
          <div className="login-btn">
            <Link to="/client-signUp">
              <button className="btn-C">I am a Client</button>
            </Link>
            <Link to="/lawyer-signUp">
              <button className="btn-L">I am a Lawyer</button>
            </Link>
          </div>
          <div className="signup-inputs">
            <div className="left-inputs">
              <span>
                <p>Full Name:</p>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </span>

              <span>
                <p>Email:</p>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </span>

              <span>
                <p>Password:</p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </span>

              <p>Upload Lawyer License:</p>
              <span className="custom-file-input">
                <button className="choose-file-button">Choose File</button>
                <input
                  type="file"
                  accept="image/*" // Specify the accepted file type(s)
                  onChange={(e) => handleFileChange(e, setLawyerLicense)}
                />
              </span>
            </div>

            <div className="right-inputs">
              <span>
                <p>City:</p>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">Select city</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Islamabad">Islamabad</option>
                  {/* Add more city options */}
                </select>
              </span>

              <span>
                <p>Province:</p>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                >
                  <option value="">Select Province</option>
                  <option value="Punjab">Punjab</option>
                  <option value="KPK">KPK</option>
                  <option value="Balochistan">Balochistan</option>
                  <option value="Sindh">Sindh</option>
                  <option value="GilgitBaltistan">GilgitBaltistan</option>
                  {/* Add more province options */}
                </select>
              </span>

              <p>Upload Picture:</p>
              <span className="custom-file-input">
                <button className="choose-file-button">Choose File</button>
                <input
                  type="file"
                  accept="image/*" // Specify the accepted file type(s)
                  onChange={(e) => handleFileChange(e, setPicture)}
                />
              </span>

              <p>Upload CNIC:</p>
              <span className="custom-file-input">
                <button className="choose-file-button">Choose File</button>
                <input
                  type="file"
                  accept="image/*" // Specify the accepted file type(s)
                  onChange={(e) => handleFileChange(e, setCnic)}
                />
              </span>
            </div>
          </div>
          <button className="login-L" onClick={handleSignUp}>
            Sign Up
          </button>

          <div className="login-footer">
            <p>Already have an account? </p>
            <Link to="/lawyers-login" className="link">
              <p>Log In</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LawyerSignUp;
