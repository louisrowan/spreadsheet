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

const internals = {}; // eslint-disable-line

describe('clickPaste', () => {

    beforeEach((next) => {

        this.state = Setup();
        return next();
    });

    it('handles paste - from copy', (done) => {

        const state = this.state;
        expect(state.startCellRect.id).to.not.exist();

        // Initial cell copy
        const cell = state.allCells['r1.c1'];
        Router({ state, type: 'cellMousedown', cell});
        Router({ state, type: 'cellInput', e: {
            key: 'z'
        }});
        expect(state.startCellRect.input.value).to.equal('z');
        Router({ state, type: 'buttonClick', e: {
            target: { id: 'copyButton' }
        }});
        expect(state.cutCopyCells[0][0].input.value).to.equal('z');

        // select new cell
        const newCell = state.allCells['r3.c3'];
        Router({ state, type: 'cellMousedown', cell: newCell});
        expect(state.activeCells.length).to.equal(1);
        expect(state.activeCells[0]).to.equal('r3.c3');
        expect(newCell.input.value).to.equal('');

        // click paste
        Router({ state, type: 'buttonClick', e: {
            target: { id: 'pasteButton' }
        }});
        expect(newCell.input.value).to.equal('z');
        expect(cell.input.value).to.equal('z');

        done();
    });

    it('handles paste - from cut', (done) => {

        const state = this.state;
        expect(state.startCellRect.id).to.not.exist();

        // Initial cell copy
        const cell = state.allCells['r1.c1'];
        Router({ state, type: 'cellMousedown', cell});
        Router({ state, type: 'cellInput', e: {
            key: 'z'
        }});
        expect(state.startCellRect.input.value).to.equal('z');
        Router({ state, type: 'buttonClick', e: {
            target: { id: 'cutButton' }
        }});
        expect(state.cutCopyCells[0][0].input.value).to.equal('z');

        // select new cell
        const newCell = state.allCells['r3.c3'];
        Router({ state, type: 'cellMousedown', cell: newCell });
        expect(state.activeCells.length).to.equal(1);
        expect(state.activeCells[0]).to.equal('r3.c3');
        expect(newCell.input.value).to.equal('');
        expect(state.cutCopyType).to.equal('cut');

        // click paste
        Router({ state, type: 'buttonClick', e: {
            target: { id: 'pasteButton' }
        }});
        expect(newCell.input.value).to.equal('z');
        expect(cell.input.value).to.equal('');
        expect(state.cutCopyType).to.equal('copy'); // once pasted once, functionality should mirror copy - never modifying 'old' cells

        done();
    });
});
