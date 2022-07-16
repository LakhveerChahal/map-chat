const Chat = require("../models/chat");
const mongoose = require('mongoose');

// payload: {content: string, from: string, to: string}
const saveMsg = async (payload) => {
    await Chat.findOneAndUpdate({
        friends: {
            $all: [{
                $elemMatch: { $eq: payload.from },
                $elemMatch: { $eq: payload.to },
            }]
        }
    }, {
        $setOnInsert: {
            friends: [payload.from, payload.to]
        }, 
        $push: {
            msgs: {
                text: payload.content,
                time: Date.now()
            }
        }
    },{
        upsert: true
    });
};

module.exports = {
    saveMsg
};