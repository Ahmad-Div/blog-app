//import modules and components
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import jwt from "jsonwebtoken";
import SignupInput from "./Inputs/SignupInput";
import { useEffect } from "react";
import { getUserToken } from "../token";

const UpdateMyProfile = () => {
  let userToken = getUserToken();
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    address: "",
    gender: "",
  });

  const [file, setFile] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const [backWrong, setBackWrong] = useState("");

  const [isEmpty, setIsEmpty] = useState({
    firstName: false,
    lastName: false,
    address: false,
    gender: false,
    postImg: false,
  });

  useEffect(() => {
    if (userToken === "") {
      navigate("/");
    }
    try {
      async function getData() {
        const res = await fetch(`${process.env.REACT_APP_URL}/user/` + id);
        const data = await res.json();
        console.log(data);
        setInputs({
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
        });
      }
      getData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  function handleFile(e) {
    setFile(e.target.files[0]);
  }

  function handleInput(e) {
    let { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  async function handleClick(e) {
    e.preventDefault();
    setFormErrors(validate(inputs));

    const formData = new FormData();

    formData.append("firstName", inputs.firstName);
    formData.append("lastName", inputs.lastName);
    formData.append("address", inputs.address);
    formData.append("userImage", file);
    formData.append("gender", inputs.gender);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_URL}/update-account/` + id,
        formData,
        {
          withCredentials: true,
        }
      );

      navigate(`/profile/${id}`);
    } catch (err) {
      console.log(err);
      backValidate();
    }
  }

  const backValidate = (value) => {
    if (inputs.email || inputs.password) {
      setBackWrong("Email is used, please use another one");
    }
  };

  const validate = (values) => {
    let errors = {};
    let { firstName, lastName, gender } = values;
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

    if (!gender) {
      errors.gender = "Gender is required";
      setIsEmpty((prev) => ({ ...prev, gender: true }));
    } else {
      setIsEmpty((prev) => ({ ...prev, gender: false }));
    }

    return errors;
  };

  return (
    <div style={{ paddingBottom: "18rem" }} className="mt-5 text-dark p-5">
      <h1 className="text-center mt-5">Update your account</h1>

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
              label="Address:"
              name="address"
              value={inputs.address ? inputs.address : ""}
              handleInput={handleInput}
              placeHolder=""
              type="text"
              isEmpty=""
              formErrors=""
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="my-3">
              <label htmlFor="formFile" className="form-label fs-4">
                Image
              </label>
              <input
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
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateMyProfile;
