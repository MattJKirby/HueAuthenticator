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

    app.post('/hueConfig/connect', (req) =>{
        const device = deviceContainer.checkForDevice(req.body.uuid)
        
      authenticateNewUser(device)
        .then(res =>{
            
            if (Object.keys(res.data[0])[0] === 'success'){
                
            } else {

            }
            
        })      
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

    registerBridge = () =>{
        console.log("true")
    }

    

    app.post('/hueConfigIP', (req, res) => {
        hueBridgeIP = req.body.bridgeIP
        asyncRequest(hueBridgeIP, "/api", 443, 'GET', 5000).then((req) => {
            console.log(req.body)
        })
    })
}



