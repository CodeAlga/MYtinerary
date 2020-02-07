import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./views/Landing";
import Cities from "./views/Cities";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";
import CityView from "./views/CityView";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCities: []
    };
  }

  render() {
    const classes = (theme) => ({
      root: {
        height: "100vh"
      }
    });

    return (
      <BrowserRouter>
        <div className="App">
          <div className={classes.root}>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/cities" component={Cities} />
              <Route path="/register" component={RegisterView} />
              <Route path="/login" component={LoginView} />
              <Route path="/city/:listCities._id" component={CityView} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
