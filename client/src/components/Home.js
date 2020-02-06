import React from "react";
import { Link } from "react-router-dom";

import Logo from "../images/MYtineraryLogo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div className="homeBox">
      <img className="logo" src={Logo} alt="Logo" />
      <h3 className="title">
        Find your perfect trip, design by insiders who know and love their
        cities.
      </h3>
      <div className="box">
        <Link to={{ pathname: "/cities" }}>
          <FontAwesomeIcon className="icon" icon={faArrowCircleRight} />
        </Link>
      </div>
      {/* <div>
        <p>Popular MYtineraries</p>
      </div> */}
    </div>
  );
}
