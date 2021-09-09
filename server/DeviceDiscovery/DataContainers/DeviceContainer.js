class DeviceContainer{
    constructor(){
        this.devices = []
    }

    storeDevice(newDevice){
        this.devices.push(newDevice)
    }
}

module.exports = DeviceContainer