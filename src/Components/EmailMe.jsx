//import modules and components

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import dotenv from "dotenv";
import {
  generateAccessToken,
  createCookie,
  getCookie,
  getUserToken,
  removeCookie,
} from "../token";
import LoginInput from "./Inputs/LoginInput";

dotenv.config();

const EmailMe = () => {
  const navigate = useNavigate();
  let cookie = "";
  //if there is no token so get out of the route
  if (getUserToken() === "") {
    cookie = "";
  } else {
    cookie = getUserToken();
  }
  useEffect(() => {
    try {
      //get the data of the user and check if there is user or not with that cookie
      async function getData() {
        const res = await fetch(`${process.env.REACT_APP_URL}/user/` + cookie);
        const data = await res.json();
        if (data.error === "There is no account") {
          removeCookie("User");
          navigate("/");
        }
      }
      getData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  //hooks
  const [inputs, setInputs] = useState({
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [backWrong, setBackWrong] = useState("");
  const [isEmpty, setIsEmpty] = useState({
    email: false,
    message: false,
  });

  //handle functions
  function handleInput(e) {
    let { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }
  async function handleClick(e) {
    e.preventDefault();
    setFormErrors(validate(inputs));
    //post the message
    try {
      await axios.post(`${process.env.REACT_APP_URL}/send-message`, inputs);
      navigate("/");
    } catch (err) {
      console.log(err);
      backValidate();
    }
  }

  const backValidate = (value) => {
    if (inputs.email) {
      setBackWrong("Email is wrong");
    }
  };

  const validate = (values) => {
    let errors = {};
    let { email, message } = values;
    if (!email) {
      errors.email = "Email is required";
      setIsEmpty((prev) => ({ ...prev, email: true }));
    } else {
      setIsEmpty((prev) => ({ ...prev, email: false }));
    }

    if (!message) {
      errors.message = "message is required";
      setIsEmpty((prev) => ({ ...prev, message: true }));
    } else {
      setIsEmpty((prev) => ({ ...prev, message: false }));
    }

    return errors;
  };

  return (
    <div
      style={{ paddingBottom: "10rem" }}
      className="mt-5 pt-5 text-dark px-5"
    >
      {cookie !== "" ? (
        <>
          <h1 className="text-center mt-5">Message me</h1>
          <form
            style={{ maxWidth: "50rem", paddingTop: "3rem" }}
            className="mx-auto mb-5 form-inline"
          >
            <div className="row">
              <div className="col-lg-12">
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Email:
                  </label>
                  <input
                    className={
                      isEmpty.email
                        ? "form-control border border-2 border-danger"
                        : "form-control"
                    }
                    name="email"
                    value={inputs.email}
                    onChange={handleInput}
                    placeholder="exmaple@gmail.com"
                    type="email"
                  />
                  <p className="text-danger">{formErrors.email}</p>
                </div>
              </div>

              <div className="col-lg-12">
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Message:
                  </label>
                  <textarea
                    className={
                      isEmpty.message
                        ? "form-control border border-2 border-danger"
                        : "form-control"
                    }
                    name="message"
                    value={inputs.message}
                    onChange={handleInput}
                    placeholder="Your message here"
                    type="text"
                  />{" "}
                  <p className="text-danger">{formErrors.message}</p>
                </div>
              </div>
            </div>

            <p className="text-center mx-auto text-danger">{backWrong}</p>
            <button
              onClick={handleClick}
              className="btn btn-success my-5 btn-lg"
            >
              Send
            </button>
          </form>
        </>
      ) : (
        <div className="d-flex flex-column justify-content-center gap-5">
          <p className="text-center h3" style={{ marginTop: "10rem" }}>
            Please Sign up or login to email me
          </p>
        </div>
      )}
    </div>
  );
};

export default EmailMe;
