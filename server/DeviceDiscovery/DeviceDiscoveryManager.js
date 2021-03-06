var dgram = require('dgram');
const DeviceBuilder = require('../Builders/DeviceBuilder');

class DeviceDiscoveryManager {
    constructor() {
        this.devices = [];
        this.config = Object.freeze({
            sourceIp: "0.0.0.0",
            sourcePort: 1901
        });
    }

    /*
    * Sends an SSDP message via socket.
    */
    broadcastSSDP = (socket, ip, port, target) => {
        const query = Buffer.from('M-SEARCH * HTTP/1.1\r\n'
            + `HOST: ${ip}:${port}\r\n`
            + 'MAN: "ssdp:discover"\r\n'
            + 'MX: 1\r\n'
            + `ST: ${target}\r\n\r\n`,
        );
        socket.send(query, 0, query.length, port, ip);
    };

    /*
    * Scan for local devices using SSDP protocol
    */
    networkScanForDevice = (deviceType) => {
        return new Promise((resolve,reject) => {
            this.devices = []
            const deviceBuilder = new DeviceBuilder();
            const socket = dgram.createSocket({type:'udp4', reuseAddr: true});
            const config = deviceType.packetConfig;
            
            socket.bind(this.config.sourcePort, this.config.sourceIp);

            // On socket start, broadcast discovery request packet
            socket.on('listening', () => {
                this.broadcastSSDP(socket, config.defaultIp, config.defaultPort, config.target);
            });

            // Parse response message from packet discovery
            socket.on('message', (chunk, info) => {
                const buffer = Buffer.from(chunk);
                const response = buffer.toString().trim().split('\r\n');
                const deviceChecked = this.deviceTypeChecker(response,deviceType);
                
                if (deviceChecked){
                    const result = this.retrievePacketData(response,deviceType);

                    if(this.devices.filter(d => d.uuid === result.uuid).length === 0){ 
                        deviceBuilder.build(result.uuid, result.location, deviceType).then((device) =>{
                            this.devices.push(device)
                        }).catch(() =>{
                            console.log("Error building device")
                        }).finally(() =>{
                            socket.close();
                        })
                    }
                     
                } 
            })

            socket.on("close", () =>{
                if(this.devices.length > 0){
                    resolve(this.devices)
                } else {
                    reject("No devices found")
                }
            })
        });
    }

    /*
     * Async discover devices on network using SSDP protocol
     */
    asyncDeviceDiscover = async (deviceType) => {
        return await this.networkScanForDevice(deviceType)
            .catch(error => {
                console.log(`Async request failed: ${error}`);
            });
    }

    /*
     * Verifies that a packet has come from the correct source device
     */
    deviceTypeChecker = (ssdpResponse, deviceType) =>{
        let typeMatch, validUid = false
        const response = ssdpResponse.find((item) => {
            const kvSplit = item.indexOf(":");
            const key = item.slice(0,kvSplit);
            const value = item.slice(kvSplit + 2);
            
            if(value.match(deviceType.packetDescriptors[key])){
                typeMatch = true;
            }

            if(key === deviceType.packetDataKeys.uuid && value.slice(0,4) === 'uuid'){
                validUid = true
            }

            if(typeMatch && validUid){
                return true
            }
            return false
        });

        return response || false;
    }

    /*
     * Obtains the required data from the correct response packet
     */
    retrievePacketData = (response, deviceType) =>{
        const result = { uuid: null, location: null, type: deviceType };

        response.forEach((item) =>{
            const hvSplit = item.indexOf(":");
            if (hvSplit > -1){
                const header = item.slice(0,hvSplit);
                const value = item.slice(hvSplit + 2, item.length);

                const dataItem = Object.keys(deviceType.packetDataKeys).find(key => deviceType.packetDataKeys[key] === header);
                if(dataItem !== undefined){
                    result[dataItem] = value
                }
            }
        })
        return result;
    }
    
}

module.exports = DeviceDiscoveryManager