import React from "react";
import { Link } from "react-router-dom";
import { NavbarContainer } from "./NavbarStyled";

export const Navbar = () => {
  return (
    <NavbarContainer>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/about_yoga">About Yoga</Link>
    </NavbarContainer>
  );
};
