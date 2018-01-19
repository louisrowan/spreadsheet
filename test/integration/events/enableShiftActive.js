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

describe('enable shift active', () => {

    beforeEach((next) => {

        this.state = Setup();
        return next();
    });

    it('handles shift key active', (done) => {

        const state = this.state;
        expect(state.shiftActive).to.equal(false);

        Router({ state, type: 'enableShiftActive' });

        expect(state.shiftActive).to.equal(true);

        done();
    });
});
