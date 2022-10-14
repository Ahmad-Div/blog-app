import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const ForgetPassword = () => {
  const [input, setInput] = useState({
    email: "",
  });
  const [isEmpty, setIsEmpty] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  const [backWrong, setBackWrong] = useState("");

  const navigate = useNavigate();

  function handleInput(e) {
    setInput({ email: e.target.value });
  }

  async function handleClick(e) {
    e.preventDefault();
    setFormErrors(validate(input));
    try {
      await axios.post(
        `${process.env.REACT_APP_URL}/forget-password-email`,
        input,
        {
          withCredentials: true,
        }
      );
      navigate("/forget-password/code");
    } catch (err) {
      console.log(err);
      backValidate();
    }
  }

  const backValidate = (value) => {
    if (input.email) {
      setBackWrong("Email is wrong");
    }
  };

  const validate = (values) => {
    let error = "";
    if (!input.email) {
      error = "Email is required";
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
    return error;
  };

  return (
    <div style={{ paddingBottom: "18rem" }} className="mt-5 text-dark p-5">
      <h1 className="text-center mt-5">Change Password</h1>
      <form
        style={{ maxWidth: "50rem", paddingTop: "3rem" }}
        className="mx-auto mb-5"
      >
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Your email:
          </label>
          <input
            name="email"
            value={input.email}
            onChange={handleInput}
            placeholder="example@gmail.com"
            type="email"
            className={
              isEmpty
                ? "form-control border border-2 border-danger"
                : "form-control"
            }
          />
          <p className="text-danger">{formErrors}</p>
        </div>
        <p className="text-center mx-auto text-danger">{backWrong}</p>

        <button
          onClick={handleClick}
          className="btn btn-success my-5 btn-md mx-auto d-flex flex-row justify-content-center"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
