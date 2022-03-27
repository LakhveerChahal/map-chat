const loginService = require('../services/login.service');

const signup = async (req, res) => {
    const { email, pwd } = req.body;

    if (!(email && pwd)) {
        return res.status(400).send('Invalid data provided.');
    }

    // check if user already exists
    const user = await loginService.getUser(email);
    if (user) {
        return res.status(400).send('User already exists.');
    }
    // create user
    try {
        const token = await loginService.signup(email, pwd);

        res.cookie("SESSIONID", token, { httpOnly: true }).status(201).send();
    } catch (error) {
        console.log(error);
        res.status(500).send('Some error occured at the backend');
    }
};

const signin = async (req, res) => {
    const { email, pwd } = req.body;
    if (!(email && pwd)) {
        return res.status(400).send('Invalid data provided.');
    }

    const token = await loginService.getLoggedInUser(email, pwd);

    if (token) {
        res.cookie("SESSIONID", token, { httpOnly: true }).send();
    } else {
        res.status(401).send('Invalid user credentials');
    }
};

const signout = async (req, res) => {
    return res
        .clearCookie("SESSIONID")
        .status(200)
        .json({ message: "Successfully logged out" });
};

module.exports = {
    signin,
    signup,
    signout
};