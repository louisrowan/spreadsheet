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

describe('window mouseup', () => {

    beforeEach((next) => {

        this.state = Setup();
        return next();
    });

    it('handles window mouseup', (done) => {

        const state = this.state;
        state.mousedown = true;
        state.colDrag = true;
        state.rowDrag = true;
        expect(state.mousedown).to.equal(true);
        expect(state.colDrag).to.equal(true);
        expect(state.rowDrag).to.equal(true);

        Router({ state, type: 'windowMouseup' });

        expect(state.mousedown).to.equal(false);
        expect(state.colDrag).to.equal(false);
        expect(state.rowDrag).to.equal(false);

        done();
    });
});
