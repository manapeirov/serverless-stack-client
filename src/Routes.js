import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import Notes from "./containers/Notes";
import Settings from "./containers/Settings";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnathenticatedRoute from "./components/UnathenticatedRoute";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <UnathenticatedRoute exact path="/login" component={Login} />
      <UnathenticatedRoute exact path="/signup" component={Signup} />
      <AuthenticatedRoute exact path="/notes/new" component={NewNote} />
      <AuthenticatedRoute exact path="/notes/:id" component={Notes} />
      <Route exact path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}
