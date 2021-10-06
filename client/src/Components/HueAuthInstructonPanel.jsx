import React, { Component } from "react";

class HueAuthInstructonPanel extends React.Component {

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
    return <div>
        <ol>
            <li><p>Click the button on the Hue Bridge</p></li>
            <li><button onClick={this.makeConnectionRequest}>Connect</button></li>
        </ol>
        <button onClick={() => this.props.panelVisibility(false)}>Back</button>
       
    </div>;
  }
}

export default HueAuthInstructonPanel;
