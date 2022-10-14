import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
const About = () => {
  return (
    <div style={{ marginTop: "4rem" }}>
      <div className="d-flex flex-column gap-4 px-5 mx-auto">
        <h1
          style={{ fontSize: "6vw", fontWeight: "bolder" }}
          className="text-center"
        >
          Blog Community
        </h1>
        <p className="text-center fs-5">
          This is a full-MERN-stack website created by Ahmad software
        </p>
        <p className="fs-6 text-center">You can contact him through these</p>
        <div className="d-flex flex-row justify-content-center gap-3">
          <a
            target="_blank"
            href="https://www.facebook.com/profile.php?id=100046621757093"
          >
            <FacebookIcon
              sx={{
                color: "#4267B2",
                fontSize: "3rem",
                transition: "300ms",
                cursor: "pointer",
                "&:hover": { color: "#2A2550" },
              }}
            />
          </a>
          <a
            target="_blank"
            href="https://www.youtube.com/channel/UCAiNkVKFGi1QRZARjyG2yuw"
          >
            <YouTubeIcon
              sx={{
                color: "red",
                fontSize: "3rem",
                transition: "300ms",
                cursor: "pointer",
                "&:hover": { color: "#2A2550" },
              }}
            />
          </a>

          <a target="_blank" href="https://github.com/Ahmad-Div">
            <GitHubIcon
              sx={{
                color: "#171515",
                fontSize: "3rem",
                transition: "300ms",
                cursor: "pointer",
                "&:hover": { color: "#2A2550" },
              }}
            />
          </a>
        </div>
        <Link to="/email-me">
          <button className="my-4 btn btn-primary d-block mx-auto">
            Email me
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
