import React, { Component } from "react";
import { Link } from "react-router-dom";

import Logo from "../images/MYtineraryLogo.png";

import { connect } from "react-redux";
import { authUser } from "../store/actions/userActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(authUser());
  }
  render() {
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
  token: state.auth.token,
  authenticated: state.auth.isAuthenticated,
  loading: state.auth.isLoading,
  user: state.auth.user
});

export default connect(mapStateToProps)(Home);
