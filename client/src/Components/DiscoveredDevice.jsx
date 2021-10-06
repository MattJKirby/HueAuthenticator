import React, { Component } from "react";
import HueAuthInstructionPanel from "./HueAuthInstructonPanel";
import { asyncRequest } from "../Helpers/AsyncRequest";

class DiscoveredDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authInstructions: false,
    };
  }

  renderInstructionPanel = () => {
    if (this.state.authInstructions) {
      return <HueAuthInstructionPanel device={this.props.device} panelVisibility={this.toggleInstructionPanel}/>;
    }
  };

  toggleInstructionPanel = (state) => {
    this.setState({ authInstructions: state });
  };

  render() {
    return (
      <React.Fragment>
        <ul>
          <li>{this.props.device.type.name}</li>
          <li>{this.props.device.location.hostname}</li>
          <li>
            <button>Info</button>
          </li>
          <li>
            <button onClick={() => this.toggleInstructionPanel(true)}>Connect</button>
          </li>
        </ul>
        {this.renderInstructionPanel()}
      </React.Fragment>
    );
  }
}

export default DiscoveredDevice;
