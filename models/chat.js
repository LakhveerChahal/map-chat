const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    friends: [String],
    msgs: [{
        text: String,
        author: String,
        time: {
            type: Date,
            immutable: true,
            default: Date.now()
        }
    }],
});

module.exports = mongoose.model('Chat', chatSchema);