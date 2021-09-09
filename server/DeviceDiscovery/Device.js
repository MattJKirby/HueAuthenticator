const LocationDataContainer = require('./DataContainers/LocationDataContainer');


class Device {
    constructor(uuid, locationUrl, type){
        this.uuid = uuid;
        this.type = type;
        this.location = this.initialiseLocationDataContainer(locationUrl, type);
     
 
    }

    initialiseLocationDataContainer(locationUrl, deviceType){
        let locationMap = this.parseLocationUrl(locationUrl)
        return new LocationDataContainer(locationMap.hostname, locationMap.path, deviceType)
    }

    parseLocationUrl = (url) =>{
        let hostname = url.substring(url.indexOf("//") + 2, url.lastIndexOf(":"));
        let path = url.slice(url.lastIndexOf("/", url.length));
        return { hostname: hostname, path: path }
    }

    

}
module.exports = Device;