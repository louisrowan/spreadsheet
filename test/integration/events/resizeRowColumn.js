'use strict';

const Code = require('code');
const Lab = require('lab');
const Router = require('../../../lib/router').router;
const { Setup } = require('../../setupEnvironment');
require('../../mockDom');


// Test shortcuts

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.describe;
const it = lab.it;
const beforeEach = lab.beforeEach;


// Declare internals;

const internals = {};

describe('Resize row column', () => {

    beforeEach((next) => {

        this.state = Setup();
        return next();
    });

    // it('handles resizing a column', (done) => {

    //     const state = this.state;
        
        
    // });
});