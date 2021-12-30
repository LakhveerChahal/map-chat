const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    lat: Number,
    lng: Number
});

module.exports = mongoose.model('User', userSchema);