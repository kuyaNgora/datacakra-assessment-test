import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../services/auth/slice";
import { RootState } from "../../services/store";

interface MenuProps {
  className?: string; // className is optional
}

const ProfileMenu: React.FC<MenuProps> = ({ className }) => {
  const data = useSelector((state: RootState) => state?.Auth?.data);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar online placeholder"
      >
        <div className="bg-neutral text-neutral-content w-16 rounded-full">
          <span className="text-xl font-normal uppercase">
            {data?.user?.username[0]}
          </span>
        </div>
      </div>

      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        <li onClick={() => Navigate("/profile")}>
          <div className="justify-between">Profile</div>
        </li>
        <li onClick={() => Navigate("/superadmin")}>
          <div>Superadmin</div>
        </li>
        <li onClick={() => handleLogout()}>
          <div>Logout</div>
        </li>
      </ul>
    </div>
  );
};

export default ProfileMenu;
