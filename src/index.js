import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NotificationsProvider } from "@mantine/notifications";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Auth from "layouts/Auth.js";
import AdminRouter from "views/admin/index.js";
import Driver from "views/driver/Driver.js";

// views without layouts

import DriverInfo from "views/admin/DriverInfo.js";
import Start from "views/admin/Start.js";
import Login from "views/auth/Login";

ReactDOM.render(
  <NotificationsProvider position="top-right" zIndex={2077}>
    <BrowserRouter>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={Login} testProp="testProp" />
        <Route path="/driver/:id" component={Driver} />
        <Route exact path="/admin/:id/start" component={Start} />
        <Route exact path="/admin/:id/:page" component={AdminRouter} />
        <Route path="/admin/:id/driver/:dId" component={DriverInfo} />
      </Switch>
    </BrowserRouter>
  </NotificationsProvider>,
  document.getElementById("root")
);
