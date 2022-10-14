import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import { getUserToken } from "../token";
const ShowPost = (props) => {
  let userToken = getUserToken();
  let { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (userToken === "") {
      navigate("/");
    }
    async function getData() {
      try {
        const res = await fetch(`${process.env.REACT_APP_URL}/posts/` + id, {
          mode: "cors",
        });
        const data = await res.json();
        setPost(data);
        console.log(data);

        const userRes = await fetch(
          `${process.env.REACT_APP_URL}/user/${data.userId}`,
          {
            mode: "cors",
          }
        );
        const userData = await userRes.json();
        console.log(userData);
        setUserData(userData);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);
  async function handleDelete(id) {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/posts/` + id);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      style={{ paddingBottom: "10rem", paddingTop: "6rem" }}
      className="col-lg-6 col-md-6 col-sm-10 col-10 mx-auto"
    >
      <div
        style={{ minHeight: "18rem", borderColor: "#2A2550" }}
        className="card border border-bottom border-bottom-3 mx-auto"
      >
        <div
          style={{ color: "#f9f9f9", backgroundColor: "#2A2550" }}
          className="card-header fs-5  d-flex flex-row justify-content-between"
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
            <p className="text-light my-auto">{post.author}</p>
          </div>
          <p className="text-light">{post.postId}</p>
        </div>
        <img
          src={`/upload/postImages/${post.img}`}
          className="card-img-top"
          style={{ borderTopRightRadius: "0", borderTopLeftRadius: "0" }}
        />
        <div className="card-body mt-2 position-relative">
          <p className="card-title text-dark text-left fs-3">{post.title}</p>
          <p className="card-text text-dark text-left fs-4 mt-2">{post.body}</p>
          <div className="d-flex justify-content-between my-4">
            <span
              onClick={() => {
                handleDelete(post._id);
              }}
              style={{
                backgroundColor: "#EFEFEF",
                padding: "0.6rem",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon icon={solid("trash")} size="lg" color="red" />
            </span>

            <span
              style={{
                backgroundColor: "#EFEFEF",
                padding: "0.6rem",
                borderRadius: "10px",
              }}
            >
              <Link to={"/update/" + id}>
                <FontAwesomeIcon icon={solid("pen")} size="lg" color="blue" />
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPost;
