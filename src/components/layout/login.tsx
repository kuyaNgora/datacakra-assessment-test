import React, { ReactNode } from "react";
import "./styles.css";

interface LoginProps {
  children?: ReactNode;
}

const Login: React.FC<LoginProps> = ({ children }) => {
  return (
    <div className="layout-login">
      <div className="layout-form-container">
        <div className="layout-form-content">{children}</div>
      </div>
    </div>
  );
};

export default Login;
