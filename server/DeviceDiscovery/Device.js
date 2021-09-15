const LocationDataContainer = require('./DataContainers/LocationDataContainer');
const asyncRequest = require('../asyncRequest');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class Device {
    constructor(uuid, locationData, type){
        this.uuid = uuid;
        this.type = type;
        this.location = locationData
    }

}
module.exports = Device;