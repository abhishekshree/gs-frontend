import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import AdminRouter from "views/admin/index.js";
import Driver from "views/driver/Driver.js"
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Login from "views/auth/Login";
import Start from "views/admin/Start.js"
import GlobalContextProvider from "context/gobalContext.js";
import Dashboard from "views/admin/AdminDashboard.js";

ReactDOM.render(
  <GlobalContextProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/landing" exact component={Landing} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/admin/dashboard" exact component={Dashboard} />
        <Route path="/" exact component={Login} testProp="testProp"/>
        <Route path="/driver/:id" component={Driver}/>
        <Route exact path="/admin/:id/start" component={Start}/>
        <Route exact path="/admin/:id" component={AdminRouter}/>
      </Switch>
    </BrowserRouter>
  </GlobalContextProvider>,
  document.getElementById("root")
);
