import React, { Component } from "react";
import { asyncRequest, restRequest } from "../Helpers/AsyncRequest";

class DeviceSetupOption extends Component {
  state = {};

  

  render() {
    return (
      <React.Fragment>
        <ul>
          <li>{this.props.device.deviceType.type}</li>
        </ul>
      </React.Fragment>
    );
  }
}

export default DeviceSetupOption;
