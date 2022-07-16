const express = require('express');
const loginRouter = require('./login.route');
const friendsRouter = require('./friends.route');
const peopleRouter = require('./people.route');
const chatRouter = require('./chat.route');
const router = express.Router();

router.use('/user', loginRouter);
router.use('/friends', friendsRouter);
router.use('/people', peopleRouter);
router.use('/chat', chatRouter);

module.exports = router;