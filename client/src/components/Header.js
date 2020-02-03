import React from "react";
import { Link } from "react-router-dom";

import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faGlassCheers,
  faIcons,
  faUmbrellaBeach
} from "@fortawesome/free-solid-svg-icons";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Header(props) {
  const [state, setState] = React.useState({
    right: false
  });

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = (side) => (
    <div className="sideDrawer">
      <div
        role="presentation"
        onClick={toggleDrawer(side, false)}
        onKeyDown={toggleDrawer(side, false)}
      >
        <List>
          <ListItem button key="1">
            <FontAwesomeIcon className="drawericon" icon={faGlassCheers} />
            <ListItemText primary="Item 1" />
          </ListItem>
          <ListItem button key="2">
            <FontAwesomeIcon className="drawericon" icon={faIcons} />
            <ListItemText primary="Item 2" />
          </ListItem>
          <ListItem button key="3">
            <FontAwesomeIcon className="drawericon" icon={faUmbrellaBeach} />
            <ListItemText primary="Item 3" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {["Log in", "Create Account"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <FontAwesomeIcon className="drawericon" icon={faSignInAlt} />
                ) : (
                  <FontAwesomeIcon className="drawericon" icon={faUserPlus} />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
      <div
        role="presentation"
        onClick={toggleDrawer(side, false)}
        onKeyDown={toggleDrawer(side, false)}
      >
        <Divider />
        <List>
          <ListItem button key="logout">
            <ListItemIcon>
              <FontAwesomeIcon className="drawericon" icon={faSignOutAlt} />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </div>
    </div>
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="menuBox">
      <div className="userIcon">
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          <FontAwesomeIcon className="icon" icon={faUserCircle} />
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-login-slide-title"
          aria-describedby="alert-login-slide-description"
        >
          <DialogTitle className="userDialog" id="alert-login-slide-title">
            {"Welcome!"}
          </DialogTitle>
          <DialogContent className="userDialog">
            <ul>
              <li>
                <FontAwesomeIcon className="drawericon" icon={faSignInAlt} />
                <Link to={{ pathname: "/login" }}>
                  <p>Log in</p>
                </Link>
              </li>
              <li>
                <FontAwesomeIcon className="drawericon" icon={faUserPlus} />
                <Link to={{ pathname: "/register" }}>
                  <p>Create Account</p>
                </Link>
              </li>
            </ul>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer("right", true)}
          edge="start"
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
    </div>
  );
}
