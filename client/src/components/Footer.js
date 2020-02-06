import React from "react";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <Box
      className="footerBox"
      display="flex"
      flexDirection="row"
      justifyContent="center"
      p={1}
      alignSelf="center"
    >
      <footer>
        <Link to="/">
          <FontAwesomeIcon icon={faHome} />
        </Link>
      </footer>
    </Box>
  );
}
