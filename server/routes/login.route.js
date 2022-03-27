const express = require('express');
const loginController = require('../api/login.controller');
const {authorization} = require('../middleware/auth');

const router = express.Router();

router.route('/signin').post(loginController.signin);
router.route('/signup').post(loginController.signup);

router.use('/signout', authorization);
router.route('/signout').get(loginController.signout);

module.exports = router;