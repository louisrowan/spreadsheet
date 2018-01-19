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

describe('keydown expand cell rect', () => {

    beforeEach((next) => {

        this.state = Setup();
        return next();
    });

    it('handles expanding cell rect', (done) => {

        // Mouse click for 1 active cell
        const state = this.state;
        const cell = state.allCells['r1.c1'];
        Router({ state, type: 'cellMousedown', cell })
        Router({ state, type: 'windowMouseup' })
        expect(state.mousedown).to.equal(false);
        expect(state.startCellRect.id).to.equal(cell.id);
        expect(state.endCellRect.id).to.equal(undefined);
        expect(state.activeCells.length).to.equal(1);

        // shift keydown
        expect(state.shiftActive).to.equal(false);
        Router({ state, type: 'enableShiftActive' });
        expect(state.shiftActive).to.equal(true);

        // navigate down 1 cell
        Router({ state, type: 'shiftActiveKeydown', e: {
            key: 'ArrowDown'
        }});
        expect(state.activeCells.length).to.equal(2);
        expect(state.endCellRect.id).to.equal('r2.c1');

        // navigate right 1 cell
        Router({ state, type: 'shiftActiveKeydown', e: {
            key: 'ArrowRight'
        }});
        expect(state.activeCells.length).to.equal(4);
        expect(state.endCellRect.id).to.equal('r2.c2');
        expect(state.shiftActive).to.equal(true);

        // Release shift
        Router({ state, type: 'windowKeyup', e: {
            key: 'Shift'
        }});
        expect(state.shiftActive).to.equal(false);

        done();
    });
});