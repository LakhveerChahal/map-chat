require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index.route');
const mongoose = require('mongoose');
const { createServer } = require("http");
const { Server } = require('socket.io');

mongoose.connect('mongodb+srv://lakhveerSingh:' + process.env.MONGO_PASS +'@dbcluster.ttjw2.mongodb.net/map-chat?retryWrites=true&w=majority');

const app = express();
const httpServer = createServer(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(routes);
app.use(express.static(process.cwd() + "/public/"));

const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log(socket);
    console.log('Socket connected');
})

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/public/index.html");
});



module.exports = httpServer;
