'use strict';

const jasmine = require('jasmine');
const mockDom = require('./mockDom.js');

describe('App', () => {

    it('Starts server and renders content', () => {

        mockDom.startServer((app) => {

            expect(app).toBeDefined();
            expect(_state).toBeDefined();
        })
    })
})