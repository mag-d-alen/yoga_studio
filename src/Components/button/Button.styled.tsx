import styled from "styled-components";

export const ButtonWrapper = styled.button`
  display: flex;
  padding: 1rem;
  justify-content: center;
  border-radius: 0.3rem;
  border: none;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  max-width: fit-content;
  margin: 0.5rem auto 0.5rem auto;
  min-width: 10rem;

  :hover {
    box-shadow: 6px 6px 10px 6px rgba(0, 0, 0, 0.3);
    background-color: #ffffff43;
    color: white;
  }
`;
export const CloseButtonWrapper = styled.button`
  display: flex;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 0.2px solid darkgreen;
  text-transform: uppercase;
  width: 2.1rem;
  height: 2rem;
  color: darkgreen;
  margin: 0.5rem 0 0.5rem auto;
  :hover {
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3);
    background-color: #ffffff43;
    color: white;
  }
`;
