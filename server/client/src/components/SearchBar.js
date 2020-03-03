import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { search } from "../store/actions/searchAction";

import TextField from "@material-ui/core/TextField";

class searchBar extends Component {
  render() {
    const { search, value } = this.props;

    return (
      <div className="searchBox">
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={(e) => search(e.target.value)}
            value={value}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  search: state.search.value
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ search }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(searchBar);
