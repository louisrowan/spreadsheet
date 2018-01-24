'use strict';

const Code = require('code');
const Lab = require('lab');
const Router = require('../../../lib/router').router;
const { Setup } = require('../../setupEnvironment');
const { CELL_WIDTH, ROW_HEADER_WIDTH } = require('../../../lib/constants');
require('../../mockDom');


// Test shortcuts

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.describe;
const it = lab.it;
const beforeEach = lab.beforeEach;


// Declare internals;

const internals = {}; // eslint-disable-line

describe('Resize row column', () => {

    beforeEach((next) => {

        this.state = Setup();
        return next();
    });

    it('handles resizing a column', (done) => {

        const state = this.state;
        const colId = 2;
        const clientX = ROW_HEADER_WIDTH + (CELL_WIDTH * +colId); // 2 cells + row header cell
        expect(state.colDrag).to.equal(false);

        Router({
            state,
            type: 'colHeaderMousedown',
            e: {
                target: {
                    id: `colHeader.${colId}`
                }
            }
        });
        expect(state.colDrag).to.equal(colId);

        const cells = Object.keys(state.allCells).filter((id) => {

            const cell = state.allCells[id];
            return cell.column === (colId - 1);
        });

        cells.forEach((id) => {

            const cell = state.allCells[id];
            expect(cell.div.style.width).to.equal(CELL_WIDTH + 'px');
        });

        let delta;
        delta = 2;
        Router({
            state,
            type: 'resizeRowColumn',
            value: 'column',
            e: { clientX: clientX + delta }
        });

        cells.forEach((id) => {

            const cell = state.allCells[id];
            expect(cell.div.style.width).to.equal(CELL_WIDTH + delta + 'px');
        });

        delta = 5;
        Router({
            state,
            type: 'resizeRowColumn',
            value: 'column',
            e: { clientX: clientX + delta }
        });

        cells.forEach((id) => {

            const cell = state.allCells[id];
            expect(cell.div.style.width).to.equal(CELL_WIDTH + delta + 'px');
        });

        delta = -2;
        Router({
            state,
            type: 'resizeRowColumn',
            value: 'column',
            e: { clientX: clientX + delta }
        });

        cells.forEach((id) => {

            const cell = state.allCells[id];
            expect(cell.div.style.width).to.equal(CELL_WIDTH + delta + 'px');
        });

        done();
    });
});