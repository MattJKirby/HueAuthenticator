const DeviceType = require('./DeviceType');

class HueBridgeDeviceType extends DeviceType {
    constructor() {
        super();
        this.name = "Phillips Hue Bridge";
        this.packetDescriptors = {'hue-bridgeid': null};
        this.locationXmlTags = this.populateLocationXmlTags("friendlyName", "manufacturer", "modelDescription", "modelURL", "modelNumber", "serialNumber");
        this.packetConfig = Object.freeze({target: "phillips_hue:bridge", defaultIp: '239.255.255.250', defaultPort: 1900}) 
    }
}
module.exports = HueBridgeDeviceType