import ProfileScreen from "./index";
import SuperScreen from "./superadmin";

const routes = [
  {
    path: "/profile",
    element: ProfileScreen,
  },
  {
    path: "/superadmin",
    element: SuperScreen,
  },
];

export default routes;
