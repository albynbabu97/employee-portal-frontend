import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./header.scss";

const Header = () => {
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
    <div className="header-wrapper">
      <div className="logo">{user.username.charAt(0)}</div>
      <div className="user-details">
        <button className="logout-btn" onClick={handleLogout}></button>
      </div>
    </div>
  );
};

export default Header;
