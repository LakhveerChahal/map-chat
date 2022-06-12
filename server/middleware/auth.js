const jwt = require('jsonwebtoken');

const authorization = (req, res, next) => {
    const token = req.cookies.SESSIONID;
    if(!token) {
        return res.sendStatus(403);
    }
    try {
        console.log('Token' + token);
        const data = jwt.verify(token, process.env.JWT_TOKEN_KEY)
        const userId = data.user_id;
        const email = data.email;
        req.userId = userId;
        return next();
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    authorization
};