import React from "react";
import { StockPaper } from "./../StockDisplayStyles";
import Grid from "@material-ui/core/Grid";

const StockDisplay = props => {
  const { symbol, name, price, url, index } = props;

  return (
    <Grid item xs={3} key={`stock-element-${index}`}>
      <StockPaper>
        <h3>{symbol}</h3>
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Price:</strong> $ {price}
        </p>
        <p>
          <strong>Web Site:</strong> <a href={url}>Click here</a>
        </p>
        <button onClick={() => alert("mora data here")}>More...</button>
      </StockPaper>
    </Grid>
  );
};

export default StockDisplay;
