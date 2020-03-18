import React, { useContext, useEffect, useState } from "react";
import { StockPaper } from "./StockDisplayStyles";
import Grid from "@material-ui/core/Grid";
import StockElement from "./StockElement/StockElement";
import { AppContext } from "./../../Contexts/AppContext/AppContext";

const StockDisplay = props => {
  const [state, setState] = useContext(AppContext);
  const [stocks, setStocks] = useState([]);
  useEffect(() => {
    const { myStocks } = state;

    if (myStocks) {
      const newStocks = Object.keys(myStocks).map(stock => ({
        symbol: stock,
        name: myStocks[stock].name,
        price: myStocks[stock].price || "Not available price",
        url: myStocks[stock].weburl
      }));
      setStocks(newStocks);
    }
  }, [state]);
  const demoList = [
    {
      symbol: "ACN",
      name: "Accenture",
      price: "19.99",
      url: "www.accenture.com"
    },
    {
      symbol: "ACN",
      name: "Accenture",
      price: "19.99",
      url: "www.accenture.com"
    },
    {
      symbol: "ACN",
      name: "Accenture",
      price: "19.99",
      url: "www.accenture.com"
    },
    {
      symbol: "ACN",
      name: "Accenture",
      price: "19.99",
      url: "www.accenture.com"
    },
    {
      symbol: "ACN",
      name: "Accenture",
      price: "19.99",
      url: "www.accenture.com"
    },
    {
      symbol: "ACN",
      name: "Accenture",
      price: "19.99",
      url: "www.accenture.com"
    },
    {
      symbol: "ACN",
      name: "Accenture",
      price: "19.99",
      url: "www.accenture.com"
    },
    {
      symbol: "ACN",
      name: "Accenture",
      price: "19.99",
      url: "www.accenture.com"
    },
    {
      symbol: "ACN",
      name: "Accenture",
      price: "19.99",
      url: "www.accenture.com"
    }
  ];
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={3}
    >
      <Grid item xs={12}>
        <StockPaper>
          <h2>Your Stocks</h2>
        </StockPaper>
      </Grid>
      {stocks.map((stock, index) => {
        return (
          <StockElement
            key={`stock-element-${index}`}
            {...stock}
            index={index}
          />
        );
      })}
    </Grid>
  );
};

export default StockDisplay;
