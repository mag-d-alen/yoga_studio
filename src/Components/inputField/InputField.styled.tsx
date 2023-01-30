import styled from "styled-components";

export const InputField = styled.input`
  padding: 0.5rem;
  margin: 0.3rem;
  text-transform: upperCase;
  background-color: #ffffff89;
  color:white;
  border-color:white;
  border-radius: 0.3rem;
  outline: white;

  :focus,
  :active {
    background-color: #0c620c18;
    outline: white
    color: white;
  }
`;
