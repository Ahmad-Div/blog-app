import React, { useState } from "react";
import axios from "axios";
import Post from "./Post";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";
import dotenv from "dotenv";
import { getUserToken } from "../token";
dotenv.config();
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [cookie, setCookie] = useState({});
  const [isCookie, setIsCookie] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  let token = getUserToken();

  const pages = new Array(totalPage).fill(null).map((v, i) => i);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_URL}/?page=${pageNumber}&id=${token}`,
          {
            mode: "cors",
          }
        );
        const data = await res.json();
        setCookie(Cookie.get("User"));
        setIsCookie(getUserToken() !== "");
        setPosts(data.posts);
        setTotalPage(data.total);
        setIsBlocked(data.blocked);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [pageNumber]);

  //get all the users

  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`${process.env.REACT_APP_URL}/all-users`, {
          mode: "cors",
        });
        const data = await res.json();
        setAllUsers(data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  function handleSearch(e) {
    setSearch([]);
    allUsers.forEach((userData) => {
      let fullName = userData.firstName + " " + userData.lastName;
      fullName = fullName.toLowerCase();
      for (let i = 0; i < e.target.value.length; i++) {
        if (fullName.charAt(i) === e.target.value.charAt(i)) {
          if (userData._id !== token) {
            if (i === e.target.value.length - 1) {
              setSearch((prev) => [...prev, userData]);
            }
          }
        }
      }
    });
    if (e.target.value === "") {
      setSearch([]);
    }
  }

  return (
    <div
      style={{ paddingBottom: "18rem" }}
      className="mt-1 text-dark px-lg-5 px-md-3 px-sm-1 pt-2"
    >
      {!isCookie ? (
        <div className="d-flex flex-column justify-content-center gap-5">
          <p className="text-center h3" style={{ marginTop: "10rem" }}>
            Please Sign up or login to show posts
          </p>
        </div>
      ) : (
        <>
          <div
            style={{ maxWidth: "30rem" }}
            className="my-5 mx-auto position-relative"
          >
            <label for="exampleDataList" class="form-label">
              Search For User
            </label>
            <input
              class="form-control"
              list="datalistOptions"
              id="exampleDataList"
              placeholder="Type to search..."
              onChange={handleSearch}
            />
            <div
              style={{
                maxHeight: "20rem",
                overflowY: "scroll",
              }}
              className="position-absolute w-100"
            >
              {search.map((srh) => {
                return (
                  <Link
                    className="text-decoration-none"
                    to={`/users/${srh._id}`}
                  >
                    <div class="card">
                      <div class="card-body d-flex flex-row gap-4 align-items-center">
                        <img
                          style={{
                            maxWidth: "3rem",
                            minHeight: "3rem",
                            objectFit: "cover",
                          }}
                          src={`/upload/accountImages/${srh.userImage}`}
                          alt=""
                        />
                        <p className="my-auto text-decoration-none">
                          {srh.firstName} {srh.lastName}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="my-3 d-flex mx-lg-0 mx-md-0 md-sm-2  mx-3  flex-row justify-content-between flex-nowrap">
            <h1 className="text-dark my-auto">Home</h1>
            <Link to="/compose">
              <button className="btn btn-warning align-self-center">
                Add New Post
              </button>
            </Link>
          </div>
        </>
      )}
      {posts.length !== 0 && isCookie ? (
        <>
          <h3 className="text-center text-dark my-5">Page {pageNumber + 1}</h3>
          <div className="container-fluid">
            <div className="row g-lg-2 g-md-3 g-sm-3 g-5  justify-content-center align-items-center">
              {posts.map((post, index) => {
                if (post.userId !== token) {
                  return <Post post={post} key={index} />;
                }
              })}
            </div>
          </div>
        </>
      ) : (
        <h3 style={{ paddingTop: "10rem" }} className="text-center">
          There is no post...
        </h3>
      )}

      {totalPage > 1 && isCookie ? (
        <nav
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
  );
};

export default Home;
