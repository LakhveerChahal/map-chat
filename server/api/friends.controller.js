const friendsService = require('../services/friends.service');

const getFriends = async (req, res) => {
    const userId = req.userId;

    const friends = await friendsService.getFriends(userId);
    res.send(friends);
};

module.exports = {
    getFriends
};