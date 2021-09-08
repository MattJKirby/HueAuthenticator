const asyncRequest = require('../asyncRequest');
const LocationDataContainer = require('./DataContainers/LocationDataContainer');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


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

    requestLocationData = () =>{
        asyncRequest(this.location.hostname, this.location.path, 443, 'GET', 5000).then((req) => {
            const dom = new JSDOM(req.body); 
           
            this.setLocationData(dom)
            
        }).catch(() =>{

        });
    }

    setLocationData = (xmlDom) =>{
        console.log(xmlDom.window.document)
        onsole.log(this.type)
        this.type.location.xmlTags.values().forEach((tag) =>{
            
            console.log(xmlDom.window.document.querySelector(tag))
        })
    }

}
module.exports = Device;