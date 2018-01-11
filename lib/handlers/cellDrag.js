'use strict';

const { $updateCell } = require('../state');
const CellCommon = require('../cell/common');
const CellStateUpdate = require('../cell/stateUpdate');
const WindowStateUpdate = require('../window/stateUpdate');

module.exports = (state, cell) => {

    const start = state.startCellRect;
    const { left, top, width, height } = CellCommon.getMultiCellDimensions(state, start, cell);

    $updateCell(start, { style: { border: '1px solid rgb(238, 238, 238)' }});
    CellStateUpdate.updateEndCellRect(cell);
    WindowStateUpdate.setDraggableDivToDimensions(left, top, width, height);

    const leftCol = Math.min(start.column, cell.column);
    const rightCol = Math.max(start.column, cell.column);
    const topRow = Math.min(start.row, cell.row);
    const botRow = Math.max(start.row, cell.row);

    Object.keys(state.allCells).forEach((id) => {

        const cell = state.allCells[id];

        let backgroundColor;
        // if cell is start cell, set background to white
        if (CellCommon.isSameCell(cell, start)) {
            backgroundColor = 'white';
        }
        // else if cell is within start-end row-col grid, add to active cells
        else if(topRow <= cell.row &&
            leftCol <= cell.column &&
            botRow >= cell.row &&
            rightCol >= cell.column)
        {
            CellStateUpdate.addToActiveCells(state, cell);
            backgroundColor = 'lightgray';
        }
        // else if cell was marked as active, remove from active cells
        else if (cell.active) {
            CellStateUpdate.removeFromActiveCells(state, cell);
            backgroundColor = 'white';
        }
        // if background color set, call update function
        if (backgroundColor) {
            $updateCell(cell, { style: { background: backgroundColor }});
        }
    });
    return;
};
