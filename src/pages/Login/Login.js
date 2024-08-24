import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
// import { loginAsync } from "../../store/features/auth/authAsyncActions";
import { useNavigate } from "react-router-dom";
import { POST } from "../../services/api";
import "./login.scss";

import loginAvatar from "../../assets/images/login/login-avatar.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useAppSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async () => {
    setError(""); // Reset error message on each submit attempt

    // Check if both fields are filled
    if (!username || !password) {
      setError("Both username and password are required.");
      return;
    }

    try {
      dispatch(
        POST("userLogin", "/login", {
          email: username,
          password: password,
        })()
      );
      // await dispatch(loginAsync({ username, password })).unwrap();
      navigate("/home");
    } catch (err) {
      setError("Login failed: " + err.message);
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
            Not a member? <span>Register Now</span>
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
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
