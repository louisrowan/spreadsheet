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

describe('cellDrag', () => {

    beforeEach((next) => {

        this.state = Setup();
        return next();
    });

    it('handles cell drag', (done) => {

        const state = this.state;
        expect(state.startCellRect.id).to.not.exist();

        // Initial cell click
        const cell = state.allCells['r1.c1'];
        Router({ state, type: 'cellMousedown', cell});
        expect(state.startCellRect.id).to.equal(cell.id);
        expect(state.activeCells.length).to.equal(1);

        // cell drag
        const cell2 = state.allCells['r1.c2'];
        expect(cell2.input.style.background).to.not.equal('lightgray');

        Router({ state, type: 'cellMouseover', cell: cell2 });
        expect(state.activeCells.length).to.equal(1);
        expect(state.activeCells.includes('r1.c2')).to.equal(false);
        expect(cell2.input.style.background).to.equal('lightgray');

        // mouseup
        Router({ state, type: 'windowMouseup' });
        expect(state.activeCells.length).to.equal(2)
        expect(state.activeCells.includes('r1.c2')).to.equal(true);
        expect(cell2.input.style.background).to.equal('lightgray');

        done();

    });
});
