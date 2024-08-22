import React, { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import "./projects.scss";

import projectLogo from "../../assets/images/option.png";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { GET } from "../../services/api";
import ContentHeader from "../ContentHeader/contentHeader";

const Projects = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const searchParam = useDebounce(search, 800);
  const projects = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  // const projects = useAppSelector((state) => state.project.projectList);

  useEffect(() => {
    console.log(search);
    console.log(date);
    dispatch(GET("projectList", "/api/data")());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam, date, dispatch]);

  return (
    <div className="projects-page">
      <ContentHeader setDate={setDate} setSearch={setSearch} />

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
