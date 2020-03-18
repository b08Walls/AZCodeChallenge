import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

const theme = {
  primary: "red",
  secondary: "green",
  headerBarColor: "#f0f0f0"
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
  border: solid red 3px;
  height: 100%;
  width: 80%;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  margin: 0 10%;
`;

export const HeadFrame = styled(BasicFrame)`
  border: solid blue 3px;
  flex-direction: column;
  width: 100%;
  /* height: 200px; */
  /* margin: 0 10%; */
`;

export const BodyFrame = styled(BasicFrame)`
  border: solid orange 3px;
  flex-direction: row;
  width: 100%;
  height: auto;
  justify-content: space-around;
`;

export const StocksFrame = styled(BasicFrame)`
  border: solid green 3px;
  flex-direction: row;
  flex-wrap: wrap;
  width: 48%;
  height: auto;
  background-color: #f0f0f0;
  padding: 1%;
`;

export const GraphFrame = styled(BasicFrame)`
  border: solid purple 3px;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #f0f0f0;
  width: 50%;
`;
