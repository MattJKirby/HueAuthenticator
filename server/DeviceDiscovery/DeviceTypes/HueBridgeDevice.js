const DeviceType = require('./DeviceType');
const LocationTagDataContainer = require('../DataContainers/LocationTagDataContainer');

class HueBridgeDeviceType extends DeviceType {
    constructor() {
        super();
        this.name = "Phillips Hue Bridge";
        this.packetDescriptors = {'hue-bridgeid': null};
        this.locationTagData = LocationTagDataContainer("friendlyName", "manufacturer", "modelDescription", "modelURL", "modelNumber", "serialNumber")
        this.packetConfig = Object.freeze({target: "phillips_hue:bridge", defaultIp: '239.255.255.250', defaultPort: 1900}) 
    }
}
module.exports = HueBridgeDeviceType