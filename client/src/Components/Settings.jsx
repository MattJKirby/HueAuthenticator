import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, useRouteMatch } from "react-router-dom";
import HueConfig from "./HueConfig";

class Settings extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <div>Settings</div>
        <Link to={`/devices`}>Devices</Link>
      </React.Fragment>
    );
  }
}

export default Settings;
