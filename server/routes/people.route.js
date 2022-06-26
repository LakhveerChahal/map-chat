const express = require('express');
const { softAuthorization } = require('../middleware/auth');
const peopleController = require('../api/people.controller');

const router = express.Router();

router.use('/search', softAuthorization);
router.route('/search').get(peopleController.getSearchedPeople);

module.exports = router;