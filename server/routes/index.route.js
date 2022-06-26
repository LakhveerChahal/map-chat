const express = require('express');
const loginRouter = require('./login.route');
const friendsRouter = require('./friends.route');
const peopleRouter = require('./people.route');
const router = express.Router();

router.use('/user', loginRouter);
router.use('/friends', friendsRouter);
router.use('/people', peopleRouter);

module.exports = router;