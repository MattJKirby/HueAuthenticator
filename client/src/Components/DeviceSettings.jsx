import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, useRouteMatch } from "react-router-dom";

class DeviceSettings extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Devices</h1>
        <Link to={`/devices/new`}>Configure New Device</Link>
        <Link to={`/devices/hueConfig`}>Configure Phillips Hue</Link>
      </React.Fragment>
    );
  }
}

export default DeviceSettings;
