import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Content from "../Content";
import LogIn from "../LogIn";
import Registration from "../Registration";

export default function Home() {
  return (
    <>
      <Router>
        <Route path="/" exact component={LogIn} />
        <Route path="/account" exact component={Content} />
        <Route path="/registration" exact component={Registration} />
      </Router>
      {/* helo123 */}
    </>
  );
}
