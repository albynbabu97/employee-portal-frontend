import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import "./header.scss";
import { POST } from "../../../services/api";

const Header = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(POST("userLogout", "/logout", {})());
    navigate("/");
  };

  if (!isLoggedIn) {
    navigate("/");
    return null;
  }

  return (
    <div className="header-wrapper">
      <div className="top-content">
        <div className="logo">Employee Portal</div>
        <ul>
          <li>
            <NavLink
              to="/home/projects"
              activeclassname="active"
              className="projects-nav"
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/home/users"
              activeclassname="active"
              className="users-nav"
            >
              Users
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="user-details">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
