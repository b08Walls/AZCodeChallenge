import styled from "styled-components";
import AssessmentIcon from "@material-ui/icons/Assessment";
import Paper from "@material-ui/core/Paper";

export const TitlePaper = styled(Paper)`
  text-align: center;
  padding: 10px;
  width: calc(100% - 20px);
  height: auto;
  margin-bottom: 20px;
  @media (max-width: 760px) {
    font-size: 14px;
  }
`;

export const GridSvgCanvas = styled.div`
  display: flex;
  width: 100%;
  height: 500px;
`;

export const GraphPlaceHolder = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
  align-content: center;
  justify-content: space-around;
`;

export const GraphPlaceHolderTitle = styled.h2`
  text-align: center;
  color: white;
`;

export const GraphPlaceHolderImage = styled(AssessmentIcon)`
  color: #024574;
  display: flex;
  font-size: 300px !important;
  margin: auto;
  @media (max-width: 760px) {
    font-size: 200px !important;
  }
`;
