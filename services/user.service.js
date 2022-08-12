const User = require("../models/user");
const mongoose = require('mongoose');

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

const getUserMetaDataById = async (userId) => {
    const userMetaData = {};

    let user = await User
        .findById(userId);
    userMetaData._id = userId;
    userMetaData.friendCount = user.friends.length;
    userMetaData.requestSentCount = user.sentReq.length;
    userMetaData.requestReceivedCount = user.receivedReq.length;

    // need to work on this
    const res = await User
        .aggregate([
            { $match: { _id: mongoose.Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: "User",
                    localField: "friends",
                    foreignField: "id",
                    as: "friends_arr"
                }
            }
        ]);

    console.log(res);

    return user;
};

const getUsersInfoByIds = async (ids) => {
    return await User.find({
        _id: {
            $in: ids
        }
    }).sort({
        name: 1
    });
};

module.exports = {
    updateUserLocation,
    getUserMetaDataById
}