import React from "react";
import "./noResults.scss";

const NoResults = ({content}) => {
    return (
        <div className="no-results">
            <p>{content}</p>
        </div>
    );
};

export default NoResults;
