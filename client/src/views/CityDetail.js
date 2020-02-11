import React from "react";

import Header from "../components/Header";
import Itineraries from "../components/Itineraries";
import Footer from "../components/Footer";

import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Slide from "@material-ui/core/Slide";

function HideOnScrollUp(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function CityView(props) {
  return (
    <div className="cityviewBox">
      <HideOnScrollUp {...props}>
        <AppBar position="fixed">
          <Toolbar>
            <div>
              <Header />
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScrollUp>
      <Itineraries city_ref={props.match.params.id} />
      <AppBar position="sticky" className="fixedFooter">
        <Footer />
      </AppBar>
    </div>
  );
}
