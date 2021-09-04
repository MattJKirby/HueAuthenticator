var dgram = require('dgram');
const Device = require('./Device');

class DeviceDiscoveryManager {
    constructor() {
        this.socket = dgram.createSocket({type:'udp4', reuseAddr: true});
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

            const config = deviceType.config;
            // On socket start, broadcast discovery request packet
            this.socket.on('listening', () => {
                this.broadcastSSDP(this.socket, config.defaultIp, config.defaultPort, config.target);
            });

            // Parse response message from discovery
            this.socket.on('message', (chunk, info) => {
                const result = { uuid: null, location: null, type: deviceType };
                const buffer = Buffer.from(chunk);
                const response = buffer.toString().trim().split('\r\n');

                const deviceChecked = this.deviceTypeChecker(response,deviceType);
                if (deviceChecked){
                    response.forEach((item) =>{
                        const hvSplit = item.indexOf(":");
                        if (hvSplit > -1){
                            const header = item.slice(0,hvSplit);
                            const value = item.slice(hvSplit + 2, item.length);

                            if(deviceType.dataKeys[header] !== undefined){
                                const dataItem = deviceType.dataKeys[header]
                                result[dataItem] = value 
                            }
                        }
                    })
                    if (result.uuid.slice(0,4) === 'uuid' && result.location) {
                        if(this.devices.filter(d => d.uuid === result.uuid).length === 0){
                            this.devices.push(new Device(result.uuid, result.location, deviceType));
                            this.socket.close();
                        }
                    }
                }
            })

            this.socket.on("close", () =>{
                if(this.devices.length > 0){
                    resolve(this.devices)
                } else {
                    reject("No devices found")
                }
            })

            this.socket.bind(this.config.sourcePort, this.config.sourceIp);
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
        const response = ssdpResponse.find((item) => {
            const kvSplit = item.indexOf(":");
            const key = item.slice(0,kvSplit);
       
            if(deviceType.packetDescriptors[key] !== undefined){
               return true;
            }
            return false 
        });
        return response || false;
    }

    
    
}

module.exports = DeviceDiscoveryManager