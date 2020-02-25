import React from "react";
import { connect } from "react-redux";
import { fetchActivities } from "../store/actions/activityActions";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//import TextField from "@material-ui/core/TextField";

import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  Card,
  CardContent,
  CardMedia,
  withStyles,
  CircularProgress,
  Divider
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = (theme) => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center"
  },
  column: {
    flexBasis: "33.33%"
  },
  helper: {
    padding: theme.spacing(1, 2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  card: {
    width: "60vw"
  }
});

class Activity extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchActivities(this.props.itinerary_ref));
  }

  render() {
    const { classes } = this.props;

    const settings = {
      dots: true,
      arrows: false,
      infinite: false,
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

    const { error, loading, activities } = this.props;

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
      <div className="activityBox">
        <ExpansionPanel className="expansionBox">
          <ExpansionPanelSummary
            className="expansionSummary"
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header"
          >
            <div className={classes.column}>
              <Typography className={classes.heading}>Activities</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="expansionDetail">
            <div className="slickSlider">
              <Card className="sliderRoot">
                <Slider {...settings}>
                  {activities.map((activity, i) =>
                    activity.itinerary_ref === this.props.itinerary_ref ? (
                      <div key={i}>
                        <CardContent className="content">
                          <Typography variant="h5" className="activityTitle">
                            {activity.name}
                          </Typography>
                          <Typography className="pos" color="textSecondary">
                            {activity.country}
                          </Typography>
                        </CardContent>
                        <CardContent>
                          <CardMedia
                            className="media"
                            image={activity.img}
                            src={activity.img}
                          />
                        </CardContent>
                        <Divider />
                        <CardContent className="activityExplanation">
                          <Typography>{activity.comments} </Typography>
                        </CardContent>
                      </div>
                    ) : null
                  )}
                </Slider>
              </Card>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activities: state.activities.activities,
  loading: state.activities.loading,
  error: state.activities.error
});

export default connect(mapStateToProps)(withStyles(styles)(Activity));
