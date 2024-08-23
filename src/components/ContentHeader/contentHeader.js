import React from "react";
import "./contentHeader.scss";

const ContentHeader = ({ setSearch, setDate, heading, tagline }) => {
  return (
    <div className="projects-page">
      <div className="content-wrapper">
        <div>
          <h1 className="heading">{heading}</h1>
          <p className="tagline">{tagline}</p>
        </div>
        <div className="controls">
          <input
            className="search-box"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
          <input
            className="search-box"
            type="date"
            onChange={(e) => setDate(e.target.value)}
            placeholder="Date"
          />
        </div>
      </div>
    </div>
  );
};

export default ContentHeader;
