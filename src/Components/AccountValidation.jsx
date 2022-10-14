import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AccountValidation = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
  });

  //form validation
  const [isEmpty, setIsEmpty] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  const [backWrong, setBackWrong] = useState("");
  //form validation

  //handle hooks

  function handleInput(e) {
    setInput({ email: e.target.value });
  }

  async function handleClick(e) {
    e.preventDefault();
    setFormErrors(validate(input));

    try {
      await axios.post(
        `${process.env.REACT_APP_URL}/account-validation`,
        input,
        {
          withCredentials: true,
        }
      );
      navigate("/account-validation-code");
    } catch (err) {
      console.log(err);
      backValidate();
    }
  }

  //validation from backend
  const backValidate = (value) => {
    if (input.email) {
      setBackWrong("The email is wrong");
    }
  };

  //validation for frontend
  const validate = (values) => {
    let error = "";
    if (!input.email) {
      error = "please enter the email";
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
    return error;
  };

  return (
    <div style={{ paddingBottom: "18rem" }} className="mt-5 text-dark p-5">
      <h1 className="text-center mt-5">Account Validation</h1>
      <form
        style={{ maxWidth: "50rem", paddingTop: "3rem" }}
        className="mx-auto mb-5"
      >
        <h5 className="text-center text-dark mb-3">Enter your email here</h5>
        <div className="mb-3">
          <input
            style={{
              maxWidth: "20rem",
            }}
            onChange={handleInput}
            type="email"
            value={input.email}
            name="email"
            className={
              isEmpty
                ? "form-control border border-2 border-danger mx-auto"
                : "form-control mx-auto"
            }
          />
          <p className="text-danger text-center mx-auto mt-4">{formErrors}</p>

          <p className="text-center mx-auto text-danger mt-4">{backWrong}</p>
        </div>
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

export default AccountValidation;
