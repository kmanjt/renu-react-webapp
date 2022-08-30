import React from "react";
import {Outlet} from "react-router-dom";
import Appbar from "./Appbar";
import Footer from "./Footer";
import "./baseStyle.css";

const Layout = () => {
  return (
    <>
      <Appbar />
      <br></br>
      <br></br>
      <Outlet className="main-theme"/>
      <br></br>
      <br></br>
      <br></br>
      <Footer />
    </>
  );
};

export default Layout;