//import modules and components

import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import dotenv from "dotenv";
import { generateAccessToken, createCookie } from "../token";
import LoginInput from "./Inputs/LoginInput";

dotenv.config();

const Login = () => {
  //hooks
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [backWrong, setBackWrong] = useState("");
  const [isEmpty, setIsEmpty] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();

  //handle functions
  function handleInput(e) {
    let { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }
  async function handleClick(e) {
    e.preventDefault();
    setFormErrors(validate(inputs));
    try {
      await axios
        .post(`${process.env.REACT_APP_URL}/login`, inputs)
        .then(async (res) => {
          console.log(res.data.isValidated);
          if (!res.data.isValidated) {
            navigate("/account-validation");
          } else {
            let token = await generateAccessToken(res.data._id.toString());
            createCookie("User", token);
            navigate("/");
          }
        });
    } catch (err) {
      console.log(err);
      backValidate(err.message);
    }
  }

  const backValidate = (value) => {
    if (inputs.email !== "" && inputs.password !== "") {
      if (value === "Request failed with status code 406") {
        setBackWrong("Your account has been reported , please sign up again ");
      } else if (inputs.email || inputs.password) {
        setBackWrong("Email or password is wrong");
      }
    }
  };

  const validate = (values) => {
    let errors = {};
    let { email, password } = values;
    if (!email) {
      errors.email = "Email is required";
      setIsEmpty((prev) => ({ ...prev, email: true }));
    } else {
      setIsEmpty((prev) => ({ ...prev, email: false }));
    }
    if (!password) {
      errors.password = "Password is required";
      setIsEmpty((prev) => ({ ...prev, password: true }));
    } else {
      setIsEmpty((prev) => ({ ...prev, password: false }));
    }

    return errors;
  };

  return (
    <div
      style={{ paddingBottom: "10rem" }}
      className="mt-5 pt-5 text-dark px-5"
    >
      <h1 className="text-center mt-5">Login</h1>
      <form
        style={{ maxWidth: "50rem", paddingTop: "3rem" }}
        className="mx-auto mb-5 form-inline"
      >
        <div className="mb-3">
          <div className="row">
            <LoginInput
              label="Email:"
              name="email"
              value={inputs.email}
              handleInput={handleInput}
              placeHolder="exmaple@gmail.com"
              type="email"
              isEmpty={isEmpty.email}
              formErrors={formErrors.email}
            />
            <LoginInput
              label="Password:"
              name="password"
              value={inputs.password}
              handleInput={handleInput}
              placeHolder=""
              type="password"
              isEmpty={isEmpty.password}
              formErrors={formErrors.password}
            />
          </div>
          <div className="my-3">
            <div className="custom-control custom-checkbox my-1 mr-sm-2">
              <input
                type="checkbox"
                className="custom-control-input "
                id="customControlInline"
              />
              <label
                className="custom-control-label ms-2"
                for="customControlInline"
              >
                Remember me
              </label>
            </div>
          </div>
        </div>
        <p className="text-center mx-auto text-danger">{backWrong}</p>
        <button onClick={handleClick} className="btn btn-success my-5 btn-lg">
          Login
        </button>
        <Link to="/forget-password" className="text-decoration-none">
          <p className="text-center mx-auto text-decoration-none">
            Forget password
          </p>
        </Link>
        <Link to="/signup" className="text-decoration-none">
          <p className="text-center mx-auto">don't have account? create one!</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
