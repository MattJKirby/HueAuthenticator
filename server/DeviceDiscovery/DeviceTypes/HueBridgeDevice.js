const GenericDeviceType = require('../GenericDeviceType');

class HueBridgeDeviceType extends GenericDeviceType {
    constructor() {
        super();
        this.type = "Phillips Hue Bridge";
        this.packetDescriptors = {'hue-bridgeid': null};
        this.config = Object.freeze({
            target: "phillips_hue:bridge",
            defaultIp: '239.255.255.250',
            defaultPort: 1900,
        }) 
    }
}
module.exports = HueBridgeDeviceType