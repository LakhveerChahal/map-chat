const User = require("../models/user");

const getFriends = async (userId) => {
    try {
        // can be improved
        return await User.where('friends').in(userId).select('_id name lat lng isOnline email').exec();
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

const acceptFriendRequest = async (friendId, userId) => {
    try {
        const user = await User.findById(userId);
        user.friends.push(friendId);

        const friendUser = await User.findById(friendId);
        friendUser.friends.push(userId);

        // remove Id from receivedReq array
        const friendIndex = user.receivedReq.findIndex((id) => id.equals(friendId));
        if(friendIndex !== -1) { user.receivedReq.splice(friendIndex, 1); }
        // remove Id from sentReq array
        const userIndex = friendUser.sentReq.findIndex((id) => id.equals(userId));
        if(userIndex !== -1) { friendUser.sentReq.splice(userIndex, 1); }

        user.save();
        friendUser.save();
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = {
    getFriends,
    putFriendRequest,
    acceptFriendRequest
};
