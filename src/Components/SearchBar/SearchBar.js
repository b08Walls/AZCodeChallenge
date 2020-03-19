import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { finnHubKey } from "./../../Constants/Keys";
import { AppContext } from "./../../Contexts/AppContext/AppContext";
import {
  SearchBarFrame,
  SearchTextField,
  SearchBarTitle,
  SearchButtonFrame
} from "./SearchBarStyles";

import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

const SearchBar = props => {
  //------ STATES AND CONTEXT ----------------------------------------------------------------------------
  const [symbol, setSymbol] = useState("");
  const [state, setState] = useContext(AppContext);
  //------ HANDLERS --------------------------------------------------------------------------------------
  const handleSearch = async () => {
    if (symbol) {
      const profileUrl = `https://finnhub.io/api/v1/stock/profile?symbol=${symbol}&token=${finnHubKey}`;
      const priceUrl = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${finnHubKey}`;
      const profileResult = await axios.get(profileUrl);
      const profileData = profileResult.data;
      const priceResult = await axios.get(priceUrl);
      const priceData = priceResult.data;
      console.log(profileData);
      console.log(priceData);
      if (profileData.ticker) {
        const _myStocks = {
          ...state.myStocks,
          [profileData.ticker]: {
            ...profileData,
            price: priceData ? priceData.c : undefined
          }
        };
        const newState = { ...state, myStocks: _myStocks };
        setState(newState);
        localStorage.setItem(
          "StockManagerAppContext",
          JSON.stringify(newState)
        );
      } else {
        alert("The Symbol you entered is not a valid symbol");
      }
      setSymbol("");
    }
  };

  useEffect(() => {
    console.log("new state", state);
  }, [state]);

  return (
    <SearchBarFrame>
      <SearchBarTitle>Stock Manager</SearchBarTitle>
      <SearchTextField
        placeholder="Type your Stock Symbol here..."
        value={symbol}
        onChange={event => {
          setSymbol(event.target.value);
        }}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            e.preventDefault();
            handleSearch();
          }
        }}
      />
      <SearchButtonFrame>
        <IconButton onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </SearchButtonFrame>
    </SearchBarFrame>
  );
};

export default SearchBar;
