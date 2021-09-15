import React, { Component } from "react";
import { asyncRequest } from "../Helpers/AsyncRequest";

class DiscoveredDevice extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        {console.log(this.props.device)}
        <ul>
          <li>{this.props.device.type.name}</li>
          <li>{this.props.device.location.hostname}</li>
          <li><button>Info</button></li>
          <li><button>Connect</button></li>
        </ul>
      </React.Fragment>
    );
  }
}

export default DiscoveredDevice;
