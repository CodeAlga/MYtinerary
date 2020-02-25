import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Divider,
  useScrollTrigger,
  AppBar,
  Toolbar,
  Slide,
  CircularProgress,
  TextField
} from "@material-ui/core";

import {
  fetchActivities,
  clearActivities
} from "../store/actions/activityActions";

function HideOnScrollUp(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const ItineraryDeatil = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  console.log(id);

  const { activities, error, loading } = useSelector((state) => ({
    error: state.activities.error,
    loading: state.activities.loading,
    activities: state.activities.activities
  }));

  useEffect(() => {
    dispatch(clearActivities());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchActivities(id));
  }, [dispatch]);

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
    <div className="cityviewBox">
      <HideOnScrollUp {...props}>
        <AppBar position="fixed">
          <Toolbar>
            <div>
              <Header />
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScrollUp>
      <Card className="sliderRoot">
        {activities.map((activity, i) => (
          <Card className="root" key={i}>
            <CardHeader
              title={activity.name}
              subheader={
                <div className="itinerarySubheader">
                  <span>{activity.addres}</span>
                  <span>{activity.hours}hrs</span>
                  <span>{activity.cost}</span>
                </div>
              }
            />
            <Divider />
            <CardContent>
              <Typography variant="h5" component="h2">
                Comments
              </Typography>
              {activity.comments.map((comment, i) => (
                <Typography className="pos" color="textSecondary" key={i}>
                  {comment}
                  <Divider />
                </Typography>
              ))}
              <form noValidate autoComplete="off" className="commentForm">
                <TextField
                  className="outlined-basic"
                  label="Comment"
                  variant="outlined"
                />
              </form>
            </CardContent>
          </Card>
        ))}
      </Card>

      <AppBar position="sticky" className="fixedFooter">
        <Footer />
      </AppBar>
    </div>
  );
};

export default ItineraryDeatil;
