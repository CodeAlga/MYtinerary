import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCities } from "../store/actions/cityActions";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress
} from "@material-ui/core";

class Carousel extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchCities());
  }

  render() {
    const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 6000,
      centerMode: false,
      centerPadding: "35px",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    const { error, loading, cities } = this.props;

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

    return (
      <div className="slickSlider">
        <Slider {...settings}>
          {cities.map((city, i) => {
            return (
              <Card className="root" key={i}>
                <CardContent className="content">
                  <Link to={{ pathname: `/itineraries/city/${city._id}` }}>
                    <Typography variant="h5" component="h2">
                      {city.name}
                    </Typography>
                    <Typography className="pos" color="textSecondary">
                      {city.country}
                    </Typography>
                  </Link>
                </CardContent>

                <CardContent className="mediaContent">
                  <CardMedia
                    className="media"
                    src={city.img}
                    image={city.img}
                  />
                </CardContent>
              </Card>
            );
          })}
        </Slider>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cities: state.cities.cities,
  loading: state.cities.loading,
  error: state.cities.error
});

export default connect(mapStateToProps)(Carousel);
