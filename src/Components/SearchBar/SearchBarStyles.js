import styled from "styled-components";

export const SearchBarFrame = styled.div`
  display: flex;
  background-color: ${props => props.theme.backgroundDefault};
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 80px;
  /* flex-wrap: wrap; */
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
  border-bottom: solid 2px white;
  @media (max-width: 760px) {
    font-size: 15px;
    flex-grew: 0;
    width: 100%;
  }
`;

export const SearchButtonFrame = styled.div`
  /* margin: 100px 15px; */
  margin-right: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 100px;
  /* padding: 5px; */
  @media (max-width: 760px) {
    margin-right: 0;
  }
`;

export const SearchBarTitle = styled.p`
  margin: 0 15px;
  font-size: 30px;
  @media (max-width: 760px) {
    font-size: 15px;
    margin: 0;
  }
`;
