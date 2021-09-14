class DeviceContainer{
    constructor(){
        this.devices = []
    }

    storeDevice(newDevice){
        if(this.checkForDuplicateDevice(newDevice.uuid) === false){
            this.devices.push(newDevice)
        }   
    }

    checkForDuplicateDevice(uuid){
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