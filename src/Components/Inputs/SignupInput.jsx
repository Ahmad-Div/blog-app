import React from "react";

const SignupInput = ({
  label,
  name,
  value,
  handleInput,
  placeHolder,
  type,
  isEmpty,
  formErrors,
}) => {
  return (
    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
      <label htmlFor="" className="form-label">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={handleInput}
        placeholder={placeHolder}
        type={type}
        className={
          isEmpty
            ? "form-control border border-2 border-danger"
            : "form-control"
        }
      />
      <p className="text-danger">{formErrors}</p>
    </div>
  );
};

export default SignupInput;
