const httpServer = require('./socket');

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
    console.log('listening on port: ' + port);
});