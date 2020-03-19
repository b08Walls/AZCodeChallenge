import React from "react";
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
import { SocketContextProvider } from "./Contexts/SocketContext/SocketContext";
function App() {
  return (
    <AppContextProvider>
      <SocketContextProvider>
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
      </SocketContextProvider>
    </AppContextProvider>
  );
}

export default App;
