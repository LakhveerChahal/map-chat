const jwt = require('jsonwebtoken');

const hardAuthorization = (req, res, next) => {
    const token = req.headers.token;
    if(!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, process.env.JWT_TOKEN_KEY)
        const userId = data.user_id;
        req.userId = userId;
        return next();
    } catch (error) {
        console.error(error);
    }
};

const softAuthorization = (req, res, next) => {
    const token = req.headers.token;
    
    try {
        const data = jwt.verify(token, process.env.JWT_TOKEN_KEY)
        const userId = data.user_id;
        req.userId = userId;
        return next();
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    hardAuthorization,
    softAuthorization
};