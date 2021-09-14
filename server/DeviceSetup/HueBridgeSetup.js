const HueBridgeDeviceType = require('../DeviceDiscovery/DeviceTypes/HueBridgeDevice');
const DeviceDiscoveryManager = require('../DeviceDiscovery/DeviceDiscoveryManager')
const DeviceContainer = require("../DeviceDiscovery/DataContainers/DeviceContainer")

let hue = new HueBridgeDeviceType();
let deviceContainer = new DeviceContainer()
let discoveryManager = new DeviceDiscoveryManager();

module.exports = function (app, asyncRequest) {
    app.get('/hueConfig', (req, res) => {
        
            
        discoveryManager.asyncDeviceDiscover(hue).then((discoveredDevices) =>{
            
            if(discoveredDevices.length > 0){
                discoveredDevices.forEach(device => {
                    deviceContainer.storeDevice(device)  
                    
                });
            }
            res.send({devices: deviceContainer.devices})
          
        }).catch((err) =>{
            console.log(err)
        })
    })

    app.post('/hueConfigIP', (req, res) => {
        hueBridgeIP = req.body.bridgeIP
        asyncRequest(hueBridgeIP, "/api", 443, 'GET', 5000).then((req) => {
            console.log(req.body)
        })
    })
}



