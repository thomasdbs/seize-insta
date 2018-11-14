import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Quote from "./pages/Quote";
import Picture from "./pages/Picture";

const Root = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Quote} />
        <Route exact path="/photo" component={Picture} />
        <Route component={Picture} />
      </Switch>
    </HashRouter>
  );
};

export default Root;
