import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchComments } from "../store/actions/commentsActions";

import { Typography, Divider } from "@material-ui/core";

class Comments extends Component {
  componentDidMount() {
    this.props.dispatch(fetchComments("5e3eca9ba51e724b5ce533bf"));
  }
  render() {
    const { comments } = this.props;
    console.log(comments);

    return (
      <div>
        <Typography className="pos" color="textSecondary">
          Comment
        </Typography>
        <Typography className="pos" color="textSecondary">
          Comment
        </Typography>
        <Typography className="pos" color="textSecondary">
          Comment
        </Typography>
        <Typography className="pos" color="textSecondary">
          Comment
        </Typography>
        <Divider />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  comments: state.comments.comments
});

export default connect(mapStateToProps)(Comments);
