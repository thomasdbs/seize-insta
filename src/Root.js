import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Quote from "./pages/Quote";
import Picture from "./pages/Picture";

const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Quote} />
        <Route exact path="/photo" component={Picture} />
        <Route component={Quote} />
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
