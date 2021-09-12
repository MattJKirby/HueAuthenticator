const Device = require("../DeviceDiscovery/Device");

class DeviceBuilder{
    constructor(){

    }

    newDevice = async (uuid, locationUrl, type) =>{
        return new Device(uuid, locationUrl, type).build();
    }
}