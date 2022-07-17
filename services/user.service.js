const User = require("../models/user");

const updateUserLocation = async (userId, latitude, longitude) => {
    try {
        await User.updateOne({
            _id: userId
        }, {
            lat: latitude,
            lng: longitude,
            isOnline: true
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = {
    updateUserLocation
}