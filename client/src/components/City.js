import React from "react";

import { connect } from "react-redux";
import { fetchCities } from "../store/actions/cityActions";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

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
      return <div>Loading...</div>;
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
                <CardContent className="content">
                  <CardMedia
                    className="media"
                    src={city.img}
                    image={city.img}
                  />
                </CardContent>
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
