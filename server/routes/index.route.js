const express = require('express');
const loginRouter = require('./login.route');
const friendsRouter = require('./friends.route');
const router = express.Router();

router.use('/user', loginRouter);
router.use('/friends', friendsRouter);

module.exports = router;