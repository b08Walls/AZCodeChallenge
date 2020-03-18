import React from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
export const SearchBarFrame = styled.div`
  display: flex;
  background-color: ${props => props.theme.headerBarColor};
  flex-direction: row-reverse;
  align-items: center;
  width: 100%;
  height: 80px;
`;

export const SearchTextField = styled.input`
  margin: 0 15px;
  border-radius: 5px;
  flex-grow: 8;
  padding: 15px;
  height: 20px;
  background-color: rgba(0, 0, 100, 0.1);
  border: none;
  font-size: 20px;
  /* border: solid 2px #0f0f0f; */
  border-bottom: solid 2px black;
`;

export const SearchButtonFrame = styled.div`
  /* margin: 100px 15px; */
  margin-right: 20px;
  /* padding: 5px; */
`;

export const SearchBarTitle = styled.p`
  margin: 0 15px;
  font-size: 30px;
`;
