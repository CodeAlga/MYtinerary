import React from "react";
//import Footer from "../components/Footer";
import Home from "../components/Home";
import Box from "@material-ui/core/Box";
import Header from "../components/Header";

export default function Landing() {
  return (
    <Box className="landingBox">
      <div className="landingForeground">
        <Header />
        <Home />
        {/* <Footer alignSelf="flex-end" /> */}
      </div>
      <div className="landingBackground"></div>
    </Box>
  );
}
