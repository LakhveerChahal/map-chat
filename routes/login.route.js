const express = require('express');
const loginController = require('../api/login.controller');
const { hardAuthorization, softAuthorization} = require('../middleware/auth');

const router = express.Router();

router.route('/signin').post(loginController.signin);
router.route('/signup').post(loginController.signup);

router.use('/signout', hardAuthorization);
router.route('/signout').get(loginController.signout);

router.use('/authenticate', softAuthorization);
router.route('/authenticate').get(loginController.authenticateSessionToken);

module.exports = router;