const { Server } = require('socket.io');
const { createServer } = require("http");
const jwt = require('jsonwebtoken');
const app = require('./app');

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:4200']
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
        next();
    } catch (error) {
        console.error(error);
    }
})
.on('connection', (socket) => {
    console.log('Connected Count: ' + io.engine.clientsCount);
    console.log('USERID: ' + socket.userId);

    socket.on('msg', (data, to) => {
        console.log(data);
        io.emit('broadcast-msg', data);
    })

    socket.on('disconnect', (reason) => {
        console.log('DISCONNECTED:' + reason);
    })

});

module.exports = httpServer;