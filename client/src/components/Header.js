import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { logout } from "../store/actions/loginActions";
import { useDispatch, useSelector } from "react-redux";
import {
  Drawer,
  IconButton,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Dialog,
  Slide,
  DialogActions,
  DialogTitle,
  DialogContent,
  Avatar
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";

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

function Header() {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.authenticated);
  const user = useSelector((state) => state.auth.user);

  const Letter = () => {
    if (authenticated) {
      if (user.auth.local) {
        return (
          <Fragment>
            <Avatar className="avatar">
              {user.auth.local.userName.charAt(0).toUpperCase()}
            </Avatar>
            <span>Welcome {user.auth.local.userName}</span>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <Avatar className="avatar">
              {user.auth.social.userName.charAt(0).toUpperCase()}
            </Avatar>
            <span>Welcome {user.auth.social.userName}</span>
          </Fragment>
        );
      }
    } else {
      return <Avatar />;
    }
  };

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
    <div>
      <div className="sideDrawer">
        <div
          role="presentation"
          onClick={toggleDrawer(side, false)}
          onKeyDown={toggleDrawer(side, false)}
        >
          <div className="letter">
            <Letter />
          </div>
          <Divider />
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
            <ListItem button>
              <Link to={{ pathname: "/login" }}>
                <ListItemIcon>
                  <FontAwesomeIcon className="drawericon" icon={faSignInAlt} />
                </ListItemIcon>

                <ListItemText primary="Log in" />
              </Link>
            </ListItem>
            <ListItem button>
              <Link to={{ pathname: "/register" }}>
                <ListItemIcon>
                  <FontAwesomeIcon className="drawericon" icon={faUserPlus} />
                </ListItemIcon>{" "}
                <ListItemText primary="Create Account" />
              </Link>
            </ListItem>
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
              <ListItemText
                primary="Log Out"
                onClick={() => {
                  dispatch(logout());
                }}
              ></ListItemText>
            </ListItem>
          </List>
        </div>
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
        <Button onClick={handleClickOpen}>
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
              <li onClick={handleClose}>
                <FontAwesomeIcon className="drawericon" icon={faSignOutAlt} />
                <Link
                  to={{ pathname: "/" }}
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  <p>Log out</p>
                </Link>
              </li>
            </ul>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
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

export default Header;
