import React, { Component } from "react";
import { asyncRequest } from "../Helpers/AsyncRequest";

class DiscoveredDevice extends Component {
  state = {};

  makeConnectionRequest = () => {
    console.log(this.props.device);
    fetch("/hueConfig/connect", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uuid: this.props.device.uuid,
      }),
    });
  };

  render() {
    return (
      <React.Fragment>
        {console.log(this.props.device)}
        <ul>
          <li>{this.props.device.type.name}</li>
          <li>{this.props.device.location.hostname}</li>
          <li>
            <button>Info</button>
          </li>
          <li>
            <button onClick={this.makeConnectionRequest}>Connect</button>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default DiscoveredDevice;
