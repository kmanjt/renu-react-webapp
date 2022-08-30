import React from "react";
import {Outlet} from "react-router-dom";
import Appbar from "./Appbar";
import Footer from "./Footer";
import "./baseStyle.css";

const Layout = () => {
  return (
    <>
      <Appbar />
      <Outlet className="main-theme"/>
      <Footer />
    </>
  );
};

export default Layout;