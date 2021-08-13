import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({ title, cases, total, colorCard,colorCases, ...props }) {
 
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${"infoBox--selected"} ${colorCard}`}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${colorCases}`}>
          {cases}
        </h2>

        <Typography className="infoBox__total" color="textSecondary">
          {total} en Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
