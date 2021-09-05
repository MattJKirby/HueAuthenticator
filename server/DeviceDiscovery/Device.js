const asyncRequest = require('../asyncRequest');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


class Device {
    constructor(uuid, locationUrl, type){
        this.uuid = uuid;
        this.type = type;
        this.location = this.parseLocationUrl(locationUrl);
        this.requestLocationData();
    }

    parseLocationUrl = (url) =>{
        let hostname = url.substring(url.indexOf("//") + 2, url.lastIndexOf(":"));
        let path = url.slice(url.lastIndexOf("/", url.length));
        return { hostname: hostname, path: path }
    }

    requestLocationData = () =>{
        asyncRequest(this.location.hostname, this.location.path, 443, 'GET', 5000).then((req) => {
            const dom = new JSDOM(req.body);
            console.log(dom.window.document.querySelector("root")); 
            
        }).catch(() =>{

        });
    }

}
module.exports = Device;