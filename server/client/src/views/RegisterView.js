import React from "react";
import Register from "../components/Register";
import Footer from "../components/Footer";
import AppBar from "@material-ui/core/AppBar";

export default function RegisterView() {
  return (
    <div>
      <Register />
      <AppBar position="sticky" className="fixedFooter">
        <Footer />
      </AppBar>
    </div>
  );
}
