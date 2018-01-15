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

describe('cellInput', () => {

    it('handles cell input', (done) => {

        const state = internals.setupEnv();
        const cell = state.startCellRect = state.allCells['r1.c1'];

        expect(cell.input.value).to.equal('');

        Router({
            type: 'cellInput',
            e: { key: 'a' }
        });
        expect(cell.input.value).to.equal('a');

        Router({
            type: 'cellInput',
            e: { key: 'b' }
        });
        expect(cell.input.value).to.equal('ab');

        Router({
            type: 'cellInput',
            e: { key: 'Backspace' }
        });
        expect(cell.input.value).to.equal('a');

        done();
    });
});