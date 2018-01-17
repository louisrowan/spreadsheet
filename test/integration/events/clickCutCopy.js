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

describe('clickCutCopy', () => {

    beforeEach((next) => {

        this.state = Setup();
        return next();
    });

    it('handles clicking copy', (done) => {

        const state = this.state;
        expect(state.startCellRect.id).to.not.exist();

        // Initial cell click
        const cell = state.allCells['r1.c1'];
        Router({ state, type: 'cellMousedown', cell});
        Router({ state, type: 'cellInput', e: {
            key: 'z'
        }});
        expect(state.startCellRect.id).to.equal(cell.id);
        expect(state.startCellRect.input.value).to.equal('z');
        expect(state.activeCells.length).to.equal(1);
        expect(state.cutCopyType).to.equal('');
        expect(state.cutCopyCells.length).to.equal(0);

        // click copy
        Router({ state, type: 'buttonClick', e: {
            target: { id: 'copyButton' }
        }});
        expect(state.cutCopyType).to.equal('copy');
        expect(state.cutCopyCells.length).to.equal(1);
        expect(state.cutCopyCells[0][0].input.value).to.equal('z');

        done();
    });

    it('clicks cut with multiple cells, rows selected', (done) => {

        const state = this.state;

        // simulate active cells
        state.activeCells = ['r1.c1', 'r1.c2', 'r2.c1', 'r2.c2'];
        let num = 1;
        state.activeCells.forEach((id) => {

            const cell = state.allCells[id];
            cell.input.value = num;
            ++num;
        });

        // click cut
        Router({ state, type: 'buttonClick', e: {
            target: { id: 'cutButton' }
        }});
        expect(state.cutCopyType).to.equal('cut');
        expect(state.cutCopyCells.length).to.equal(2);
        expect(state.cutCopyCells[0][0].input.value).to.equal(1);
        expect(state.cutCopyCells[0][1].input.value).to.equal(2);
        expect(state.cutCopyCells[1][0].input.value).to.equal(3);
        expect(state.cutCopyCells[1][1].input.value).to.equal(4);

        done();
    });
});
