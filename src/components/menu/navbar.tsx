import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Define the types for the Layout props
interface NavbarProps {
  className?: string; // className is optional
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const clx = `menu ${className ? className : ""}`;

  const location = useLocation();
  const Navigate = useNavigate();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
    <ul className={clx}>
      <li>
        <div
          className={splitLocation[1] === "" ? "active cursor-pointer" : ""}
          onClick={() => Navigate("/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Dashboard
        </div>
      </li>
      <li>
        <div
          className={
            splitLocation[1] === "article" ? "active cursor-pointer" : ""
          }
          onClick={() => Navigate("/article")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Article
        </div>
      </li>
    </ul>
  );
};

export default Navbar;
