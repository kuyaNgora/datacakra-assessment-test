import React, { ReactNode } from "react";
import Login from "./login";
import Header from "./header";

// Define the types for the Layout props
interface LayoutProps {
  children: ReactNode; // children can be any valid React element(s)
  className?: string; // className is optional
}

// Extend React.FC to allow static properties
interface LayoutWithStatic extends React.FC<LayoutProps> {
  Login: typeof Login;
  Header: typeof Header;
}

const Layout: LayoutWithStatic = ({ children, className }) => {
  const sx = `wrapper ${className ? className : ""}`;
  return <div className={sx}>{children}</div>;
};

Layout.Login = Login;
Layout.Header = Header;

export default Layout;
