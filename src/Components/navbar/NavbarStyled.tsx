import styled from "styled-components";

export const NavbarContainer = styled.div`
  font-family: "Lato", sans-serif;
  display: flex;
  padding: 1rem;
  justify-content: space-around;
  align-items: center;
  text-transform: upperCase;
  height: 2rem;
  a {
    text-align: center;
    padding:0.5rem;
    border-radius:0.3rem;
    width: 10rem;
    text-decoration: none;
    color: white;
    :hover {
      background-color: #ffffff43;
    }
  }
`;
