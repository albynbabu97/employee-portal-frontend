import React, { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import "./projects.scss";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { GET, POST } from "../../services/api";
import ContentHeader from "../ContentHeader/contentHeader";
import NoResults from "../NoResults/NoResults";

const Projects = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const searchParam = useDebounce(search, 800);
  const projects = useAppSelector((state) => state.project.projectList);

  useEffect(() => {
    dispatch(GET("projectList", "/projects")());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      POST("projectListSearch", "/projects/search", {
        name: search,
        date: date,
      })()
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam, date, dispatch]);

  return (
    <div className="projects-page">
      <ContentHeader
        setDate={setDate}
        setSearch={setSearch}
        heading="Projects"
        tagline="Here is the project list you have created"
      />

      <div className="project-list-wrapper">
        {projects.length > 0 ? (
          projects.map((item) => (
            <div className="project-item" key={item.id}>
              <div className="project-type">{item.stream}</div>
              <div className="project-title-wrapper">
                <div className="title-section">
                  <div className="project-title">{item.name}</div>
                  <div className="project-duration">
                    {new Date(item.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
              <p className="project-description">
                This setup will ensure that whenever the user navigates to
                /page1, they are automatically redirected to the
              </p>
            </div>
          ))
        ) : (
          <NoResults content="No Projects found!" />
        )}
      </div>
    </div>
  );
};

export default Projects;
