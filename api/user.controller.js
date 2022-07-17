const userService = require('../services/user.service');

const updateUserLocationData = async (req, res) => {
    const userId = req.userId;
    const { latitude, longitude } = req.body; 

    const result = await userService.updateUserLocation(userId, latitude, longitude);
    if (result) {
        return res.status(201).send(true);
    } else {
        return res.status(522).send(false);
    }
};

module.exports = {
    updateUserLocationData
};