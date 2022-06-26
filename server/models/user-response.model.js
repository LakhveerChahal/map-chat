class UserResponseModel {
    _id; name; email; lat; lng; isOnline; isFriend; friendReqSent; friendReqReceived;

    constructor (
        person
    ) {
        this._id = person._id;
        this.name = person.name;
        this.lat = person.lat;
        this.lng = person.lng;
        this.isOnline = person.isOnline;
        this.isFriend = false;
        this.friendReqSent = false;
        this.friendReqReceived = false;
    }
}

module.exports = UserResponseModel;