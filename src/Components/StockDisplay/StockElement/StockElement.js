import React, { useContext, useState, useEffect } from "react";
import { StockPaper, P, H3, A } from "./../StockDisplayStyles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { AppContext } from "./../../../Contexts/AppContext/AppContext";
const StockDisplay = props => {
  const { symbol, name, price, url, index, onClose } = props;

  const [state, setState] = useContext(AppContext);
  const [selected, setSelected] = useState(false);

  const { selectedStock } = state;
  useEffect(() => {
    setSelected(selectedStock === symbol);
  }, [selectedStock, symbol]);

  const handleClose = e => {
    e.stopPropagation();
    const tempState = { ...state };
    const _myStocks = { ...state.myStocks };
    delete _myStocks[symbol];
    tempState.myStocks = _myStocks;
    tempState.selectedStock =
      tempState.selectedStock === symbol ? undefined : tempState.selectedStock;
    setState(tempState);
    localStorage.setItem("StockManagerAppContext", JSON.stringify(tempState));
  };

  const handlePaperClick = () => {
    setState({ ...state, selectedStock: symbol });
    setSelected(true);
  };

  return (
    <Grid
      item
      xs={12}
      md={6}
      lg={3}
      key={`stock-element-${index}`}
      selected={selected}
    >
      <StockPaper
        style={{ background: `${selected ? "#0360A3" : "#024574"}` }}
        onClick={handlePaperClick}
      >
        <IconButton onClick={handleClose}>
          <CloseIcon style={{ color: "white" }} />
        </IconButton>
        <H3>{symbol}</H3>
        <P>
          <strong>Name:</strong> {name}
        </P>
        <P>
          <strong>Price:</strong> $ {price}
        </P>
        <P>
          <strong>Web Site:</strong>{" "}
          <A href={url} target="_blank" onClick={e => e.stopPropagation()}>
            Click here
          </A>
        </P>
        <button onClick={() => alert("mora data here")}>More...</button>
      </StockPaper>
    </Grid>
  );
};

export default StockDisplay;
