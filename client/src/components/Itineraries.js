import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchItineraries } from "../store/actions/itineraryActions";

class Itinerary extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     city: {}
  //   };
  // }

  componentDidMount() {
    this.props.dispatch(fetchItineraries(this.props.city_ref));
    //this.props.dispatch(fetchActivities(this.props.itinerary_ref));
  }

  render() {
    console.log(this.props);
    const { error, loading, itineraries } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
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
    );
  }
}

const mapStateToProps = (state) => ({
  itineraries: state.itineraries.itineraries,
  loading: state.itineraries.loading,
  error: state.itineraries.error
});

export default connect(mapStateToProps)(Itinerary);
