import React, { Component } from "react";
import { Link } from "react-router-dom";

import Logo from "../images/MYtineraryLogo.png";

import { connect } from "react-redux";
import { loadUser } from "../store/actions/loginActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(loadUser());
  }
  render() {
    console.log(this.props);

    return (
      <div className="homeBox">
        <img className="logo" src={Logo} alt="Logo" />
        <h3 className="title">
          Find your perfect trip, design by insiders who know and love their
          cities.
        </h3>
        <div className="box">
          <Link to={{ pathname: "/cities" }}>
            <FontAwesomeIcon className="icon" icon={faArrowCircleRight} />
          </Link>
        </div>
        {/* <div>
          <p>Popular MYtineraries</p>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.login.token,
  isAuthenticated: state.login.isAuthenticated,
  isLoading: state.login.isLoading,
  user: state.login.user
});

export default connect(mapStateToProps)(Home);
