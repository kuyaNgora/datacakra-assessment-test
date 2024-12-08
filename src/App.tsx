import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./services/store";

import UnauthorizeRoute from "./screen/unauthorize/router";
import AuthorizedRouter from "./screen/authorize/router";

const App: React.FC = () => {
  // useSelector with type annotation for the Redux store's state
  const isAuthenticated = useSelector(
    (state: RootState) => state.Auth.isAuthenticated
  );

  return (
    <React.Fragment>
      {isAuthenticated ? <AuthorizedRouter /> : <UnauthorizeRoute />}
    </React.Fragment>
  );
};

export default App;
