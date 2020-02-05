import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: "90vw",
    margin: "1rem"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  media: {
    height: "150px",
    padding: "0.2rem"
  },
  content: {
    padding: "0.5rem"
  }
});

export default function Cities(props) {
  const classes = useStyles(props);

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {props.country}
          </Typography>
          <CardContent className={classes.content}>
            <CardMedia
              className={classes.media}
              src={props.img}
              image={props.img}
            />
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
}
