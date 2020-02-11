import React, { Component } from "react";
import Activities from "./Activities";

import { connect } from "react-redux";
import { fetchItineraries } from "../store/actions/itineraryActions";

import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  CircularProgress
} from "@material-ui/core";

class Itinerary extends Component {
  componentDidMount() {
    this.props.dispatch(fetchItineraries(this.props.city_ref));
  }

  render() {
    const { error, loading, itineraries } = this.props;

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
            </Card>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  itineraries: state.itineraries.itineraries,
  loading: state.itineraries.loading,
  error: state.itineraries.error
});

export default connect(mapStateToProps)(Itinerary);
