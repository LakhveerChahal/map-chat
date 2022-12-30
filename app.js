require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index.route');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://lucky:'+ process.env.MONGO_PASS +'@cluster0.bj4up8y.mongodb.net/?retryWrites=true&w=majority');


const app = express();

app.use(cors({
    origin: [process.env.BASE_URL],
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(routes);
app.use(express.static(process.cwd() + "/public/"));

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/public/index.html");
});

module.exports = app;
