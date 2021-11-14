const HueBridgeDeviceType = require ('../DeviceDiscovery/DeviceTypes/HueBridgeDevice')

const registeredDeviceTypes = {HueBridgeDeviceType : ""}

module.exports = function(app){
    app.get('/getDeviceTypeRegister', (req, res) => {
        console.log("getting registered devices")
        res.send({register: registeredDeviceTypes})   
    })
}