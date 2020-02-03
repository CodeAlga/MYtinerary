import React from "react";
//import Footer from "../components/Footer";
import Home from "../components/Home";
//import Test from "../components/Test";
import Header from "../components/Header";

export default function Landing() {
  return (
    <div className="landingBox">
      <div className="landingForeground">
        <Header />
        <Home />
        {/* <Footer alignSelf="flex-end" /> */}
      </div>
      <div className="landingBackground"></div>
    </div>
  );
}
