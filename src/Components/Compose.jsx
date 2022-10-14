//import models and components
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { getCookie, getUserToken, removeCookie } from "../token";

const Compose = () => {
  let userToken = getUserToken();
  const navigate = useNavigate();

  //hooks
  const [post, setPost] = useState({
    author: "",
    title: "",
    body: "",
  });
  const [file, setFile] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isEmpty, setIsEmpty] = useState({
    title: false,
    body: false,
    postImg: false,
  });

  //get user data
  useEffect(() => {
    //check if user has token or not => maybe has been reported or deleted from admin so he cannot post anymore
    if (userToken === "") {
      navigate("/");
    }
    async function getData() {
      //get data of user for getting author name
      try {
        const res = await fetch(
          `${process.env.REACT_APP_URL}/user/${userToken}`,
          {
            mode: "cors",
          }
        );
        const data = await res.json();
        //check if data is null so remove the cookie so he is reported and there will be no account anymore
        if (data === null) {
          removeCookie("User");
          navigate("/");
        } else {
          setPost((prev) => ({
            ...prev,
            author: `${data.firstName} ${data.lastName}`,
          }));
        }
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  //handle functions
  function handleInput(e) {
    let { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  }
  function handleFile(e) {
    setFile(e.target.files[0]);
  }

  async function handlePost(e) {
    e.preventDefault();
    setFormErrors(validate(post));
    const formData = new FormData();

    //append all data into formData because we send req.files
    formData.append("author", post.author);
    formData.append("title", post.title);
    formData.append("body", post.body);
    formData.append("postImage", file);
    formData.append("userId", userToken);

    try {
      await axios.post(`${process.env.REACT_APP_URL}/compose`, formData);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  //validate post inputs
  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Title is required";
      setIsEmpty((prev) => ({
        ...prev,
        title: true,
      }));
    } else {
      setIsEmpty((prev) => ({
        ...prev,
        title: false,
      }));
    }
    if (!values.body) {
      errors.body = "Body is required";
      setIsEmpty((prev) => ({
        ...prev,
        body: true,
      }));
    } else {
      setIsEmpty((prev) => ({
        ...prev,
        body: false,
      }));
    }
    if (!file) {
      errors.postImg = "Image is required";
      setIsEmpty((prev) => ({
        ...prev,
        postImg: true,
      }));
    } else {
      setIsEmpty((prev) => ({
        ...prev,
        postImg: false,
      }));
    }
    return errors;
  };

  return (
    <div style={{ paddingBottom: "10rem" }} className="mt-5 text-dark px-5">
      <h1 className="text-dark my-5">New Post</h1>
      <form
        encType="multipart/form-data"
        style={{ maxWidth: "60rem" }}
        className={
          isEmpty.body || isEmpty.title
            ? "border-danger p-4 border border-2 border rounded-1 my-5"
            : "border-primary  p-4 border border-2 border rounded-1 my-5"
        }
      >
        <div className="my-3">
          <fieldset disabled>
            <label htmlFor="disabledTextInput" className="form-label">
              Author
            </label>
            <input
              type="text"
              id="disabledTextInput"
              className="form-control"
              value={post.author}
            />
          </fieldset>
        </div>

        <div className="my-3">
          <label htmlFor="" className="form-label fs-5">
            Title
          </label>
          <input
            onChange={handleInput}
            name="title"
            type="text"
            value={post.title}
            className={
              isEmpty.title
                ? "form-control border-danger  border border-2 border rounded-1 "
                : "form-control border-primary  border border-2 border rounded-1 "
            }
            required
          />
          <p className="text-danger">{formErrors.title}</p>
        </div>

        <div className="my-3">
          <label htmlFor="" className="form-label fs-5">
            Body
          </label>
          <textarea
            onChange={handleInput}
            name="body"
            type="text"
            value={post.body}
            className={
              isEmpty.body
                ? "form-control border-danger  border border-2 border rounded-1 "
                : "form-control border-primary  border border-2 border rounded-1 "
            }
            required
          />
          <p className="text-danger">{formErrors.body}</p>
        </div>

        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="my-3">
              <label htmlFor="formFile" className="form-label fs-4">
                Image
              </label>
              <input
                required
                filename="postImage"
                name="postImage"
                className={
                  isEmpty.postImg
                    ? "form-control border-danger  border border-2 border rounded-1 "
                    : "form-control border-primary  border border-2 border rounded-1 "
                }
                type="file"
                id="formFile"
                onChange={handleFile}
              />
            </div>
            <p className="text-danger">{formErrors.postImg}</p>
          </div>
        </div>

        <input
          type="text"
          style={{ display: "none" }}
          id="disabledTextInput"
          className="form-control"
          name="userId"
          value={userToken}
        />

        <button onClick={handlePost} className="btn btn-outline-primary my-3">
          Post
        </button>
      </form>
    </div>
  );
};

export default Compose;
