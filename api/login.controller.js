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
        const tokenAndId = await loginService.signup(email, pwd);

        res.cookie("SESSIONID", tokenAndId.token, { httpOnly: true }).status(201).send(tokenAndId);
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

    const tokenAndId = await loginService.getLoggedInUser(email, pwd);

    if (tokenAndId) {
        res.cookie("SESSIONID", tokenAndId.token, { httpOnly: true }).send(tokenAndId);
    } else {
        res.status(401).send('Invalid user credentials');
    }
};

const signout = async (req, res) => {
    const userId = req.userId;
    await loginService.signOut(userId);
    return res
        .clearCookie("SESSIONID")
        .status(200)
        .json({ message: "Successfully logged out" });
};

const authenticateSessionToken = async (req, res) => {
    const userId = req.userId;
    if(!userId) {
        return res.status(401).send('Invalid session token');
    }

    const user = await loginService.getUser(null, userId);
    return res.send(user);
}

module.exports = {
    signin,
    signup,
    signout,
    authenticateSessionToken,
};