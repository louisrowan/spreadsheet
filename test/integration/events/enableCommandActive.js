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

describe('enable command active', () => {

    it('handles command key active', (done) => {

        const state = internals.setupEnv();
        expect(state.commandActive).to.equal(false);

        Router({ type: 'enableCommandActive' });

        expect(state.commandActive).to.equal(true);

        done();
    });
});
