import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getUserToken } from "../token";

const Update = (props) => {
  const [post, setPost] = useState({
    author: "",
    title: "",
    body: "",
  });

  const [formErrors, setFromErrors] = useState({});
  const [isEmpty, setIsEmpty] = useState({
    title: false,
    body: false,
  });
  const [file, setFile] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  let userToken = getUserToken();

  useEffect(() => {
    if (userToken === "") {
      navigate("/");
    }
    try {
      async function getData() {
        const res = await fetch(`${process.env.REACT_APP_URL}/posts/` + id);
        const data = await res.json();
        console.log(data);
        setPost({
          author: data.author,
          title: data.title,
          body: data.body,
        });
      }
      getData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  function handleInput(e) {
    let { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  }

  function handleFile(e) {
    setFile(e.target.files[0]);
  }

  async function handlePost(e) {
    e.preventDefault();
    setFromErrors(validate(post));

    const formData = new FormData();

    formData.append("author", post.author);
    formData.append("title", post.title);
    formData.append("body", post.body);
    formData.append("postImage", file);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    try {
      await axios.post("http://localhost:3001/update-post/" + id, formData);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Title is required";
      setIsEmpty((prev) => ({ ...prev, title: true }));
    } else {
      setIsEmpty((prev) => ({ ...prev, title: false }));
    }
    if (!values.body) {
      errors.body = "Body is required";
      setIsEmpty((prev) => ({ ...prev, body: true }));
    } else {
      setIsEmpty((prev) => ({ ...prev, body: false }));
    }

    return errors;
  };

  return (
    <div style={{ paddingBottom: "10rem" }} className="mt-5 text-dark px-5">
      <h1 className="text-dark my-5">Update Post</h1>
      <form
        encType="multipart/form-data"
        style={{ maxWidth: "60rem" }}
        className={
          isEmpty.body || isEmpty.title
            ? "border-danger p-4 border border-2 border rounded-1 my-5"
            : "border-success  p-4 border border-2 border rounded-1 my-5"
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
                : "form-control border-success  border border-2 border rounded-1 "
            }
            required
          />
          <p className="text-danger">{formErrors.title}</p>
        </div>

        <div className="my-3">
          <label htmlFor="" className="form-label fs-5">
            Title
          </label>
          <textarea
            onChange={handleInput}
            name="body"
            type="text"
            value={post.body}
            className={
              isEmpty.body
                ? "form-control border-danger  border border-2 border rounded-1 "
                : "form-control border-success  border border-2 border rounded-1 "
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
                filename="postImage"
                name="postImage"
                className="form-control border-success  border border-2 border rounded-1 "
                type="file"
                id="formFile"
                onChange={handleFile}
              />
            </div>
            <small id="passwordHelpInline" class="text-muted">
              If you don't put image the old one will be display
            </small>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="my-3">
              <img src="" alt="" />
            </div>
          </div>
        </div>

        <button onClick={handlePost} className="btn btn-outline-success my-3">
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
