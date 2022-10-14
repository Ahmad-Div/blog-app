import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCookie, removeCookie, getUserToken } from "../token";

const Header = () => {
  let cookie = "";

  if (getUserToken() === "") {
    cookie = "";
  } else {
    cookie = getUserToken();
  }

  const isCookie = document.cookie !== "";

  const navigate = useNavigate();

  function logOut() {
    removeCookie("User");
    window.location.reload();
    navigate("/");
  }

  return (
    <header
      style={{ backgroundColor: "#2A2550" }}
      className="navbar  fixed-top p-3 navbar-expand-lg position-relative"
    >
      <div className="container-fluid">
        <a href="#" className="navbar-brand text-light">
          Blog Community
        </a>
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li
              style={{ marginLeft: "40px" }}
              className="nav-item my-lg-auto my-2"
            >
              <Link to="/" className="nav-link text-light">
                Home
              </Link>
            </li>
            <li
              style={{ marginLeft: "40px" }}
              className="nav-item my-lg-auto my-2"
            >
              <Link className="nav-link text-light" to="/about">
                About
              </Link>
            </li>

            {!isCookie ? (
              <>
                <Link
                  to="/login"
                  className="nav-link text-light my-lg-auto my-2"
                >
                  <button
                    style={{ marginLeft: "40px" }}
                    className="nav-item btn btn-outline-light"
                  >
                    Login
                  </button>
                </Link>
                <Link
                  to="/signup"
                  className="nav-link text-light  my-lg-auto my-2"
                >
                  <button
                    style={{ marginLeft: "40px" }}
                    className="nav-item btn btn-outline-warning"
                  >
                    Sign up
                  </button>
                </Link>
              </>
            ) : (
              <>
                <li
                  style={{ marginLeft: "40px" }}
                  className="nav-item my-lg-auto my-2 "
                >
                  <Link to="/compose" className="nav-link text-light">
                    Compose
                  </Link>
                </li>

                <div className="dropdown">
                  <button
                    style={{ marginLeft: "40px" }}
                    className="btn btn-outline-warning dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    My Account
                  </button>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li>
                      <Link
                        to={"/profile/" + cookie}
                        className="dropdown-item"
                        href="#"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <a onClick={logOut} className="dropdown-item" href="#">
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
                <Link className="text-decoration-none">
                  <button
                    style={{ marginLeft: "40px", maxWidth: "10rem" }}
                    type="button"
                    class="btn btn-outline-warning  my-lg-auto my-4 "
                  >
                    Notifications{" "}
                    <span class="badge text-bg-primary mx-2">4</span>
                  </button>{" "}
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
