import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!isLoggedIn) {
    navigate("/");
    return null;
  }

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome, {user.username}!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
