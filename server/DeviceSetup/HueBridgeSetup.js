const axios = require('axios');

const HueBridgeDeviceType = require('../DeviceDiscovery/DeviceTypes/HueBridgeDevice');
const DeviceDiscoveryManager = require('../DeviceDiscovery/DeviceDiscoveryManager')
const DeviceContainer = require("../DeviceDiscovery/DataContainers/DeviceContainer")

let hue = new HueBridgeDeviceType();
let deviceContainer = new DeviceContainer()
let discoveryManager = new DeviceDiscoveryManager();

module.exports = function (app, asyncRequest) {
    app.get('/hueConfig', (req, res) => {
            
        discoveryManager.asyncDeviceDiscover(hue).then((discoveredDevices) =>{
            discoveredDevices.forEach(device => {
                deviceContainer.storeDevice(device)  
            });
            res.send({devices: deviceContainer.devices})
        }).catch((err) =>{
            console.log(err)
        })
    })

    app.post('/hueConfig/connect', (req,res) =>{
        const device = deviceContainer.checkForDevice(req.body.uuid)
        const authResult = {uuid: device.uuid, result: false, message: null}
      
        authenticateNewUser(device)
        .then(authRes =>{
            const result = Object.keys(authRes.data[0])[0];
            if (result === 'success'){
                authResult.result = true;
                device.authenticated = true;
                console.log(device)
            }
            authResult.message = authRes.data[0][result].description
        }).finally(() => {
            res.send({result: authResult})
        });
        
        
    })

    authenticateNewUser = async (device) =>{
        const connectData = {devicetype: `user`}
        if(device != null){
            try{
                return await axios.post(`https://${device.location.hostname}/api`,connectData)
            } catch (err){
                console.log(err)
            }
        }
    }


    app.post('/hueConfigIP', (req, res) => {
        hueBridgeIP = req.body.bridgeIP
        asyncRequest(hueBridgeIP, "/api", 443, 'GET', 5000).then((req) => {
            console.log(req.body)
        })
    })
}



