

class Device {
    constructor(uuid, locationDataContainer, type){
        this.uuid = uuid;
        this.type = type;
        this.location = locationDataContainer
        this.authenticated = false
    }

}
module.exports = Device;