import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import { POST } from "../../services/api";
import ModalRegisterForm from "../../components/RegisterModal/RegisterModal";
import { setRegisterFormClose } from "../../store/features/authSlice";
import "./login.scss";

import loginAvatar from "../../assets/images/login/login-avatar.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    dispatch(setRegisterFormClose());
  };

  const { isLoggedIn, status, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (status === "failed") {
      setLocalError("Login failed. " + error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleLogin = async () => {
    setLocalError(""); // Reset error message on each submit attempt

    // Check if both fields are filled
    if (!username || !password) {
      setLocalError("Both username and password are required.");
      return;
    }

    try {
      dispatch(
        POST("userLogin", "/login", {
          email: username,
          password: password,
        })()
      );
      navigate("/home");
    } catch (err) {
      setLocalError("Login failed: " + err.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="left-div">
          <img
            width={100}
            height={100}
            className="login-avatar"
            src={loginAvatar}
            alt="login avatar"
          />
        </div>
        <div className="right-div">
          <div className="register-btn">
            Not a member? <span onClick={openModal}>Register Now</span>
          </div>
          <h1>Login here!</h1>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
          <button
            type="submit"
            onClick={handleLogin}
            className="submit-btn"
            disabled={!username || !password}
          >
            Login
          </button>
          {localError && <p className="error-message">{localError}</p>}
        </div>
      </div>
      <ModalRegisterForm isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default Login;
