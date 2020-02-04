import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
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

  componentDidMount() {
    fetch("cities/all")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          listCities: data
        });
      });
  }

  /* getIde = (listCities) => {}; */

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
            <Route
              path="/cities"
              render={(props) => (
                <Cities
                  listCities={this.state.listCities}
                  {...this.state.props}
                />
              )}
            />
            <Route path="/register" component={RegisterView} />
            <Route path="/login" component={LoginView} />
            <Route path="/city/:listCities.id" component={CityView} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
