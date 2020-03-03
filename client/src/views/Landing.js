import React from "react";

import Home from "../components/Home";
import Carousel from "../components/Carousel";
import Header from "../components/Header";

function Landing() {
  return (
    <div className="landingBox">
      <div className="landingForeground">
        <Header />
        <Home />
        <Carousel />
      </div>
      <div className="landingBackground"></div>
    </div>
  );
}

export default Landing;
