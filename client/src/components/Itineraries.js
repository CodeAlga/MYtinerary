import React, { Component } from "react";
import Activities from "./Activities";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { fetchItineraries } from "../store/actions/itineraryActions";
import { clearActivities } from "../store/actions/activityActions";
import { authUser } from "../store/actions/userActions";
import { addFav, removeFav } from "../store/actions/favouriteActions";

import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  CircularProgress,
  Button,
  CardActions,
  IconButton
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import { withSnackbar } from "notistack";

class Itinerary extends Component {
  componentDidMount() {
    this.props.dispatch(authUser());
    this.props.dispatch(clearActivities());
    this.props.dispatch(fetchItineraries(this.props.city_ref));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user !== null && prevProps.user !== null) {
      if (
        prevProps.user.auth.favourites.length !==
        this.props.user.auth.favourites.length
      ) {
        this.setState({ fav: this.props.user.auth.favourites });
      }
    }
  }

  addFav = (itinerary_ref) => {
    if (this.props.authenticated) {
      const newFav = {
        fav: itinerary_ref
      };
      //this.setState({ fav: [itinerary_ref, ...this.state.fav] });
      this.props.dispatch(addFav(newFav));
    } else {
      this.handleError();
    }
  };
  removeFav = (itinerary_ref) => {
    if (this.props.authenticated) {
      const newFav = {
        fav: itinerary_ref
      };
      this.props.dispatch(removeFav(newFav));
    } else {
      this.handleError();
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
    const {
      error,
      loading,
      itineraries,
      authenticated,
      favourites
    } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return (
        <div className="spinner fullPageSpinner">
          <CircularProgress color="secondary" />
        </div>
      );
    }

    return (
      <div className="itineraryBox">
        {itineraries.map((itinerary, i) => {
          return (
            <Card className="root" key={i}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className="avatar">
                    {itinerary.username.charAt(0).toUpperCase()}
                  </Avatar>
                }
                title={itinerary.username}
                subheader={
                  <div className="itinerarySubheader">
                    <span>Likes: {itinerary.rating}</span>
                    <span>{itinerary.duration}hrs</span>
                    <span>{itinerary.price}</span>
                  </div>
                }
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  {itinerary.name}
                </Typography>
                <Typography className="pos" color="textSecondary">
                  {itinerary.hashtags.map((hashtag, i) => {
                    return <span key={i}>{hashtag} </span>;
                  })}
                </Typography>

                <Activities itinerary_ref={itinerary._id} />
              </CardContent>
              <CardActions disableSpacing>
                {authenticated ? (
                  favourites.includes(itinerary._id) ? (
                    <IconButton
                      aria-label="add to favorites"
                      onClick={() => this.removeFav(itinerary._id)}
                    >
                      <FavoriteIcon color="secondary" key={i} />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="add to favorites"
                      onClick={() => this.addFav(itinerary._id)}
                    >
                      <FavoriteBorderIcon color="secondary" key={i} />
                    </IconButton>
                  )
                ) : (
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => this.removeFav(itinerary._id)}
                  >
                    <FavoriteBorderIcon color="secondary" />
                  </IconButton>
                )}

                <Link to={`/itinerary/${itinerary._id}`} params={itinerary._id}>
                  <Button size="small" color="primary">
                    Learn what people say
                    <MoreHorizIcon />
                  </Button>
                </Link>
              </CardActions>
            </Card>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  user: state.auth.user,
  favourites: state.auth.favourites,
  itineraries: state.itineraries.itineraries,
  loading: state.itineraries.loading,
  error: state.itineraries.error
});

export default connect(mapStateToProps)(withSnackbar(Itinerary));
