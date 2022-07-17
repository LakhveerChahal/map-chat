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
            email,
            password: hashedPassword,
            lat: 40 + Math.random(),
            lng: -74 + Math.random(),
            isOnline: true,
            friends: []
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

        return {
            token,
            _id: user._id
        };

    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getUser = async (email, id) => {
    try {
        return await User.findOne()
            .or([{email}, {_id: id}])
            .select('_id name lat lng isOnline email password');
    } catch (error) {
        console.log(error);
    }
};

const getLoggedInUser = async (email, password) => {
    try {
        const user = await getUser(email, null);
        user.isOnline = true;
        user.save();
        // check if user exists and confirm password
        if (!(user && await bcrypt.compare(password, user.password))) {
            return null;
        }

        // create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.JWT_TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        );

        return {
            token,
            _id: user._id,
            name: user.name,
            lat: user.lat,
            lng: user.lng,
            isOnline: true
        };
    } catch (error) {
        console.log(error);
        return null;
    }
};

const signOut = async (userId) => {
    try {
        const res = await User.updateOne({
            _id: userId
        }, {
            isOnline: false
        });
        console.log('Marked isOnline false', res);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = {
    signup,
    getUser,
    getLoggedInUser,
    signOut
};