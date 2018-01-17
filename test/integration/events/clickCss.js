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

describe('clickCss', () => {

    beforeEach((next) => {

        this.state = Setup();
        return next();
    });

    it('handles clicking CSS Button for 1 active cell', (done) => {

        const state = this.state;
        expect(state.startCellRect.id).to.not.exist();

        // Initial cell click
        const cell = state.allCells['r1.c1'];
        Router({ state, type: 'cellMousedown', cell});

        expect(cell.input.style['fontWeight']).to.equal('normal');

        // Click bold
        Router({ state, type: 'buttonClick', e: {
            target: { id: 'boldButton' }
        }});
        expect(cell.input.style['fontWeight']).to.equal('bold');

        done();
    });

    it('handles clicking CSS Button for multiple active cells', (done) => {

        const state = this.state;
        expect(state.startCellRect.id).to.not.exist();

        // Simulate 3 active cells
        state.activeCells = ['r1.c1', 'r1.c2', 'r1.c3'];
        state.activeCells.forEach((id) => {

            const cell = state.allCells[id];
            expect(cell.input.style['textDecoration']).to.equal('none');
        });

        // Click underline
        Router({ state, type: 'buttonClick', e: {
            target: { id: 'underlineButton' }
        }});
        state.activeCells.forEach((id) => {

            const cell = state.allCells[id];
            expect(cell.input.style['textDecoration']).to.equal('underline');
        });

        done();
    });
});
