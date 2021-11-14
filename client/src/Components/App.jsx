import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { asyncRequest } from "../Helpers/AsyncRequest";
import Settings from "./Settings";
import DeviceSettings from "./DeviceSettings";
import NewDevice from "./NewDevice";
import HueConfig from "./HueConfig";
import Dashboard from "./Dashboard";
import test from "./test";

class App extends Component {
  state = {
    apiConnection: false,
    bridgeConnection: false,
  };

  componentDidMount() {
    asyncRequest("/express")
      .then((res) => this.setState({ apiConnection: res.express }))
      .catch((err) => console.log("ERROR: ", err));
  }

  handleConnectionStatus = () => {
    if (this.state.apiConnection) {
      return "Connected";
    } else {
      return "Disconnected";
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.handleConnectionStatus()}
        <div>
          <Link to={"/"}>Dashboard</Link>
          <Link to={"/settings"}>Settings</Link>
        </div>

        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/settings" component={Settings} />
          <Route path="/devices/hueConfig" component={HueConfig} />
          <Route path="/devices/new" component={NewDevice} />
          <Route path="/devices" component={DeviceSettings} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
