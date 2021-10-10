import React, { Component } from "react";
import HueAuthPanel from "./HueAuthPanel";
import { asyncRequest } from "../Helpers/AsyncRequest";

class DiscoveredDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authPanel: false,
      authenticated: false,
    };
  }

  renderAuthPanel = () => {
    if (this.state.authPanel) {
      return (
      <HueAuthPanel 
        key={this.props.device.uuid} 
        device={this.props.device} 
        panelVisibility={this.toggleAuthPanel} 
        handleAuth = {this.handleAuthentication} />
        );
    }
  };

  toggleAuthPanel = (state) => {
    this.setState({ authPanel: state });
  };

  handleAuthentication =()=>{
    this.setState({authenticated: true})
  }

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
            <button onClick={() => this.toggleAuthPanel(true)}>Connect</button>
          </li>
        </ul>
        {this.state.authenticated ? "Connected" : "Not Connected"}
        {this.renderAuthPanel()}
      </React.Fragment>
    );
  }
}

export default DiscoveredDevice;
