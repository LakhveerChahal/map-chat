const Chat = require("../models/chat");

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
                author: payload.from,
                time: Date.now()
            }
        }
    },{
        upsert: true
    });
};

// given two users, fetch their chat
const fetchChat = async (user1, user2, offset) => {

    return await Chat.aggregate([
        {
            $match: {
                friends: {
                    $elemMatch: { $eq: user1 },
                    $elemMatch: { $eq: user2 },
                }
            }, 
        }, {
            $project: {
                msgs: 1, 
                _id: 0
            }
        }, {
            $unwind: '$msgs',
        }, {
            $sort: {
                'msgs.time': -1
            }
        }, {
            $skip: offset
        }, {
            $limit: 10
        }, {
            $project: {
                text: '$msgs.text',
                author: '$msgs.author',
                time: '$msgs.time'
            }
        }
    ]);
};

module.exports = {
    saveMsg,
    fetchChat
};