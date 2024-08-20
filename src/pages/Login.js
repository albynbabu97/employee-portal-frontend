import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAsync } from "../features/auth/authAsyncActions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username && password) {
      try {
        // Dispatch loginAsync thunk and unwrap the result
        await dispatch(loginAsync({ username, password })).unwrap();
        navigate("/home");
      } catch (err) {
        setError("Login failed: " + err.message);
      }
    } else {
      alert("Please enter both username and password");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
