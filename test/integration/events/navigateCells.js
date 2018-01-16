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

describe('navigate cells', () => {

    beforeEach((next) => {

        this.state = Setup();
        return next();
    });

    it('handles navigate cells', (done) => {

        const state = this.state;
        const cell = state.allCells['r1.c1'];
        Router({ state, type: 'cellMousedown', cell });
        expect(state.activeCells.length).to.equal(1);
        expect(state.activeCells[0]).to.equal('r1.c1');
        expect(state.startCellRect.id).to.equal('r1.c1');

        Router({
            state,
            type: 'navigateCells',
            e: { key: 'ArrowRight' }
        });
        expect(state.activeCells.length).to.equal(1);
        expect(state.activeCells[0]).to.equal('r1.c2');
        expect(state.startCellRect.id).to.equal('r1.c2');

        Router({
            state,
            type: 'navigateCells',
            e: { key: 'ArrowDown' }
        });
        expect(state.activeCells.length).to.equal(1);
        expect(state.activeCells[0]).to.equal('r2.c2');
        expect(state.startCellRect.id).to.equal('r2.c2');

        done();
    });
});
