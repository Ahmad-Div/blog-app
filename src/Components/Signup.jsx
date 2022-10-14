//import modules and components
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import SignupInput from "./Inputs/SignupInput";
import { useEffect } from "react";
dotenv.config();

const Signup = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    password: "",
    conPassword: "",
    gender: "",
  });

  const [file, setFile] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const [backWrong, setBackWrong] = useState("");

  const [isEmpty, setIsEmpty] = useState({
    firstName: false,
    lastName: false,
    email: false,
    address: false,
    password: false,
    conPassword: false,
    gender: false,
    postImg: false,
  });

  function handleFile(e) {
    setFile(e.target.files[0]);
  }

  const navigate = useNavigate();

  function handleInput(e) {
    let { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  //I used this use effect so every second they check the password
  useEffect(() => {
    for (let i = 0; i < inputs.conPassword.length; i++) {
      if (inputs.password.charAt(i) !== inputs.conPassword.charAt(i)) {
        setFormErrors((prev) => ({
          ...prev,
          conPassword: "This must be the same as password",
        }));
      } else if (inputs.conPassword.length === 0) {
        setFormErrors((prev) => ({
          ...prev,
          conPassword: "",
        }));
      } else {
        setFormErrors((prev) => ({
          ...prev,
          conPassword: "",
        }));
      }
    }
  }, [inputs.password, inputs.conPassword]);

  async function handleClick(e) {
    e.preventDefault();
    setFormErrors(validate(inputs));

    const formData = new FormData();

    formData.append("firstName", inputs.firstName);
    formData.append("lastName", inputs.lastName);
    formData.append("email", inputs.email);
    formData.append("address", inputs.address);
    formData.append("password", inputs.password);
    formData.append("conPassword", inputs.conPassword);
    formData.append("userImage", file);
    formData.append("gender", inputs.gender);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      await axios.post(`${process.env.REACT_APP_URL}/signup`, formData, {
        withCredentials: true,
      });

      navigate("/login");
    } catch (err) {
      console.log(err.message);
      backValidate(err.message);
    }
  }

  const backValidate = (value) => {
    console.log(value);
    if (value === "Request failed with status code 500") {
      setBackWrong("Email is used, please use another one");
    }
  };

  const validate = (values) => {
    let errors = {};
    let { firstName, lastName, email, password, conPassword, gender } = values;
    if (!firstName) {
      errors.firstName = "First name is required";
      setIsEmpty((prev) => ({ ...prev, firstName: true }));
    } else {
      setIsEmpty((prev) => ({ ...prev, firstName: false }));
    }
    if (!lastName) {
      errors.lastName = "Last name is required";
      setIsEmpty((prev) => ({ ...prev, lastName: true }));
    } else {
      setIsEmpty((prev) => ({ ...prev, lastName: false }));
    }
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

    if (!gender) {
      errors.gender = "Gender is required";
      setIsEmpty((prev) => ({ ...prev, gender: true }));
    } else {
      setIsEmpty((prev) => ({ ...prev, gender: false }));
    }

    if (password !== conPassword) {
      errors.conPassword = "This must be the same as password";
      setIsEmpty((prev) => ({ ...prev, conPassword: true }));
    }

    if (!file) {
      errors.userImage = "Image is required";
      setIsEmpty((prev) => ({
        ...prev,
        userImage: true,
      }));
    } else {
      setIsEmpty((prev) => ({
        ...prev,
        userImage: false,
      }));
    }

    return errors;
  };

  return (
    <div style={{ paddingBottom: "18rem" }} className="mt-5 text-dark p-5">
      <h1 className="text-center mt-5">Sign up</h1>

      <form
        encType="multipart/form-data"
        style={{ maxWidth: "50rem", paddingTop: "3rem" }}
        className="mx-auto mb-5"
      >
        <div className="mb-3">
          <div className="row">
            <SignupInput
              label="First Name:"
              name="firstName"
              value={inputs.firstName}
              handleInput={handleInput}
              placeHolder="Ahmad"
              type="text"
              isEmpty={isEmpty.firstName}
              formErrors={formErrors.firstName}
            />
            <SignupInput
              label="Last Name:"
              name="lastName"
              value={inputs.lastName}
              handleInput={handleInput}
              placeHolder="Salah"
              type="text"
              isEmpty={isEmpty.lastName}
              formErrors={formErrors.lastName}
            />
          </div>
        </div>

        <div className="mb-3">
          <div className="row">
            <SignupInput
              label="Email:"
              name="email"
              value={inputs.email}
              handleInput={handleInput}
              placeHolder="example@gmail.com"
              type="email"
              isEmpty={isEmpty.email}
              formErrors={formErrors.email}
            />

            <SignupInput
              label="Address:"
              name="address"
              value={inputs.address}
              handleInput={handleInput}
              placeHolder="Suli"
              type="text"
              isEmpty=""
              formErrors=""
            />
          </div>
        </div>

        <div className="mb-3">
          <div className="row">
            <SignupInput
              label="Password:"
              name="password"
              value={inputs.password}
              handleInput={handleInput}
              placeHolder=""
              type="password"
              isEmpty={isEmpty.password}
              formErrors={formErrors.password}
            />

            <SignupInput
              label="Confirm password:"
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

        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="my-3">
              <label htmlFor="formFile" className="form-label fs-4">
                Image
              </label>
              <input
                required
                filename="userImage"
                name="userImage"
                className={
                  isEmpty.postImg
                    ? "form-control border-danger  border border-2 border rounded-1 "
                    : "form-control"
                }
                type="file"
                id="formFile"
                onChange={handleFile}
              />
            </div>
            <p className="text-danger">{formErrors.userImage}</p>
          </div>
        </div>

        <p className="my-3 text-center text-danger">{backWrong}</p>

        <div className="form-check my-3">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="flexRadioDefault1"
            onChange={handleInput}
            value="male"
          />

          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Male
          </label>
        </div>
        <div className="form-check my-3">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="flexRadioDefault2"
            onChange={handleInput}
            value="female"
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Female
          </label>
          <p className="text-danger">{formErrors.gender}</p>
        </div>
        <button onClick={handleClick} className="btn btn-success my-5 btn-lg">
          Sign Up
        </button>
      </form>
      <Link to="/login" className="text-decoration-none">
        <p className="text-center mx-auto" style={{ marginBottom: "10rem" }}>
          I already have an account
        </p>
      </Link>
    </div>
  );
};

export default Signup;
