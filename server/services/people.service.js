const User = require("../models/user");

const getSearchedPeople = async (searchText, offset, limit) => {
    try {
        return await User.find({
            name: {
                $regex: '.*' + searchText + '.*',
                $options: 'i'
            }
        }, '_id name lat lng isOnline')
            .skip(offset)
            .limit(limit)
            .exec();

    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getSearchedPeople
};
