import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginContainer from "../01CommonComponents/01Login/LoginContainer";

export default function AnonymousRoutes() {
  return (
    <Switch>
      <Route exact path="/login" component={LoginContainer} />
      <Route path="*">
        <Redirect to="/login" />
      </Route>
    </Switch>
  )
}