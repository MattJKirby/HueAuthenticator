const asyncRequest = require('../../asyncRequest');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


class LocationDataContainer {
    constructor(hostname, path, deviceType){
        this.hostname = hostname
        this.path = path
        this.deviceType = deviceType
        this.data = this.requestLocationData(this.hostname, this.path) 
         
    }

    requestLocationData = (hostname, path) =>{
        asyncRequest(hostname, path, 443, 'GET', 5000).then((req) => {
            return this.setLocationData(new JSDOM(req.body));
            
        }).catch(() =>{

        });
    }

    setLocationData = (xmlDom) =>{
        retreivedData = {}
        for (const key in this.deviceType.locationXmlTags){
            const value = this.deviceType.locationXmlTags[key];
            console.log(xmlDom.window.document.querySelector(value).textContent);
            retreivedData[key] = value
        }
        return retreivedData
    }

   

}

module.exports = LocationDataContainer