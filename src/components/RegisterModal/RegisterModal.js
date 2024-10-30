import React, { useState } from "react";
import Modal from "react-modal";
import "./registerModal.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { POST } from "../../services/api";
import { Navigate, NavLink, useNavigate } from "react-router-dom";

// Set the app element for accessibility
// Modal.setAppElement("#root");

const RegisterForm = ({ isOpen, onRequestClose }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { registerStatus, registerError } = useAppSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    phone_number: "",
    email: "",
    password: "",
    project_name: "",
    stream: "",
    billing_type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    dispatch(POST("userRegister", "/register", formData)());
    navigate('/home');
    // onRequestClose(); // Close modal after submission
  };

  return (
    <div className="register-wrapper">

      <h1>Register</h1>
      {registerStatus === true ? (
        <div className="response-modal">
          <div>User Registered sucesfully! Please login to continue.</div>
          <button type="button" className="close-btn" onClick={onRequestClose}>
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-element">
            <label htmlFor="first_name">First Name:</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-element">
            <label htmlFor="last_name">Last Name:</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-element">
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-element">
            <label htmlFor="phone_number">Phone Number:</label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-element">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-element">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-element">
            <label htmlFor="project_name">Project Name:</label>
            <input
              type="text"
              id="project_name"
              name="project_name"
              value={formData.project_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-element">
            <label htmlFor="stream">Stream:</label>
            <input
              type="text"
              id="stream"
              name="stream"
              value={formData.stream}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-element">
            <label htmlFor="billing_type">Billing Type:</label>
            {/* <input
              type="text"
              id="billing_type"
              name="billing_type"
              value={formData.billing_type}
              onChange={handleChange}
              required
            /> */}
            <select id="billing_type"
              name="billing_type"
              value={formData.billing_type}
              onChange={handleChange} required
            >
              <option value="" disabled>
                Choose your billing Type
              </option>
              <option value="1">Billable</option>
              <option value="0">Non Billable</option>
            </select>
          </div>
          <div className="btn-wrapper">
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
          <div className="login-btn">
            Already a member? <span><NavLink to="/">Login</NavLink></span>
          </div>
          {registerError?.length > 0 &&
            registerError?.map((item, index) => (
              <div key={item} className="error-messsage">
                <p className="error-message">{item}</p>
              </div>
            ))}
        </form>
      )}
    </div>
  );
};

export default RegisterForm;
