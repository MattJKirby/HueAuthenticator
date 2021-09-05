const DeviceType = require('../DeviceType');

class HueBridgeDeviceType extends DeviceType {
    constructor() {
        super();
        this.name = "Phillips Hue Bridge";
        this.packetDescriptors = {'hue-bridgeid': null};
        this.locationDataXMLTags = {name: "friendlyName", manufacturer: "manufacturer", description : "modelDescription", url: "modelURL", modelNumber: "modelNumber", serialNumber: "serialNumber"}
        this.packetConfig = Object.freeze({target: "phillips_hue:bridge", defaultIp: '239.255.255.250', defaultPort: 1900}) 
    }
}
module.exports = HueBridgeDeviceType