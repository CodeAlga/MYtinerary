import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchItineraries } from "../store/actions/itineraryActions";
import { fetchActivities } from "../store/actions/activityActions";

class Itinerary extends Component {
  componentDidMount() {
    this.props.dispatch(fetchItineraries(this.props.city_ref));
    this.props.dispatch(fetchActivities(this.props.city_ref));
  }

  render() {
    console.log(this.props);
    const {
      itineraryError,
      activityError,
      itineraryLoading,
      activityLoading,
      itineraries,
      activities
    } = this.props;

    if (itineraryError || activityError) {
      return (
        <div>Error! {itineraryError.message || activityError.message}</div>
      );
    }

    if (itineraryLoading || activityLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div>
          {itineraries.map((itinerary, i) => {
            return (
              <div key={i}>
                <ul>
                  <li>{itinerary.name}</li>
                </ul>
              </div>
            );
          })}
        </div>
        <div>
          {activities.map((activity, i) => {
            return (
              <div key={i}>
                <ul>
                  <li>{activity.name}</li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  itineraries: state.itineraries.itineraries,
  itineraryLoading: state.itineraries.loading,
  itineraryError: state.itineraries.error,
  activities: state.activities.activities,
  activityLoading: state.activities.loading,
  activityError: state.activities.error
});

export default connect(mapStateToProps)(Itinerary);
