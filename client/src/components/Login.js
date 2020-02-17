import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUsers } from "../store/actions/userActions";

import {
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  Button
  //CircularProgress
} from "@material-ui/core";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      email: "",
      password: ""
    });
  };
  render() {
    console.log(this.props);

    const { error, loading, users } = this.props;

    if (error) {
      console.log(this.props.error);
    }

    if (loading) {
      console.log(this.props.loading);
    }

    if (users) {
      console.log(this.props.users);
    }

    return (
      <div className="registerDisplay">
        <Container component="main" maxWidth="xs" className="registerBox">
          <CssBaseline />
          <div>
            <Typography component="h1" variant="h3">
              Log in
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    inputProps={{
                      minLength: 6,
                      maxLength: 70
                    }}
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Log in
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to={{ pathname: "/register" }}>
                    Don't have an account? Sign up
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users.users,
  loading: state.users.loading,
  postError: state.users.error
});

export default connect(mapStateToProps)(Login);
