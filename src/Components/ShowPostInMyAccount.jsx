import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const ShowPostInMyAccount = (props) => {
  const navigate = useNavigate();
  async function deletePost(id) {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/posts/` + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    try {
      async function getData() {
        const res = await fetch(
          `${process.env.REACT_APP_URL}/user/${props.post.userId}`,
          {
            mode: "cors",
          }
        );
        const data = await res.json();
        setUserData(data);
      }
      getData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="col-lg-6 col-md-6 col-sm-10 col-11">
      <div
        style={{ minHeight: "18rem", borderColor: "#2A2550" }}
        className="card border border-bottom border-bottom-3"
      >
        <div
          style={{ color: "#f9f9f9", backgroundColor: "#2A2550" }}
          className="card-header fs-5 d-flex flex-row justify-content-between"
        >
          <div className="d-flex flex-row gap-3">
            <img
              style={{
                maxWidth: "3rem",
                objectFit: "cover",
                minHeight: "3rem",
                borderRadius: "50%",
              }}
              src={`/upload/accountImages/${userData.userImage}`}
              alt=""
            />
            <p className="text-light my-auto">{props.post.author}</p>
          </div>

          <p className="text-light my-auto">{props.post.postId}</p>
        </div>
        <img
          src={`/upload/postImages/${props.post.img}`}
          className="card-img-top"
          style={{
            borderTopRightRadius: "0",
            borderTopLeftRadius: "0",
            maxHeight: "20rem",
            objectFit: "cover",
          }}
        />
        <div className="card-body mt-2">
          <p className="card-title text-dark text-left fs-3">
            {props.post.title}
          </p>
          <p className="card-text text-dark text-left fs-4 mt-2">
            {`${props.post.body.substring(0, 40)}...`}
          </p>
          <div className="d-flex justify-content-between">
            <button
              onClick={() => {
                deletePost(props.post._id);
              }}
              className="btn btn-danger mt-5 btn-sm"
            >
              Delete
            </button>
            <Link
              to={"/update/" + props.post._id}
              className="btn btn-primary mt-5 btn-sm"
            >
              Update
            </Link>

            <Link
              to={"/posts/" + props.post._id}
              className="text-light  text-decoration-none btn btn-success mt-5 btn-sm"
            >
              Show Post
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPostInMyAccount;
