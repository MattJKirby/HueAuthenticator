class LocationDataContainer {
    constructor(hostname, path){
        this.hostname = hostname
        this.path = path
        this.data = {}
         
    }

    setData = (xmlDom,xmlTags) =>{
        let retreivedData = {}
       
        for (const key in xmlTags){
            const value = xmlTags[key];
            retreivedData[key] = xmlDom.window.document.querySelector(value).textContent;
        }
        this.data = retreivedData
    }
}

module.exports = LocationDataContainer