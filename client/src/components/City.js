import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

export default function Cities(props) {
  return (
    <div className="cityBox">
      <Card className="root">
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography className="pos" color="textSecondary">
            {props.country}
          </Typography>
          <CardContent className="content">
            <CardMedia className="media" src={props.img} image={props.img} />
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
}
