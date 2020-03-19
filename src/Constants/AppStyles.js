import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

const theme = {
  primary: "red",
  secondary: "green",
  headerBarColor: "#f0f0f0"
  // backgroundDefault: "#022946"
};

export const ThemeWrapper = props => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Ubuntu', sans-serif;
  }
`;

const BasicFrame = styled.div`
  display: flex;
`;

export const MainFrame = styled(BasicFrame)`
  /* border: solid rgba(255, 255, 255, 0.5) 1px; */
  height: 100%;
  width: 80%;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  margin: 0 10%;
  /* background-color: #022946; */
`;

export const HeadFrame = styled(BasicFrame)`
  /* border: solid rgba(255, 255, 255, 0.5) 1px; */
  flex-direction: column;
  width: 100%;
  /* background-color: #022946; */
  /* height: 200px; */
  /* margin: 0 10%; */
`;

export const BodyFrame = styled(BasicFrame)`
  /* border: solid red 1px; */
  flex-direction: row;
  width: 100%;
  height: auto;
  justify-content: space-around;
  @media (max-width: 760px) {
    flex-direction: column;
  }
`;

export const StocksFrame = styled(BasicFrame)`
  /* border: solid rgba(255, 255, 255, 0.5) 1px; */
  flex-direction: row;
  align-content: flex-start;
  flex-wrap: wrap;
  width: 48%;
  height: auto;
  /* background-color: #022946; */
  padding: 1%;
  @media (max-width: 760px) {
    width: 98%;
  }
`;

export const GraphFrame = styled(BasicFrame)`
  /* border: solid rgba(255, 255, 255, 0.5) 1px; */
  flex-direction: row;
  flex-wrap: wrap;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  width: 48%;
  padding: 1%;
  @media (max-width: 760px) {
    width: 98%;
  }
`;
