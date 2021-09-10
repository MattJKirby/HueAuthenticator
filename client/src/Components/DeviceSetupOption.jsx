import React, { Component } from "react";
import { asyncRequest, restRequest } from "../Helpers/AsyncRequest";

class DeviceSetupOption extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        {console.log(this.props.device)}
        <ul>
          <li>{this.props.device.type.name}</li>
          <li>{this.props.device.location.path}</li>
        </ul>
      </React.Fragment>
    );
  }
}

export default DeviceSetupOption;
