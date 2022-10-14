//import components
import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import About from "./Components/About";
import Compose from "./Components/Compose";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ShowPost from "./Components/ShowPost";
import Update from "./Components/Update";
import ForgetPassword from "./Components/ForgetPassword";
import ForgetPasswordCode from "./Components/ForgetPasswordCode";
import ChangePassword from "./Components/ChangePassword";
import AccountValidation from "./Components/AccountValidation";
import AccountValidationCode from "./Components/AccountValidationCode";
import ShowMyProfile from "./Components/ShowMyProfile";
import UpdateMyProfile from "./Components/UpdateMyProfile";
import ErrorPage from "./Components/ErrorPage";
import EmailMe from "./Components/EmailMe";
import ShowOtherUser from "./Components/ShowOtherUser";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

//import modules

import { Link, Routes, Route, Navigate } from "react-router-dom";
import dotenv from "dotenv";
dotenv.config();

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/posts/:id" element={<ShowPost />} />
        <Route exact path="/compose" element={<Compose />} />
        <Route exact path="/update/:id" element={<Update />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/forget-password" element={<ForgetPassword />} />
        <Route
          exact
          path="/forget-password/code"
          element={<ForgetPasswordCode />}
        />
        <Route exact path="/change-password" element={<ChangePassword />} />
        <Route
          exact
          path="/account-validation"
          element={<AccountValidation />}
        />

        <Route
          exact
          path="/account-validation-code"
          element={<AccountValidationCode />}
        />
        <Route exact path="/profile/:id" element={<ShowMyProfile />} />
        <Route exact path="/update-account/:id" element={<UpdateMyProfile />} />
        <Route exact path="/email-me" element={<EmailMe />} />
        <Route exact path="/users/:id" element={<ShowOtherUser />} />

        {/* redirect pages */}
        <Route exact path="/" element={<Navigate to="/" />} />
        <Route exact path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
