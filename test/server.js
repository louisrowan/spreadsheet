'use strict';

const express = require('express');
const http = require('http');
const path = require('path');
const port = process.env.PORT || 3000;

const startServer = (done) => {

    const app = express();
    const server = http.createServer(app);

    app.use('/', express.static(__dirname + '/..'));

    app.get('/', (req, res) => {

        res.sendFile(path.join(__dirname + '/../index.html'));
    })

    app.listen(port, (err) => {

        console.log('');
        console.log(`Test server started on port ${port}, error: ${!!err}`);
        console.log('');
        return done(server, err);
    });
}

module.exports = startServer;