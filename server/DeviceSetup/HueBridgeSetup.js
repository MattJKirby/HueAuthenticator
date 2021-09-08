const hueBridgeDeviceType = require('../DeviceDiscovery/DeviceTypes/HueBridgeDevice');
const DeviceDiscoveryManager = require('../DeviceDiscovery/DeviceDiscoveryManager')

module.exports = function (app, asyncRequest) {
    app.get('/hueConfig', (req, res) => {
        console.log("loaded")
        let hue = new hueBridgeDeviceType();
        let discoveryManager = new DeviceDiscoveryManager();

        discoveryManager.asyncDeviceDiscover(hue).then((foundDevices) =>{
            if(foundDevices.length > 0){
                res.send({devices: foundDevices})
            }
        }).catch((err) =>{
            console.log(err, "AAA")
        });

    })

    app.post('/hueConfigIP', (req, res) => {
        hueBridgeIP = req.body.bridgeIP
        asyncRequest(hueBridgeIP, "/api", 443, 'GET', 5000).then((req) => {
            console.log(req.body)
        })
    })
}



