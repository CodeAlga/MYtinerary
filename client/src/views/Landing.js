import React from "react";
//import Footer from "../components/Footer";
import Home from "../components/Home";
import Carousel from "../components/Carousel";
import Header from "../components/Header";

export default function Landing() {
  return (
    <div className="landingBox">
      <div className="landingForeground">
        <Header />
        <Home />
        <Carousel />
        {/* <Footer alignSelf="flex-end" /> */}
      </div>
      <div className="landingBackground"></div>
    </div>
  );
}
