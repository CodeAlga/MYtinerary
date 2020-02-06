import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Card, CardContent, CardMedia } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

function Carousel(props) {
  const { listCities } = props;
  console.log(listCities);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
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

  return (
    <div className="slickSlider">
      <Slider {...settings}>
        {listCities.map((city, i) => {
          return (
            <Card className="root" key={i}>
              <CardContent className="content">
                <Typography variant="h5" component="h2">
                  {city.name}
                </Typography>
                <Typography className="pos" color="textSecondary">
                  {city.country}
                </Typography>
              </CardContent>
              <CardContent className="mediaContent">
                <CardMedia className="media" src={city.img} image={city.img} />
              </CardContent>
            </Card>
          );
        })}
      </Slider>
    </div>
  );
}
export default Carousel;
