import React from "react";
import { Link, useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  let history = useHistory();
  return (
    <Box
      className="footerBox"
      display="flex"
      flexDirection="row"
      justifyContent="center"
      p={1}
      alignSelf="center"
    >
      <FontAwesomeIcon icon={faAngleLeft} onClick={() => history.goBack()} />
      <footer>
        <Link to="/">
          <FontAwesomeIcon icon={faHome} />
        </Link>
      </footer>
    </Box>
  );
}
