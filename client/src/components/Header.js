import React from "react";
//import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 200
  }
}));

export default function Header() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false
  });

  const sideList = (side) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  return (
    <div className="menuBox">
      <div className="userIcon">
        <FontAwesomeIcon className="icon" icon={faUserCircle} />
      </div>
      <div>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={toggleDrawer("right", true)}
          className="icon"
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          anchor="right"
          open={state.right}
          onClose={toggleDrawer("right", false)}
        >
          {sideList("right")}
        </Drawer>
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
