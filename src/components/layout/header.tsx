import React from "react";
import logo from "../../assets/logo.png";
import Menu from "../menu";

const Header: React.FC = () => {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-300">
          <div className="flex-none md:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 items-center justify-center md:!justify-start ">
            <div className="avatar cursor-pointer">
              <div className="w-10 rounded-xl">
                <img src={logo} alt="" />
              </div>
            </div>
          </div>

          <div className="flex-none">
            <div className="hidden me-3 md:!block">
              <Menu.Navbar className="menu-horizontal rounded-box space-x-2" />
            </div>

            <Menu.Profile />
          </div>
        </div>
      </div>

      <div className="drawer-side z-[99999]">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <Menu.Navbar className="min-h-full bg-base-200 w-80 p-4 space-y-3" />
        {/* <ul className="menu bg-base-200 min-h-full w-80 p-4">
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default Header;
