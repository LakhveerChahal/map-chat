const friendsService = require('../services/friends.service');

getUserIdFromReq = (req) => {
    return req.userId;
}

const getFriends = async (req, res) => {
    const userId = getUserIdFromReq(req);
    
    const friends = await friendsService.getFriends(userId);
    res.send(friends);
};

const putFriendRequest = async (req, res) => {
    const userId = getUserIdFromReq(req);
    const friendId = req.params.friendId;

    if(!userId || !friendId) {
        res.status(401).send();
    }

    const result = await friendsService.putFriendRequest(friendId, userId);

    if(result) {
        res.status(201).send();
    } else {
        res.status(500).send();
    }
}


module.exports = {
    getFriends,
    putFriendRequest
};