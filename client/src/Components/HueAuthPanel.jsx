import React, { Component } from "react";

class HueAuthPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authResponse: null,
    };
  }

  makeConnectionRequest = () => {
    fetch("/hueConfig/connect", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uuid: this.props.device.uuid,
      }),
    }).then((res) => {
      res.json().then((res) => {
        this.setState({ authResponse: res.result }, () =>{
          if(this.state.authResponse.result){
            this.props.handleAuth()
            this.props.panelVisibility(false)
         
          }
        });
        
      });
    });
  };

  handleAuthenticationResult = () => {
    if (this.state.authResponse && this.state.authResponse.message) {
      return `Could not connect: ${this.state.authResponse.message}`
    }
  };

  render() {
    return (
      <div>
        <button onClick={() => this.props.panelVisibility(false)}>Back</button>
        <ol>
          <li>
            <p>Click the button on the Hue Bridge</p>
          </li>
          <p>{this.handleAuthenticationResult()}</p>
          <li>
            <button onClick={this.makeConnectionRequest}>
            {this.state.authResponse && this.state.authResponse.message? "Try again" : "Next"}
            </button>
          </li>
        </ol>
      </div>
    );
  }
}

export default HueAuthPanel;
