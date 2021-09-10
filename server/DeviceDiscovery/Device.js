const LocationDataContainer = require('./DataContainers/LocationDataContainer');
const asyncRequest = require('../asyncRequest');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class Device {
    constructor(uuid, locationUrl, type){
        this.uuid = uuid;
        this.type = type;
        this.location = this.initialiseLocationDataContainer(locationUrl);
        
        this.requestLocationData(this.location.hostname, this.location.path);
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

    requestLocationData = (hostname, path) =>{
        asyncRequest(hostname, path, 443, 'GET', 5000).then((req) => {
            this.location.setData(new JSDOM(req.body),this.type.locationXmlTags);
        }).catch((err) =>{
            console.log(`Error requesting location data: ${err}`)
        });
    }

    

    

}
module.exports = Device;