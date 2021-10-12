import React, { Component } from "react";
import HueAuthPanel from "./HueAuthPanel";
import { asyncRequest } from "../Helpers/AsyncRequest";

class DiscoveredDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authPanel: false,
      authenticated: this.props.device.authenticated,
    };
  }

  renderAuthAction = () =>{
    if(!this.state.authenticated){
      return(
        <button onClick={() => this.toggleAuthPanel(true)}>Connect</button>
      )
    }
  }

  renderAuthPanel = () => {
    if (this.state.authPanel && !this.state.authenticated) {
      return (
        <HueAuthPanel key={this.props.device.uuid} device={this.props.device} panelVisibility={this.toggleAuthPanel} handleAuth={this.handleAuthentication} />
      );
    }
  };

  toggleAuthPanel = (state) => {
    if(!this.state.authenticated){
      this.setState({ authPanel: state });
    }
  };

  handleAuthentication = () => {
    this.setState({ authenticated: true });
  };

  render() {
    return (
      <React.Fragment>
        <ul>
          <li>{this.props.device.type.name}</li>
          <li>{this.props.device.location.hostname}</li>
          <li>{this.renderAuthAction()}</li>
          <li>{this.state.authenticated ? "Connected" : "Not Connected"}</li>
        </ul>

        {this.renderAuthPanel()}
      </React.Fragment>
    );
  }
}

export default DiscoveredDevice;
