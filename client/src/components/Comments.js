import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchComments,
  fetchCommentsFailure
} from "../store/actions/commentsActions";

import { Typography, Divider } from "@material-ui/core";

class Comments extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCommentsFailure());
    this.props.dispatch(fetchComments(this.props.params));
  }
  render() {
    const { comments } = this.props;

    return (
      <div>
        {comments.map((comment, i) =>
          comment.activity_ref === this.props.params ? (
            <div key={i}>
              <Typography variant="caption" display="block" gutterBottom>
                <span>{comment.user}</span>
                <span>{comment.timestamp}</span>
              </Typography>
              <Typography className="pos" color="textSecondary">
                {comment.comment}
              </Typography>
            </div>
          ) : null
        )}
        <Divider />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  comments: state.comments.comments
});

export default connect(mapStateToProps)(Comments);
