
class DeviceType {
    constructor() {
        this.packetDataKeys = {uuid : 'ST', location : 'LOCATION'}
        this.locationXmlTags = {}
    }

    populateLocationXmlTags(name,manufacturer,description, url, model, serial){
        return {name: name, manufacturer: manufacturer, description: description, url: url, model: model, serial: serial} 
    }


}

module.exports = DeviceType;