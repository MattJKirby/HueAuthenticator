

class Device {
    constructor(uuid, locationDataContainer, type){
        this.uuid = uuid;
        this.type = type;
        this.location = locationDataContainer
    }

}
module.exports = Device;