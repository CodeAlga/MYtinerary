import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./views/Landing";
import Cities from "./views/Cities";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: []
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
            <Route exact path="/" component={Landing} />
            <Route path="/cities" component={Cities} />
            <Route path="/register" component={RegisterView} />
            <Route path="/login" component={LoginView} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
