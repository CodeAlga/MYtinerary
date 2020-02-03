import React from "react";
//import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div className="menuBox">
      <div className="userIcon">
        <FontAwesomeIcon className="icon" icon={faUserCircle} />
      </div>

      {/* <Box display="flex" flexDirection="column" alignItems="center">
        <p className={classes.text}>Whant to build your own MYtinerary?</p>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          className={classes.extend}
        >
          <Link to={{ pathname: "/login" }}>
            <p className={classes.text}>Log in</p>
          </Link>
          <Link to={{ pathname: "/register" }}>
            <p className={classes.text}>Create Account</p>
          </Link>
        </Box>
      </Box> */}
    </div>
  );
}
