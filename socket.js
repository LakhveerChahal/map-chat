const { Server } = require('socket.io');
const { createServer } = require("http");
const jwt = require('jsonwebtoken');
const app = require('./app');
const chatService = require('./services/chat.service');

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: process.env.BASE_URL
    }
});

io.attach(httpServer);

// key: userId, value: socket instance list
const socketMap = new Map();

io
.use((socket, next) => {
    const token = socket.handshake.auth.token;
    try {
        const data = jwt.verify(token, process.env.JWT_TOKEN_KEY)
        const userId = data.user_id;
        socket.userId = userId;
        socketMap.set(userId, socket.id);
        next();
    } catch (error) {
        console.error(error);
    }
})
.on('connection', (socket) => {
    console.log('Connected Count: ' + io.engine.clientsCount);
    console.log('USERID: ' + socket.userId);

    socket.on('pvt msg', ({ content, to }) => {
        chatService.saveMsg({content, from: socket.userId, to});
        console.log('FROM: ' + socket.userId);
        console.log('Sending: ' + content);
        console.log('TO: ' + to);
        socket.to(socketMap.get(to)).emit('pvt msg', {
            content,
            from: socket.userId,
        });
    });

    socket.on('disconnect', (reason) => {
        console.log('DISCONNECTED:' + reason);
        socketMap.delete(socket.userId);
    });

    console.log('SocketMap: ', socketMap);
    io.emit('users', [...socketMap]);
});

module.exports = httpServer;