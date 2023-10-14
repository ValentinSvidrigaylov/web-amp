import { useState } from "react";

const Header = ({ title, ...props }) => {
    return (
      <header>{ title }</header>
    );
  };
  export default Header;