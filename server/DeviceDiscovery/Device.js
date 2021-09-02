let asyncRequest = require('../asyncRequest');

class Device {
    constructor(uuid, locationUrl, type){
        this.uuid = uuid;
        this.locationUrl = locationUrl;
        this.deviceType = type;
        this.location = this.parseLocationUrl(this.locationUrl);
        this.requestLocationData();
    }

    parseLocationUrl = (url) =>{
        let hostname = url.substring(url.indexOf("//") + 2, url.lastIndexOf(":"));
        let path = url.slice(url.lastIndexOf("/", url.length));
        return {hostname: hostname, path: path}
    }

    requestLocationData = () =>{
        asyncRequest(this.location.hostname, this.location.path, 443, 'GET', 5000).then((req) => {
            console.log(req.body)
        }).catch(() =>{

        })
    }

}
module.exports = Device;