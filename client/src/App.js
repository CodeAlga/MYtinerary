import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./views/Landing";
import Cities from "./views/Cities";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";
import CityDetail from "./views/CityDetail";
//import queryString from "query-string";
import { authUser } from "./store/actions/userActions";
import { connect } from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCities: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.auth !== this.props.auth) {
      console.log("dispatch one");
      this.props.dispatch(authUser());
    }
    // var query = queryString.parse(this.props.location.search);
    // if (query.token) {
    //   window.localStorage.setItem("jwt", query.token);
    //   this.props.history.push("/login/google/authentication");
    // }
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
              <Route path="/itineraries/city/:id/" component={CityDetail} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(App);
