const hueBridgeConfig = require('../DeviceDiscovery/DeviceTypes/HueBridgeDevice');
const DeviceDiscoveryManager = require('../DeviceDiscovery/DeviceDiscoveryManager')

module.exports = function (app, asyncRequest) {
    app.get('/hueConfig', (req, res) => {
        console.log("loaded")
        let hue = new hueBridgeConfig();
        let discoveryManager = new DeviceDiscoveryManager();

        discoveryManager.networkScanForDevice(hue).then((foundDevices) =>{
            console.log(foundDevices)
            console.log(foundDevices.length)
            
            if(foundDevices.length > 0){
                res.send({devices: foundDevices})
            }
        });

    })

    app.post('/hueConfigIP', (req, res) => {
        hueBridgeIP = req.body.bridgeIP
        asyncRequest(hueBridgeIP, "/api", 443, 'GET', 5000).then((req) => {
            console.log(req.body)
        })
    })
}



