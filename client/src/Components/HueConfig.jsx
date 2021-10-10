import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { asyncRequest, restRequest } from "../Helpers/AsyncRequest";
import DeviceSetupOption from "./DiscoveredDevice";

class HueConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discoveredDevices: [],
      status: "ready",
    };
  }

  componentDidMount = () => {
    this.makeDiscoveryRequest();
  };

  makeDiscoveryRequest = () => {
    this.setState({ status: "waiting" });
    asyncRequest("/hueConfig")
      .then((res) => {
        this.setState({ discoveredDevices: res.devices });
      })
      .catch((err) => console.log("Server Error: ", err))
      .finally(() => {
        let status = this.state.discoveredDevices.length > 0 ? "found" : "not found";
        this.setState({ status: status }, () => {
          this.handleDiscoveredDevices();
        });
      });
  };

  renderOnStatus = () => {
    switch (this.state.status) {
      case "waiting":
        return this.renderLoader();
      case "found":
        return this.handleDiscoveredDevices();
      default:
        return this.handleNotFound();
    }
  };

  handleDiscoveredDevices = () => {
    return (
      <div>
        {this.state.discoveredDevices.map((device) => (
          <DeviceSetupOption key={device.uuid} device={device} />
        ))}
      </div>
    );
  };

  handleNotFound = () => {
    return <div>No devices found</div>;
  };

  renderLoader = () => {
    return <div>Loading...</div>;
  };

  render() {
    return (
      <React.Fragment>
        <Link to={`/settings`}>Back</Link>
        <div>Configure Philips Hue Bridge</div>
        {this.renderOnStatus()}
      </React.Fragment>
    );
  }
}

export default HueConfig;
