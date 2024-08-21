import React, { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import "./projects.scss";

import projectLogo from "../../assets/images/option.png";

const Projects = () => {
  const [search, setSearch] = useState("");
  const searchParam = useDebounce(search, 800);
  const projects = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    <div className="projects-page">
      <div className="content-wrapper">
        <h1 className="heading">Projects</h1>
        <p className="tagline">Here is the project list you have created</p>
        <input type="text" onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="project-list-wrapper">
        {projects.map((item) => (
          <div className="project-item" key={item}>
            <div className="project-type">Web Design</div>
            <div className="project-title-wrapper">
              <img src={projectLogo} alt="logo" width={100} height={100} />
              <div className="title-section">
                <div className="project-title">Define your routes an</div>
                <div className="project-duration">june 2024-july 2024</div>
              </div>
            </div>
            <p className="project-description">
              This setup will ensure that whenever the user navigates to /page1,
              they are automatically redirected to the
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
