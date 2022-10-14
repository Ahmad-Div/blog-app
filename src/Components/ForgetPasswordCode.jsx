import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetPasswordCode = () => {
  const [input, setInput] = useState({
    code: "",
  });

  const [isEmpty, setIsEmpty] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  const [backWrong, setBackWrong] = useState("");
  const navigate = useNavigate();

  function handleInput(e) {
    setInput({ code: e.target.value });
  }

  async function handleClick(e) {
    e.preventDefault();
    setFormErrors(validate(input));

    try {
      await axios.post(
        `${process.env.REACT_APP_URL}/forget-password-code`,
        input,
        {
          withCredentials: true,
        }
      );
      navigate("/change-password");
    } catch (err) {
      console.log(err);
      backValidate();
    }
  }

  const backValidate = (value) => {
    if (input.code) {
      setBackWrong("The code is wrong");
    }
  };

  const validate = (values) => {
    let error = "";
    if (!input.code) {
      error = "please enter the code";
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
        <h5 className="text-center text-dark mb-3">Enter your code here</h5>
        <div className="mb-3">
          <input
            style={{
              maxWidth: "20rem",
              textAlign: "center",
              letterSpacing: "10px",
            }}
            onChange={handleInput}
            maxLength="6"
            type="text"
            value={input.code}
            name="code"
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

export default ForgetPasswordCode;
