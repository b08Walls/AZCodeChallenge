import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  MainFrame,
  HeadFrame,
  BodyFrame,
  StocksFrame,
  GraphFrame,
  ThemeWrapper,
  GlobalStyles
} from "./Constants/AppStyles";
import SearchBar from "./Components/SearchBar/SearchBar";
import StockDisplay from "./Components/StockDisplay/StockDisplay";
import StockGraph from "./Components/StockGraph/StockGraph";
import { AppContextProvider } from "./Contexts/AppContext/AppContext";
import SocketManager from "./Components/SocketManager/SocketManager";
function App() {
  return (
    <AppContextProvider>
      <SocketManager />
      <ThemeWrapper>
        <GlobalStyles />
        <MainFrame>
          <HeadFrame>
            <SearchBar />
          </HeadFrame>
          <BodyFrame>
            <StocksFrame>
              <StockDisplay />
            </StocksFrame>
            <GraphFrame>
              <StockGraph />
            </GraphFrame>
          </BodyFrame>
        </MainFrame>
      </ThemeWrapper>
    </AppContextProvider>
  );
}

export default App;
