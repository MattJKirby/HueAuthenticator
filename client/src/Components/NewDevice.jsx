import React, { Component } from "react";
import { asyncRequest, restRequest } from "../Helpers/AsyncRequest";

class NewDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "waiting",
      deviceRegister: [],
    };
  }

  componentDidMount = () => {
    this.requestDeviceList();
  };

  requestDeviceList = () => {
    asyncRequest("/getDeviceTypeRegister")
      .then((res) => {
        console.log(res.register);
        this.setState({ deviceRgister: res.register });
      })
      .catch((err) => console.log("Server Error: ", err));
  };

  render() {
    return <React.Fragment>TEST{this.state.deviceRegister}</React.Fragment>;
  }
}

export default NewDevice;
