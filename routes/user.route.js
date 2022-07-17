const express = require('express');
const { hardAuthorization } = require('../middleware/auth');
const userController = require('../api/user.controller');

const router = express.Router();

router.use('/', hardAuthorization);
router.route('/').post(userController.updateUserLocationData);

router.use('/metadata', hardAuthorization);
router.route('/metadata').get(userController.getUserMetaDataById);

module.exports = router;