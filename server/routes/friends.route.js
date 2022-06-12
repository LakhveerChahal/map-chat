const express = require('express');
const friendsController = require('../api/friends.controller');
const { authorization } = require('../middleware/auth');

const router = express.Router();

router.route('/', authorization).get(friendsController.getFriends);

module.exports = router;