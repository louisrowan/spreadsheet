'use strict';

const express = require('express');
const path = require('path');

const startServer = () => {

    const app = express();


    app.use('/', express.static(__dirname + '/..'));

    app.get('/', (req, res) => {

        res.sendFile(path.join(__dirname + '/../index.html'));
    })
    app.listen(3000);
    console.log('app?', app, path.join(__dirname + '/../index.html'));
}

startServer()