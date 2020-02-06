import React from "react";

import City from "../components/City";
import Footer from "../components/Footer";
import Header from "../components/Header";

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

export default function Cities(props) {
  const { listCities } = props;

  return (
    <div className="citiesBox">
      <HideOnScrollUp {...props}>
        <AppBar position="fixed">
          <Toolbar>
            <div>
              <Header />
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScrollUp>

      <div className="cityDisplay">
        {listCities.map((city, i) => {
          return <City {...city} key={i} />;
        })}
      </div>
      <AppBar position="sticky" className="fixedFooter">
        <Footer />
      </AppBar>
    </div>
  );
}
