const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const mongoose = require('mongoose');

const signup = async (email, password) => {
    try {
        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 5);

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: email,
            email: email,
            password: hashedPassword,
            lat: 0,
            lng: 0
        });

        await user.save();

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.JWT_TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        );

        const res = {
            token: token,
            email: email,
        }
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getUser = async (email) => {
    try {
        return await User.findOne({ email });
    } catch (error) {
        console.log(error);
    }
};

const getLoggedInUser = async (email, password) => {
    try {
        let loggedInUser = null;
        const user = await getUser(email);

        // check if user exists and confirm password
        if (!(user && await bcrypt.compare(password, user.password))) {
            return loggedInUser;
        }

        // create token
        const token = jwt.sign(
            { user_id: user.id, email },
            process.env.JWT_TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        );

        loggedInUser = {
            token,
            email
        }
        return loggedInUser;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    signup,
    getUser,
    getLoggedInUser
};