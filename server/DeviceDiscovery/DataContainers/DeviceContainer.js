class DeviceContainer{
    constructor(){
        this.devices = []
    }

    storeDevice(newDevice){
        if(this.checkForDevice(newDevice.uuid) === false){
            this.devices.push(newDevice)
        }   
    }

    checkForDevice(uuid){
        const exisingDevices = this.devices.find((device) =>{
            if(device.uuid === uuid){
                return true
            }
            return false
        })
        return exisingDevices || false
    }
}

module.exports = DeviceContainer