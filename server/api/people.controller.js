const peopleService = require("../services/people.service");

const getSearchedPeople = async (req, res) => {
    const userId = req.userId;

    const searchText = req.query.searchText;
    const offset = req.query.offset;
    const limit = req.query.limit;

    const people = await peopleService.getSearchedPeople(searchText, offset, limit, userId);

    res.send(people);
};

module.exports = {
    getSearchedPeople,
};