const express = require('express');
const chatController = require('../api/chat.controller');
const { hardAuthorization } = require('../middleware/auth');

const router = express.Router();

router.use('/:friendId', hardAuthorization);
router.route('/:friendId').get(chatController.fetchChat);

module.exports = router;