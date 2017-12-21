'use strict';

const jasmine = require('jasmine');
const mockDom = require('./mockDom.js');

describe('App', () => {

    it('Starts server and renders content', () => {

        mockDom.startServer((app) => {

            expect(app).toBeDefined();
            expect(_state).toBeDefined();
        });
    });

    it('adds cell to active array when clicked', () => {

        mockDom.startServer((app) => {

            const randNum = Math.floor(_state.allCells.length * Math.random());
            const randCell = _state.allCells[randNum];
            expect(_state.activeCells).toBeDefined();
            expect(_state.activeCells.length).toBe(0);
            cellMousedown(randCell, null);
            expect(_state.activeCells.length).toBe(1);
            const activeCell = _state.activeCells[0];
            expect(randCell.row).toBe(activeCell.row);
            expect(randCell.column).toBe(activeCell.column);
            expect(randCell.id).toBe(activeCell.id);
        });
    });
});