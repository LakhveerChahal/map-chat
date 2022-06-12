const User = require("../models/user");

const getFriends = async (userId) => {
    try {
        return await User.find({}, 'name lat lng isOnline').exec();
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    getFriends
};
