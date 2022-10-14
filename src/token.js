import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import dotenv from "dotenv";
dotenv.config();

const getUserToken = () => {
  let token = Cookies.get("User");
  if (token !== undefined) {
    const decoded = jwt.verify(token, process.env.REACT_APP_VERIFY_USER_SECRET);
    return decoded.id;
  } else {
    return "";
  }
};

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.REACT_APP_USER_SECRET, {
    expiresIn: "1d",
  });
};

const createCookie = (name, token) => {
  Cookies.set(name, token, {
    sameSite: "strict",
    path: "/",
    expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
  });
};

const getCookie = (name) => {
  return Cookies.get(name);
};

const removeCookie = (name) => {
  Cookies.remove(name);
};

export {
  getUserToken,
  generateAccessToken,
  createCookie,
  getCookie,
  removeCookie,
};
