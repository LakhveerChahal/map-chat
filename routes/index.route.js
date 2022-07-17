const express = require('express');
const loginRouter = require('./login.route');
const friendsRouter = require('./friends.route');
const peopleRouter = require('./people.route');
const chatRouter = require('./chat.route');
const userRouter = require('./user.route');
const router = express.Router();

router.use('/auth', loginRouter);
router.use('/friends', friendsRouter);
router.use('/people', peopleRouter);
router.use('/chat', chatRouter);
router.use('/user', userRouter);

module.exports = router;