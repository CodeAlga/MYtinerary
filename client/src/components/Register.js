import React, { Component } from "react";

import { connect } from "react-redux";
import { postUsers } from "../store/actions/userActions";

import {
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  Button,
  CircularProgress
} from "@material-ui/core";

//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Checkbox from "@material-ui/core/Checkbox";

//import Box from "@material-ui/core/Box";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

class Register extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      userName: "",
      bday: "",
      city: "",
      profileImg: null,
      email: "",
      password: "",
      confirmPassword: "",
      touched: {
        fname: false,
        lname: false,
        userName: false,
        bday: false,
        email: false,
        password: false,
        confirmPassword: false
      }
    };
    this.uploadSingleFile = this.uploadSingleFile.bind(this);
    //this.upload = this.upload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validate(fname, lname, userName, bday, email, password, confirmPassword) {
    // true means invalid, so our conditions got reversed
    return {
      fname: fname.length === 0,
      lname: lname.length === 0,
      userName: userName.length === 0,
      bday:
        bday >= +~~((Date.now() - +new Date(this.state.bday)) / 31557600000),
      email: !email.includes("@"),
      password: password.length < 5,
      confirmPassword: confirmPassword !== this.state.password
    };
  }

  handleBlur = (field) => () => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  uploadSingleFile(e) {
    this.setState({
      profileImg: URL.createObjectURL(e.target.files[0])
    });
  }

  // upload(e) {
  //   console.log("not preventing");
  //   e.preventDefault();
  //   console.log(this.state.file);
  // }

  handleChange = (e) => {
    //   date = +~~(
    //     (Date.now() - +new Date(e.target.value)) /
    //     31557600000
    //   );

    this.setState({
      [e.target.id]: e.target.value
    });
    console.log(e.target.id, e.target.value, this.state);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      fname: this.state.fname,
      lname: this.state.lname,
      bday: this.state.bday,
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password
    };

    postUsers(user).then((res) => {
      this.props.history.push("/");
    });
  };
  render() {
    const { error, loading } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return (
        <div className="spinner">
          <CircularProgress color="secondary" />
        </div>
      );
    }

    const errors = this.validate(
      this.state.fname,
      this.state.lname,
      this.state.bday,
      this.state.userName,
      this.state.email,
      this.state.password,
      this.state.confirmPassword
    );

    const isEnabled = !Object.keys(errors).some((x) => errors[x]);

    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

    let imgPreview;
    if (this.state.profileImg) {
      imgPreview = <img src={this.state.profileImg} alt="" />;
    }
    return (
      <div className="registerDisplay">
        <Container component="main" maxWidth="xs" className="registerBox">
          <CssBaseline />
          <div>
            <Typography component="h1" variant="h3">
              Sign up
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    error={shouldMarkError("fname") ? true : false}
                    onBlur={this.handleBlur("fname")}
                    type="text"
                    autoComplete="name"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    value={this.state.fname}
                    id="fname"
                    label="First Name"
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={shouldMarkError("lname") ? true : false}
                    onBlur={this.handleBlur("lname")}
                    type="text"
                    autoComplete="family-name"
                    variant="outlined"
                    required
                    fullWidth
                    value={this.state.lname}
                    id="lname"
                    label="Last Name"
                    name="lastName"
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={shouldMarkError("bday") ? true : false}
                    onBlur={this.handleBlur("bday")}
                    type="date"
                    name="bday"
                    id="bday"
                    label="Birthday"
                    helperText="You need to be at least 18"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      min: "1920-01-01"
                    }}
                    required
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="city"
                    id="city"
                    label="City"
                    variant="outlined"
                    helperText="Your city of residence"
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <div className="preview">{imgPreview}</div>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" color="primary">
                    <label htmlFor="file-upload">Upload a pic</label>
                    <input
                      id="file-upload"
                      type="file"
                      onChange={this.uploadSingleFile}
                      hidden
                    />
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={shouldMarkError("userName") ? true : false}
                    onBlur={this.handleBlur("userName")}
                    variant="outlined"
                    required
                    id="userName"
                    label="User Name"
                    name="userName"
                    helperText="This is what the other users will see"
                    onChange={this.handleChange}
                    fullWidth
                  />
                </Grid>
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
                <Grid item xs={6}>
                  <TextField
                    error={shouldMarkError("password") ? true : false}
                    onBlur={this.handleBlur("passwrod")}
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
                <Grid item xs={6}>
                  <TextField
                    error={shouldMarkError("confirmPassword") ? true : false}
                    onBlur={this.handleBlur("confirmPasswrod")}
                    label="Re-type password"
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    variant="outlined"
                    fullWidth
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
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to={{ pathname: "/login" }}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          {/* <Box mt={5}>
          <Copyright />
        </Box> */}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users.users,
  loading: state.users.loading,
  error: state.users.error
});

export default connect(mapStateToProps)(Register);
