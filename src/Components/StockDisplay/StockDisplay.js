import React, { useContext, useEffect, useState } from "react";
import { H2, TitlePaper } from "./StockDisplayStyles";
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
  return (
    <>
      <TitlePaper style={{ background: "#024574" }}>
        <H2>Your Stocks</H2>
      </TitlePaper>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="strech"
        spacing={3}
      >
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
    </>
  );
};

export default StockDisplay;
