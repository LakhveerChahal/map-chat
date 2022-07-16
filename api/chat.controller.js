const chatService = require('../services/chat.service');

const fetchChat = async (req, res) => {
    const user1 = req.userId;
    const user2 = req.params.friendId;
    const offset = +req.query.offset;

    const chatRes = await chatService.fetchChat(user1, user2, offset);
    res.send(chatRes ? chatRes.reverse() : []);
};

module.exports = {
    fetchChat
};