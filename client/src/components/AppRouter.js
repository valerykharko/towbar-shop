import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { authRotes, publicRoutes } from "../routes";
import { SHOP_ROUTE } from "../utils/const";
import { Context } from "../index";

const AppRouter = () => {
  const { user } = useContext(Context);
  return (
    <Switch>
      {user.isAdmin === true &&
        authRotes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      <Redirect to={SHOP_ROUTE} />
    </Switch>
  );
};

export default AppRouter;
