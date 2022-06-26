const User = require("../models/user");

const getFriends = async (userId) => {
    try {
        return await User.find({}, 'name lat lng isOnline').exec();
    } catch (error) {
        console.error(error);
    }
};

const putFriendRequest = async (friendId, userId) => {
    try {
        await User.findByIdAndUpdate(userId, {
            $push: {
                sentReq: friendId
            }
        });

        await User.findByIdAndUpdate(friendId, {
            $push: {
                receivedReq: userId
            }
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

module.exports = {
    getFriends,
    putFriendRequest
};
