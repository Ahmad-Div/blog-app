import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import LoginInput from "./Inputs/LoginInput";

const ChangePassword = () => {
  const navigate = useNavigate();

  //hooks
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    conPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [backWrong, setBackWrong] = useState("");
  const [isEmpty, setIsEmpty] = useState({
    email: false,
    password: false,
    conPassword: false,
  });

  //handle functions
  function handleInput(e) {
    let { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function handleClick(e) {
    e.preventDefault();
    setFormErrors(validate(inputs));

    //post to change password and go to login page
    try {
      await axios.post(`${process.env.REACT_APP_URL}/change-password`, inputs);
      navigate("/login");
    } catch (err) {
      console.log(err);
      backValidate();
    }
  }

  const backValidate = (value) => {
    if (inputs.email || inputs.password) {
      setBackWrong("Email or password is wrong");
    }
  };

  const validate = (values) => {
    let errors = {};
    let { email, password, conPassword } = values;

    if (!email) {
      errors.email = "Email is required";
      setIsEmpty((prev) => ({ ...prev, email: true }));
    } else {
      setIsEmpty((prev) => ({ ...prev, email: false }));
    }

    if (!password) {
      errors.password = "Password is required";
      setIsEmpty((prev) => ({ ...prev, password: true }));
    } else if (
      (password.length > 0 && password.length < 8) ||
      password.length > 20
    ) {
      errors.password = "Password must be between 8-20 characters";
      setIsEmpty((prev) => ({ ...prev, password: true }));
    } else {
      setIsEmpty((prev) => ({ ...prev, password: false }));
    }
    if (!conPassword) {
      errors.conPassword = "Confirm Password is required";
      setIsEmpty((prev) => ({ ...prev, conPassword: true }));
    } else if (
      (conPassword.length > 0 && conPassword.length < 8) ||
      conPassword.length > 20
    ) {
      errors.conPassword = "Password must be between 8-20 characters";
      setIsEmpty((prev) => ({ ...prev, conPassword: true }));
    } else {
      setIsEmpty((prev) => ({ ...prev, conPassword: false }));
    }

    if (password !== conPassword) {
      errors.conPassword = "This must be the same as password";
      setIsEmpty((prev) => ({ ...prev, conPassword: true }));
    }

    return errors;
  };

  return (
    <div style={{ paddingBottom: "18rem" }} className="mt-5 text-dark p-5">
      <h1 className="text-center mt-5">Change your password</h1>
      <form
        style={{
          maxWidth: "50rem",
          paddingTop: "3rem",
        }}
        className="mx-auto mb-5"
      >
        <div className="mb-3">
          <div className="row">
            <LoginInput
              label="Email"
              name="email"
              value={inputs.email}
              handleInput={handleInput}
              placeHolder="example@gmail.com"
              type="email"
              isEmpty={isEmpty.email}
              formErrors={formErrors.email}
            />
          </div>
        </div>
        <div className="mb-3">
          <div className="row">
            <LoginInput
              label="New Password:"
              name="password"
              value={inputs.password}
              handleInput={handleInput}
              placeHolder=""
              type="password"
              isEmpty={isEmpty.password}
              formErrors={formErrors.password}
            />
            <LoginInput
              label="Confirm new password:"
              name="conPassword"
              value={inputs.conPassword}
              handleInput={handleInput}
              placeHolder=""
              type="password"
              isEmpty={isEmpty.conPassword}
              formErrors={formErrors.conPassword}
            />
          </div>
          <small id="passwordHelpInline" class="text-muted">
            Must be 8-20 characters long.
          </small>
        </div>
        <p className="text-center mx-auto text-danger">{backWrong}</p>
        <button onClick={handleClick} className="btn btn-success my-5 btn-lg">
          Change password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
