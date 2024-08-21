import React from "react";
import { useSelector } from "react-redux";
import Header from "../../components/layout/Header/Header";
import { Outlet } from "react-router-dom";

import "./home.scss";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Header />
      <div className="container">
        <h1>Welcome {user?.username}!</h1>
        <Outlet />
      </div>
    </>
  );
};

export default Home;
