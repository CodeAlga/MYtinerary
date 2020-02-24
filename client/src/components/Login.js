import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { postLogin } from "../store/actions/loginActions";
//import { authUser } from "../store/actions/userActions";
import { withSnackbar } from "notistack";
import {
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  Button
  //CircularProgress
} from "@material-ui/core";
import queryString from "query-string";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      authState: false,
      touched: {
        email: false,
        password: false
      }
    };
  }

  componentDidMount() {
    var query = queryString.parse(window.location.search);

    if (query.token) {
      localStorage.setItem("jwt", query.token);
    }

    if (localStorage.getItem("jwt")) {
      this.handleSuccess();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.error !== this.props.error) {
      if (this.props.error.id === "LOGIN FAILED") {
        this.handleError();
      }
      if (this.props.authenticated) {
        this.setState({ authState: this.props.authenticated });
      }
    }
    if (prevState.authState !== this.state.authState) {
      this.handleSuccess();
    }
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

    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.dispatch(postLogin(user));
  };

  handleError = () => {
    const message = this.props.error.msg;
    this.props.enqueueSnackbar(message, {
      anchorOrigin: {
        vertical: "top",
        horizontal: "left"
      },
      variant: "error",
      className: "snackbarError"
    });
  };

  handleSuccess = () => {
    const message = "Login Successful";
    this.props.enqueueSnackbar(message, {
      anchorOrigin: {
        vertical: "top",
        horizontal: "left"
      },
      variant: "success",
      className: "snackbarError"
    });
  };

  render() {
    const errors = this.validate(this.state.email, this.state.password);

    const isEnabled = !Object.keys(errors).some((x) => errors[x]);

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
                disabled={!isEnabled}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
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
            <Grid item xs={12}>
              <a href="http://localhost:5000/authentication/social">
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  {/* <img
                  width="20px"
                  margin="0 20px"
                  alt="Google sign-in"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                /> */}

                  <span className="svgIcon t-popup-svg">
                    <svg
                      className="svgIcon-use"
                      width="25"
                      height="37"
                      viewBox="0 0 25 25"
                    >
                      <g fill="none" fillRule="evenodd">
                        <path
                          d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z"
                          fill="#34A853"
                        />
                        <path
                          d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z"
                          fill="#EA4335"
                        />
                      </g>
                    </svg>
                  </span>
                  <span className="button-label">Sign in with Google</span>
                </Button>
              </a>
            </Grid>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  error: state.error
});

export default connect(mapStateToProps)(withSnackbar(Login));
