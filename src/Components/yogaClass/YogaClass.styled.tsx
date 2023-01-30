import styled from "styled-components";
export const YogaClassContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem;
  width: 30%;
  background-color: #ffffff34;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3);
  :hover {
    box-shadow: 6px 6px 10px 6px rgba(0, 0, 0, 0.3);
  }
`;
export const YogaClassDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #3a3830;
  margin: 1rem;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3);
  height: 100%;
  width: 75%;
  position: absolute;
  top: 0;
  :hover {
    box-shadow: 6px 6px 10px 6px rgba(0, 0, 0, 0.3);
  }
`;
