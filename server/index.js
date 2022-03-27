const httpServer = require('./app');

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
    console.log('listening on port: ' + port);
});