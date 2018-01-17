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

describe('keyup', () => {

    beforeEach((next) => {

        this.state = Setup();
        return next();
    });

    it('handles shift keyup', (done) => {

        const state = this.state;

        // simulate shift press
        Router({ state, type: 'enableShiftActive', });
        expect(state.shiftActive).to.equal(true);

        // do not change shift active on other key up
        Router({ state, type: 'windowKeyup', e: {
            key: 'a'
        }})
        expect(state.shiftActive).to.equal(true);

        // modify shift active on shift keyup
        Router({ state, type: 'windowKeyup', e: {
            key: 'Shift'
        }})
        expect(state.shiftActive).to.equal(false);

        done();
    });

    it('handles command keyup', (done) => {

        const state = this.state;

        // simulate command press
        Router({ state, type: 'enableCommandActive', });
        expect(state.commandActive).to.equal(true);

        // do not change command active on other key up
        Router({ state, type: 'windowKeyup', e: {
            key: 'a'
        }})
        expect(state.commandActive).to.equal(true);

        // modify command active on command keyup
        Router({ state, type: 'windowKeyup', e: {
            key: 'Meta'
        }})
        expect(state.commandActive).to.equal(false);

        done();
    });
});
