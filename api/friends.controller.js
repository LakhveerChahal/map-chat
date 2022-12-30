const friendsService = require('../services/friends.service');

getUserIdFromReq = (req) => {
    return req.userId;
}

const getFriends = async (req, res) => {
    const userId = getUserIdFromReq(req);
    const state = req.params.state;
    
    const friends = await friendsService.getFriends(userId, state);
    res.send(friends);
};

const getActiveFriendsMarkers = async (req, res) => {
    const userId = getUserIdFromReq(req);
    const { minLat, maxLat, minLng, maxLng } = req.query;
    
    const friends = await friendsService.getFriendsInBoundingBox(userId, minLat, maxLat, minLng, maxLng);
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

const acceptFriendRequest = async (req, res) => {
    const userId = getUserIdFromReq(req);
    const friendId = req.params.friendId;

    if (!userId || !friendId) {
        res.status(401).send();
    }

    const result = await friendsService.acceptFriendRequest(friendId, userId);
    if (result) {
        res.status(201).send();
    } else {
        res.status(500).send();
    }
}

module.exports = {
    getFriends,
    getActiveFriendsMarkers,
    putFriendRequest,
    acceptFriendRequest
};