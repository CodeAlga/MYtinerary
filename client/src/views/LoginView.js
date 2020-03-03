import React from "react";
import Login from "../components/Login";
import Footer from "../components/Footer";
import AppBar from "@material-ui/core/AppBar";

export default function LoginView() {
  return (
    <div>
      <Login />
      <AppBar position="sticky" className="fixedFooter">
        <Footer />
      </AppBar>
    </div>
  );
}
