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

describe('cellInput', () => {

    beforeEach((next) => {

        this.state = Setup();
        return next();
    });

    it('handles cell input', (done) => {

        const state = this.state;
        const cell = state.allCells['r1.c1'];
        Router({ state, type: 'cellMousedown', cell })

        expect(cell.input.value).to.equal('');

        Router({
            state,
            type: 'cellInput',
            e: { key: 'a' }
        });
        expect(cell.input.value).to.equal('a');

        Router({
            state,
            type: 'cellInput',
            e: { key: 'b' }
        });
        expect(cell.input.value).to.equal('ab');

        Router({
            state,
            type: 'cellInput',
            e: { key: 'Backspace' }
        });
        expect(cell.input.value).to.equal('a');

        done();
    });
});