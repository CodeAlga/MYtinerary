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
    const { error, loading, cities } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="cityBox">
        {cities.map((city, i) => {
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
  error: state.cities.error
});

export default connect(mapStateToProps)(City);
