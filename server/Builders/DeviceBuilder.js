const Device = require("../DeviceDiscovery/Device");

class DeviceBuilder{
    constructor(){

    }


    static async build (uuid, locationUrl, type) {
        const newDevice = new Device(uuid, locationUrl, type);
        await newDevice.requestLocationData();
        return newDevice;
    }
}

module.exports = DeviceBuilder