require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index.route');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://lakhveerSingh:' + process.env.MONGO_PASS +'@dbcluster.ttjw2.mongodb.net/map-chat?retryWrites=true&w=majority');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);
app.use(express.static(process.cwd() + "/public/"));

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/public/index.html");
});

module.exports = app;
