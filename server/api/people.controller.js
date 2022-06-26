const peopleService = require("../services/people.service");

const getSearchedPeople = async (req, res) => {

    const searchText = req.query.searchText;
    const offset = req.query.offset;
    const limit = req.query.limit;

    const friends = await peopleService.getSearchedPeople(searchText, offset, limit);
    res.send(friends);
};

module.exports = {
    getSearchedPeople,
};