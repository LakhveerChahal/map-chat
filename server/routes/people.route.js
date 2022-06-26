const express = require('express');
const peopleController = require('../api/people.controller');

const router = express.Router();

router.route('/search').get(peopleController.getSearchedPeople);

module.exports = router;