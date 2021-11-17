import React, { Component } from "react";
import { asyncRequest, restRequest } from "../Helpers/AsyncRequest";

class NewDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "loadingDeviceRegister",
      deviceRegister: [],
    };
  }

  componentDidMount = () => {
    this.requestDeviceList();
  };

  requestDeviceList = () => {
    asyncRequest("/getDeviceTypeRegister")
      .then((res) => {
        this.setState({ deviceRegister: res.register });
      })
      .catch((err) => console.log("Server Error: ", err))
      .finally(() => {
        this.setState({ status: this.state.deviceRegister.length > 0 ? "waitingTypeSelection" : "notFound" });
      });
  };

  renderDeviceList = () => {
    return (
      <div>
        Select device type:
        {this.state.deviceRegister.map((item, i) => (
          <li key={i}>{item.name}</li>
        ))}
      </div>
    );
  };

  renderOnStatus = () => {
    switch (this.state.status) {
      case "waitingTypeSelection":
        return this.renderDeviceList();
      default:
        return <div>LOADING</div>;
    }
  };

  render() {
    return <React.Fragment>{this.renderOnStatus()}</React.Fragment>;
  }
}

export default NewDevice;
