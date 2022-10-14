import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { getCookie, removeCookie, getUserToken } from "../token";
import axios from "axios";
import Post from "./Post";

const ShowOtherUser = () => {
  const cookie = getUserToken();

  const { id } = useParams();
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [reporter, setReporter] = useState([]);
  const [canReport, setCanReport] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [afterReportText, setAfterReportText] = useState("");
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [canBlock, setCanBlock] = useState(true);
  const [blocks, setBlocks] = useState([]);
  const [blockIndex, setBlockIndex] = useState(0);
  const [newBlockArray, setNewBlockArray] = useState([]);
  const [sendFriend, setSendFriend] = useState(false);

  const pages = new Array(totalPage).fill(null).map((v, i) => i);

  useEffect(() => {
    if (cookie === "") {
      navigate("/");
    }

    try {
      //get the user data and those who has reported him so if you have reported him you cannot do it anymore
      async function getData() {
        const res = await fetch(`${process.env.REACT_APP_URL}/user/${id}`, {
          mode: "cors",
        });
        const data = await res.json();
        if (data === null) {
          navigate("/");
        } else {
          setUserData(data);
          setReports(data.reportAccounts);
          setBlocks(data.blockAccounts);
        }

        //get the data of you as a reporter
        const reporterRes = await fetch(
          `${process.env.REACT_APP_URL}/user/${cookie}`,
          {
            mode: "cors",
          }
        );
        const reporterData = await reporterRes.json();
        setReporter(reporterData);
        if (blocks.indexOf(reporter.email) > -1) {
          setBlockIndex(blocks.indexOf(reporter.email));
        }
      }
      getData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i] !== blocks.splice(blockIndex, 1)) {
        setNewBlockArray((prev) => [...prev, blocks[i]]);
      }
    }
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        //get the post of the user
        const res = await fetch(
          `${process.env.REACT_APP_URL}/personal-posts?page=${pageNumber}&id=${id}`,
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

  useEffect(() => {
    //check if you can report him or not and check if admin or not
    if (reports.includes(reporter.email)) {
      setCanReport(false);
      setAfterReportText("You have reported this account");
    } else {
      setCanReport(true);
    }
    if (reporter.isAdmin) {
      setIsAdmin(true);
    }
    if (userData.isAdmin) {
      setUserIsAdmin(true);
      setAfterReportText("This User is admin, You cannot report or block him");
    }
    if (blocks.includes(reporter.email)) {
      setCanBlock(false);
    }
  }, [userData, reporter]);

  async function handleReport(e) {
    e.preventDefault();

    try {
      //post the report and save the reporter email to the user reports email array
      await axios.post(`${process.env.REACT_APP_URL}/report/` + id, [
        ...userData.reportAccounts,
        reporter.email,
      ]);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete() {
    try {
      //delete the user that only admin can
      await axios.delete(`${process.env.REACT_APP_URL}/user/` + id);
      window.location.reload();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleBlock(e) {
    try {
      await axios.post(`${process.env.REACT_APP_URL}/block/${userData._id}`, [
        ...userData.blockAccounts,
        reporter.email,
      ]);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUnblock(e) {
    try {
      await axios.post(
        `${process.env.REACT_APP_URL}/unblock/${userData._id}`,
        newBlockArray
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleFriend(e) {}

  return (
    <div>
      {cookie ? (
        <div className="container">
          <div style={{ paddingBottom: "10rem" }} className="row g-3 pt-5 px-3">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <img
                style={{
                  height: "20rem",
                  maxWidth: "20rem",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                src={`/upload/accountImages/${userData.userImage}`}
                alt=""
              />
            </div>
            <form className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div>
                <fieldset disabled>
                  <legend>User profile information</legend>
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
                          value={userData.firstName ? userData.firstName : ""}
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
                          value={userData.lastName ? userData.lastName : ""}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6 col md-6 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="disabledTextInput" class="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          id="disabledTextInput"
                          class="form-control"
                          value={
                            userData.address ? userData.address : "no address"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>{" "}
                <div className="my-3 d-flex flex-column justify-content-around align-items-center">
                  <div className="my-3 d-flex gap-5 flex-row justify-content-around align-items center">
                    {canReport && !userIsAdmin ? (
                      <button onClick={handleReport} className="btn btn-danger">
                        Report
                      </button>
                    ) : userIsAdmin ? (
                      <p className="text-danger">{afterReportText}</p>
                    ) : (
                      <button type="button" class="btn btn-danger" disabled>
                        Reported
                      </button>
                    )}
                    {isAdmin ? (
                      <button onClick={handleDelete} className="btn btn-danger">
                        Delete Account
                      </button>
                    ) : null}
                  </div>
                  <div className="my-3 d-flex flex-row gap-5 justify-content-around align-items center">
                    {canBlock && !userIsAdmin ? (
                      <button onClick={handleBlock} className="btn btn-danger">
                        Block
                      </button>
                    ) : userIsAdmin ? null : (
                      <button
                        onClick={handleUnblock}
                        className="btn btn-danger"
                      >
                        Unblock
                      </button>
                    )}
                    {!sendFriend ? (
                      <button
                        onClick={handleFriend}
                        className="btn btn-primary"
                      >
                        Add Friend
                      </button>
                    ) : null}
                  </div>
                </div>
                <input
                  type="email"
                  name="reporterEmail"
                  style={{ display: "none" }}
                  id="disabledTextInput"
                  class="form-control"
                  value={reporter.email}
                />
                <input
                  type="email"
                  name="blockerEmail"
                  style={{ display: "none" }}
                  id="disabledTextInput"
                  class="form-control"
                  value={reporter.email}
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
      {posts.length !== 0 && canBlock ? (
        <div style={{ paddingBottom: "4rem" }}>
          <h1 className="my-3 text-center">User Posts</h1>
          <h3 className="text-center text-dark my-5">Page {pageNumber + 1}</h3>
          <div className="container-fluid">
            <div className="row g-lg-2 g-md-3 g-sm-3 g-5  justify-content-center align-items-center">
              {posts.map((post, index) => {
                if (post.userId === id) {
                  return <Post post={post} key={index} />;
                }
              })}
            </div>
          </div>
        </div>
      ) : !canBlock ? (
        <h3
          style={{ paddingTop: "4rem", paddingBottom: "8rem" }}
          className="text-center"
        >
          You can't see this user post , you blocked him
        </h3>
      ) : (
        <h3
          style={{ paddingTop: "4rem", paddingBottom: "8rem" }}
          className="text-center"
        >
          There is no post...
        </h3>
      )}

      {totalPage > 1 && canBlock ? (
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
  );
};

export default ShowOtherUser;
