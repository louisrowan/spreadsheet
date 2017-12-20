'use strict';

const jasmine = require('jasmine');
const Server = require('./server.js');

console.log('hi');

describe('App', () => {

    it('Starts server and renders content', () => {

        Server((server, err) => {

            const brow = browser.get('http://localhost:3000');
            console.log(brow);

            expect(err).not.toBeDefined();
            expect(server).toBeDefined();
        });
    })
})