import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchComments,
  fetchCommentsFailure,
  postComment,
  deleteComment
} from "../store/actions/commentsActions";
import { authUser } from "../store/actions/userActions";
import { clearErrors } from "../store/actions/errorActions";

import {
  Typography,
  Divider,
  IconButton,
  TextField,
  Button,
  CircularProgress
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

import { withSnackbar } from "notistack";

class Comments extends Component {
  constructor() {
    super();
    this.state = {
      comment: "",
      user: "",
      user_ref: ""
    };
  }

  componentDidMount() {
    this.props.dispatch(authUser());
    this.props.dispatch(fetchCommentsFailure());
    this.props.dispatch(fetchComments(this.props.params));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.authenticated !== this.props.authenticated) {
      this.setState({ user_ref: this.props.user._id });
    }
  }

  handleChange = (e) => {
    this.setState({
      comment: e.target.value
    });

    if (this.props.authenticated) {
      //this.setState({ user_ref: this.props.user._id });
      if (this.props.user.auth.origin === "local") {
        this.setState({ user: this.props.user.auth.local.userName });
      } else if (this.props.user.auth.origin === "social") {
        this.setState({ user: this.props.user.auth.social.userName });
      }
      console.log(this.props.user);
      console.log(this.state.user_ref);
    } else {
      this.setState({ user: "" });
      this.setState({ user_ref: "" });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(clearErrors());
    const comment = {
      comment: this.state.comment,
      user: this.state.user,
      user_ref: this.state.user_ref,
      activity_ref: this.props.params
    };

    if (!this.props.authenticated) {
      this.handleError();
    } else {
      this.props.dispatch(postComment(comment));
    }
  };

  handleDelete = (id) => {
    if (!this.props.authenticated) {
      this.handleError();
    } else {
      this.props.dispatch(deleteComment(id));
      this.props.dispatch(fetchCommentsFailure());
      this.props.dispatch(fetchComments(this.props.params));
    }
  };

  handleError = () => {
    const message = "You need to be registered to do that";
    this.props.enqueueSnackbar(message, {
      anchorOrigin: {
        vertical: "top",
        horizontal: "left"
      },
      variant: "error",
      className: "snackbarError"
    });
  };

  render() {
    const { comments, loading } = this.props;

    if (loading) {
      return (
        <div className="spinner">
          <CircularProgress color="secondary" />
        </div>
      );
    }

    return (
      <div>
        {comments.map((comment, i) =>
          comment.activity_ref === this.props.params ? (
            <div key={i} className="commentBox">
              <div>
                <Typography className="pos" color="textPrimary">
                  {comment.comment}
                </Typography>
                {comment.user_ref === this.state.user_ref ? (
                  <IconButton
                    aria-label="delete"
                    onClick={(e) => this.handleDelete(comment._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : null}
              </div>
              <Typography
                variant="caption"
                display="block"
                color="textSecondary"
                gutterBottom
                className="commentSignature"
              >
                <div>
                  <span>{comment.user}</span>
                  <span> - </span>
                  <span>{comment.timestamp}</span>
                </div>
              </Typography>
              <Divider />
            </div>
          ) : null
        )}
        <Divider />
        <form
          noValidate
          autoComplete="off"
          className="commentForm"
          onSubmit={this.handleSubmit}
        >
          <TextField
            className="outlined-basic"
            label="Add Comment"
            variant="outlined"
            onChange={this.handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
          >
            Send comment
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  comments: state.comments.comments,
  loading: state.comments.loading,
  authenticated: state.auth.authenticated,
  user: state.auth.user
});

export default connect(mapStateToProps)(withSnackbar(Comments));
