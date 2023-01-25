import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "views/admin/Admin.js";
import Driver from "views/driver/Driver.js"
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Login from "views/auth/Login";
import Start from "views/admin/Start.js"
import GlobalContextProvider from "context/gobalContext.js";

ReactDOM.render(
  <GlobalContextProvider>
    <BrowserRouter>
      <Switch>
        {/* <Route path="/admin" component={Admin} /> */}
        <Route exact path="/admin/start" component={Start}/>
        <Route path="/auth" component={Auth} />
        <Route path="/landing" exact component={Landing} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/" exact component={Login} testProp="testProp"/>
        {
          [...Array(1000).keys()].map((userId) => <Route exact path={"/driver/"+userId.toString()} render={(props) => <Driver role="driver" userId={userId}/>}/>)
        }
        {
          [...Array(1000).keys()].map((userId) => <Route exact path={"/admin/"+userId.toString()} component={() => <Admin role="admin" userId={userId}/>}/>)
        }
      </Switch>
    </BrowserRouter>
  </GlobalContextProvider>,
  document.getElementById("root")
);
