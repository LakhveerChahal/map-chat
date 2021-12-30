const express = require('express');
const loginRouter = require('./login.route');

const router = express.Router();

router.use('/user', loginRouter);

module.exports = router;