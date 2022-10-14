import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div style={{ marginTop: "10rem" }}>
      <div className="d-flex flex-column gap-4 px-5 mx-auto">
        <h1
          style={{ fontSize: "4rem", fontWeight: "bolder" }}
          className="text-center"
        >
          404
        </h1>
        <h3 className="text-center">
          <span className="text-danger text-center">Opps!</span> Page not found.
        </h3>
        <p className="fs-5 text-center">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <button className="btn btn-primary d-block mx-auto">Go Home</button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
