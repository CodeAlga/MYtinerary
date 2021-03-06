import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { fetchCities } from "../store/actions/cityActions";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress
} from "@material-ui/core";

class City extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchCities());
  }

  render() {
    const { error, loading, cities, search } = this.props;

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

    const searchValue = search.charAt(0).toUpperCase() + search.slice(1);
    const searchCities = cities.filter((city) => {
      return Object.keys(city).some((key) => city[key].startsWith(searchValue));
    });

    return (
      <div className="cityBox">
        {searchCities.map((city, i) => {
          return (
            <Card className="root" key={i}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {city.name}
                </Typography>
                <Typography className="pos" color="textSecondary">
                  {city.country}
                </Typography>
                <Link to={`/itineraries/city/${city._id}`}>
                  {/* <Link to={"/itineraries/city/" + city._id}> */}
                  <CardContent className="content">
                    <CardMedia
                      className="media"
                      src={city.img}
                      image={city.img}
                    />
                  </CardContent>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cities: state.cities.cities,
  loading: state.cities.loading,
  error: state.cities.error,
  search: state.search.value
});

export default connect(mapStateToProps)(City);
