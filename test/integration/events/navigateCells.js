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

describe('navigate cells', () => {

    it('handles navigate cells', (done) => {

        const state = internals.setupEnv();
        const cell = state.allCells['r1.c1'];
        Router({ type: 'cellMousedown', cell });
        expect(state.activeCells.length).to.equal(1);
        expect(state.activeCells[0]).to.equal('r1.c1');
        expect(state.startCellRect.id).to.equal('r1.c1');

        Router({
            type: 'navigateCells',
            e: { key: 'ArrowRight' }
        });
        expect(state.activeCells.length).to.equal(1);
        expect(state.activeCells[0]).to.equal('r1.c2');
        expect(state.startCellRect.id).to.equal('r1.c2');

        Router({
            type: 'navigateCells',
            e: { key: 'ArrowDown' }
        });
        expect(state.activeCells.length).to.equal(1);
        expect(state.activeCells[0]).to.equal('r2.c2');
        expect(state.startCellRect.id).to.equal('r2.c2');

        done();
    });
});
