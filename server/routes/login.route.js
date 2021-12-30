const express = require('express');
const loginController = require('../api/login.controller');

const router = express.Router();

router.route('/login').post(loginController.login);
router.route('/signup').post(loginController.signup);

module.exports = router;