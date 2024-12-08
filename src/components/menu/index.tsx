import React from "react";
import Navbar from "./navbar";
import ProfileMenu from "./profile";

// Define the types for the Layout props
interface MenuProps {
  className?: string; // className is optional
}

// Extend React.FC to allow static properties
interface MenuWithStatic extends React.FC<MenuProps> {
  Navbar: typeof Navbar;
  Profile: typeof ProfileMenu;
}

const Menu: MenuWithStatic = () => {
  return null;
};

// Attach subcomponents to the Menu component
Menu.Navbar = Navbar;
Menu.Profile = ProfileMenu;

export default Menu;
