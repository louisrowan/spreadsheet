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

describe('enable command active', () => {

    beforeEach((next) => {

        this.state = Setup();
        return next();
    });

    it('handles command key active', (done) => {

        const state = this.state;
        expect(state.commandActive).to.equal(false);

        Router({ state, type: 'enableCommandActive' });

        expect(state.commandActive).to.equal(true);

        done();
    });
});
