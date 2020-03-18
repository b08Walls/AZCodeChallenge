import React from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";

export const StockPaper = styled(Paper)`
  text-align: center;
  padding: 10px;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
`;
export const TitlePaper = styled(Paper)`
  text-align: center;
  padding: 10px;
  width: calc(100% - 20px);
  height: auto;
  margin-bottom: 20px;
`;

export const P = styled.p`
  color: white;
`;

export const H3 = styled.h3`
  color: white;
`;
export const H2 = styled.h2`
  color: white;
`;

export const A = styled.a`
  color: white;
`;

export const StockElementHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  width: calc(100%-10px);
  padding: 0 10px;
`;
