import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import AnimatedNumbers from 'react-animated-numbers'
import "./InfoBox.css";

function InfoBox({ title, cases, total, colorCard,colorCases, ...props }) {
 
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${"infoBox--selected"} ${colorCard}`}
    >
      <CardContent>
        <Typography color="textPrimary" gutterBottom>
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${colorCases}`}>
 
          <AnimatedNumbers
        includeComma
        animateToNumber={cases}
        fontStyle={{ fontSize: 40 }}
        
      ></AnimatedNumbers>
        </h2>
        <Typography className="infoBox__dias" color="textSecondary">
        En los últimos 30 días
        </Typography>
        <h2 className="infoBox__total" color="textPrimary">
            {total} en total
        </h2>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
