import React, { Component } from "react";
import Activities from "./Activities";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { fetchItineraries } from "../store/actions/itineraryActions";
import { fetchActivities } from "../store/actions/activityActions";
import { authUser } from "../store/actions/userActions";

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

class Itinerary extends Component {
  componentDidMount() {
    this.props.dispatch(authUser());
    this.props.dispatch(fetchItineraries(this.props.city_ref));
    this.props.dispatch(fetchActivities(this.props));
  }

  render() {
    const { error, loading, itineraries, authenticated } = this.props;

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

    const Fav = () => {
      if (authenticated) {
        return <FavoriteIcon color="secondary"></FavoriteIcon>;
      } else {
        return <FavoriteBorderIcon color="secondary"></FavoriteBorderIcon>;
      }
    };

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
                <IconButton aria-label="add to favorites">
                  <Fav />
                </IconButton>
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
  itineraries: state.itineraries.itineraries,
  loading: state.itineraries.loading,
  error: state.itineraries.error
});

export default connect(mapStateToProps)(Itinerary);
