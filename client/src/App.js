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
      listCities: [],
      listId: []
    };
  }

  componentDidMount() {
    fetch("cities/all")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          listCities: data
        });
        this.getId(this.state.listCities);
      });
  }

  getId = (arr) => {
    let arrayId = [];
    arr.map((item) => {
      arrayId.push(item._id);
      return arrayId;
    });
    this.setState({ listId: arrayId });
  };

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
              <Route
                exact
                path="/"
                render={(props) => (
                  <Landing
                    listCities={this.state.listCities}
                    {...this.state.props}
                  />
                )}
              />
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
              <Route path="/city/:listCities._id" component={CityView} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
