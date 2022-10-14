import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { getCookie, removeCookie, getUserToken } from "../token";
import ShowPostInMyAccount from "./ShowPostInMyAccount";
import axios from "axios";
const ShowMyProfile = () => {
  const cookie = getUserToken();

  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const pages = new Array(totalPage).fill(null).map((v, i) => i);

  useEffect(() => {
    try {
      async function getData() {
        const res = await fetch(`${process.env.REACT_APP_URL}/user/` + cookie);
        const data = await res.json();
        if (data === null) {
          removeCookie("User");
          navigate("/");
        } else {
          setUser(data);
        }
      }
      getData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_URL}/personal-posts?page=${pageNumber}&id=${cookie}`,
          {
            mode: "cors",
          }
        );
        const data = await res.json();
        setPosts(data.posts);
        setTotalPage(data.total);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [pageNumber]);

  async function handleDelete() {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/user/` + cookie);
      navigate("/");
      removeCookie("User");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      {cookie ? (
        <div className="container">
          <div style={{ paddingBottom: "2rem" }} className="row g-3 pt-5 px-3">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <img
                style={{
                  height: "20rem",
                  maxWidth: "20rem",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                src={`/upload/accountImages/${user.userImage}`}
                alt=""
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div>
                <fieldset disabled>
                  <legend>Your profile information</legend>
                  <div className="row">
                    <div className="col-lg-6 col md-6 col-sm-12 col-12">
                      {" "}
                      <div class="mb-3">
                        <label for="disabledTextInput" class="form-label">
                          first name
                        </label>
                        <input
                          type="text"
                          id="disabledTextInput"
                          class="form-control"
                          value={user.firstName ? user.firstName : ""}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col md-6 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="disabledTextInput" class="form-label">
                          last name
                        </label>
                        <input
                          type="text"
                          id="disabledTextInput"
                          class="form-control"
                          value={user.lastName ? user.lastName : ""}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6 col md-6 col-sm-12 col-12">
                      {" "}
                      <div class="mb-3">
                        <label for="disabledTextInput" class="form-label">
                          Email
                        </label>
                        <input
                          type="text"
                          id="disabledTextInput"
                          class="form-control"
                          value={user.email ? user.email : ""}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col md-6 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="disabledTextInput" class="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          id="disabledTextInput"
                          class="form-control"
                          value={user.address ? user.address : "no address"}
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>{" "}
                <div className="my-3 d-flex flex-row justify-content-around">
                  <Link to={`/update-account/${user._id}`}>
                    <button className="btn btn-primary">Edit Account</button>
                  </Link>

                  <button onClick={handleDelete} className="btn btn-danger">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
          {posts.length !== 0 ? (
            <div style={{ paddingBottom: "4rem" }}>
              <h1 className="my-3 text-center">My Posts</h1>
              <h3 className="text-center text-dark my-5">
                Page {pageNumber + 1}
              </h3>
              <div className="container-fluid">
                <div className="row g-lg-2 g-md-3 g-sm-3 g-5  justify-content-center align-items-center">
                  {posts.map((post, index) => {
                    if (post.userId === cookie) {
                      return <ShowPostInMyAccount post={post} key={index} />;
                    }
                  })}
                </div>
              </div>
            </div>
          ) : (
            <h3
              style={{ paddingTop: "4rem", paddingBottom: "8rem" }}
              className="text-center"
            >
              There is no post...
            </h3>
          )}

          {totalPage > 1 ? (
            <nav
              style={{ paddingBottom: "10rem" }}
              aria-label="Page navigation example"
              className="mx-auto d-flex flex-row justify-content-center"
            >
              <ul className="pagination my-5 btn-group">
                <button
                  onClick={() => setPageNumber(Math.max(0, pageNumber - 1))}
                  className="btn btn-outline-primary"
                >
                  Previous
                </button>
                {pages.map((pageIndex) => {
                  return (
                    <button
                      key={pageIndex}
                      onClick={() => setPageNumber(pageIndex)}
                      className={
                        pageIndex === pageNumber
                          ? "btn btn-primary"
                          : "btn btn-outline-primary"
                      }
                    >
                      {pageIndex + 1}
                    </button>
                  );
                })}
                <button
                  onClick={() =>
                    setPageNumber(Math.min(totalPage - 1, pageNumber + 1))
                  }
                  className="btn btn-outline-primary"
                >
                  Next
                </button>
              </ul>
            </nav>
          ) : null}
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default ShowMyProfile;
