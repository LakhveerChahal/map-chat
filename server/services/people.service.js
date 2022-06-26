const User = require("../models/user");
const UserResponseModel = require("../models/user-response.model");

const getSearchedPeople = async (searchText, offset, limit, userId) => {
    try {
        // get 10 people based on search criteria
        const people = await User.find({
            name: {
                $regex: '.*' + searchText + '.*',
                $options: 'i'
            }
        }, '_id name lat lng isOnline')
        .skip(offset)
        .limit(limit)
        .exec();

        // map to UI Response Model
        const peopleResponse = people.map(p => new UserResponseModel(p));

        // update isFriend field
        if(userId) {
            await updateFriendField(peopleResponse, userId);
        }

        return peopleResponse;

    } catch (error) {
        console.error(error);
    }
}

const updateFriendField = async (people, userId) => {
    try {
        // logic can be improved
        for (let i = 0; i < people.length; i++) {
            const p = people[i];
            console.log(p._id.valueOf());
            
            const isFriend = await User.findOne({
                _id: userId,
                friends: p._id.valueOf()
            }).exec();

            p.isFriend = isFriend != null;

            const reqReceived = await User.findOne({
                _id: userId,
                receivedReq: p._id.valueOf()
            }).exec();

            p.friendReqReceived = reqReceived != null;

            const reqSent = await User.findOne({
                _id: userId,
                sentReq: p._id.valueOf()
            }).exec();

            p.friendReqSent = reqSent != null;
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getSearchedPeople
};
