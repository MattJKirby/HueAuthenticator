const Device = require("../DeviceDiscovery/Device");
const LocationDataContainer = require('../DeviceDiscovery/DataContainers/LocationDataContainer');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const asyncRequest = require('../asyncRequest');

class DeviceBuilder{
    constructor(){

    }

    initialiseLocationDataContainer(locationUrl){
        let locationMap = this.parseLocationUrl(locationUrl)
        return new LocationDataContainer(locationMap.hostname, locationMap.path)
    }

    parseLocationUrl = (url) =>{
        let hostname = url.substring(url.indexOf("//") + 2, url.lastIndexOf(":"));
        let path = url.slice(url.lastIndexOf("/", url.length));
        return { hostname: hostname, path: path }
    }

    requestLocationData = async (hostname, path) =>{
        const xmlDom = await asyncRequest(hostname, path, 443, 'GET', 5000).then((req) => {
            return new JSDOM(req.body);
        }).catch((err) =>{
            console.log(`Error requesting location data: ${err}`)
        });
        return xmlDom
    }

    build  = async (uuid, locationUrl, type) => {
        const locationDataContainer = this.initialiseLocationDataContainer(locationUrl)
        const locationData = await this.requestLocationData(locationDataContainer.hostname, locationDataContainer.path)
        locationDataContainer.setData(locationData, type.locationXmlTags);
        const newDevice = new Device(uuid, locationDataContainer, type);
        return newDevice;
    }
}

module.exports = DeviceBuilder