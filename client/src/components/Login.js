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
      password: "",
      touched: {
        email: false,
        password: false
      }
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }

  validate(email, password) {
    // true means invalid, so our conditions got reversed
    return {
      email: !email.includes("@"),
      password: password.length === 0
    };
  }

  handleBlur = (field) => () => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

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

    const errors = this.validate(this.state.email, this.state.password);

    //const isEnabled = !Object.keys(errors).some((x) => errors[x]);

    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

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
                    error={shouldMarkError("email") ? true : false}
                    onBlur={this.handleBlur("email")}
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
                    error={shouldMarkError("password") ? true : false}
                    onBlur={this.handleBlur("password")}
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
