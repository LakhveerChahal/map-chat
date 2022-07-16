const express = require('express');
const friendsController = require('../api/friends.controller');
const { hardAuthorization } = require('../middleware/auth');

const router = express.Router();

router.use('/', hardAuthorization);
router.use('/request/:friendId', hardAuthorization);

router.route('/').get(friendsController.getFriends);
router.route('/request/:friendId').put(friendsController.putFriendRequest);
router.route('/accept-request/:friendId').put(friendsController.acceptFriendRequest);

module.exports = router;