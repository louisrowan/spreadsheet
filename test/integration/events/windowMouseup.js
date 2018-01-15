'use strict';

const Code = require('code');
const Lab = require('lab');
const Sinon = require('sinon');
const Router = require('../../../lib/router').router;
require('../../mockDom');


// Test shortcuts

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.describe;
const it = lab.it;


// Declare internals;

const internals = {};

internals.setupEnv = () => {

    require('../../../lib/index');
    return require('../../../lib/state')._state;
};

describe('window mouseup', () => {

    it('handles window mouseup', (done) => {

        const state = internals.setupEnv();
        state.mousedown = true;
        state.colDrag = true;
        state.rowDrag = true;
        expect(state.mousedown).to.equal(true);
        expect(state.colDrag).to.equal(true);
        expect(state.rowDrag).to.equal(true);

        Router({ type: 'windowMouseup' });

        expect(state.mousedown).to.equal(false);
        expect(state.colDrag).to.equal(false);
        expect(state.rowDrag).to.equal(false);

        done();
    });
});
