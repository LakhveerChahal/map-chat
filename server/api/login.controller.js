const loginService = require('../services/login.service');

const signup = async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        return res.status(400).send('Invalid data provided.');
    }

    // check if user already exists
    const user = await loginService.getUser(email);
    if (user) {
        return res.status(400).send('User already exists.');
    }
    // create user
    try {
        const user = await loginService.signup(email, password);

        res.status(201).json(user);
    } catch (error) {
        res.status(500).send('Some error occured at the backend');
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) {
        return res.status(400).send('Invalid data provided.');
    }

    const loggedInUser = await loginService.getLoggedInUser(email, password);

    if (loggedInUser) {
        res.send(loggedInUser);
    } else {
        res.status(401).send('Invalid user credentials');
    }
};

module.exports = {
    login,
    signup
};