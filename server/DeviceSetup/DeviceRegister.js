const HueBridgeDeviceType = require ('../DeviceDiscovery/DeviceTypes/HueBridgeDevice')

const registeredDeviceTypes = [new HueBridgeDeviceType];

module.exports = function(app){
    app.get('/getDeviceTypeRegister', (req, res) => {
        res.send({register: registeredDeviceTypes})   
    })
}