'use strict';

const { $updateCell, $setState } = require('../state');
const CellCommon = require('../cell/common');
const CellStateUpdate = require('../cell/stateUpdate');
const CommonHandler = require('./common');
const WindowStateUpdate = require('../window/stateUpdate');

module.exports = (state, cell) => {

    if (!state.cellDrag) {
        $setState({ cellDrag: true });
    }

    CommonHandler.scrollToNewCell(cell, 1);

    const start = state.startCellRect;
    const { left, top, width, height } = CellCommon.getMultiCellDimensions(state, start, cell);

    $updateCell(start, { style: { border: '1px solid rgb(238, 238, 238)' }});
    CellStateUpdate.updateEndCellRect(cell);
    WindowStateUpdate.setDraggableDivToDimensions(left, top, width, height);

    const { leftCol, rightCol, topRow, botRow } = CellCommon.getMultiCellRowCol(start, cell);

    const relevantCells = CellCommon.getArrayofCellIdsFromRowCol(leftCol - 5, rightCol + 5, topRow - 5, botRow + 5);

    const len = relevantCells.length;
    for (let i = 0; i < len; ++i) {

        const id = relevantCells[i];
        const cell = state.allCells[id];
        if (!cell) continue;

        let backgroundColor;
        // if cell is start cell, set background to white
        if (CellCommon.isSameCell(cell, start)) {
            backgroundColor = 'white';
        }
        // else if cell is within start-end row-col grid, add to active cells
        else if (topRow <= cell.row &&
            leftCol <= cell.column &&
            botRow >= cell.row &&
            rightCol >= cell.column)
        {
            // CellStateUpdate.addToActiveCells(state, cell);
            backgroundColor = 'lightgray';
        }
        // else if cell was marked as active, remove from active cells
        else {
            // CellStateUpdate.removeFromActiveCells(state, cell);
            backgroundColor = 'white';
        }
        // if background color set, call update function
        if (backgroundColor) {
            $updateCell(cell, { style: { background: backgroundColor }});
        }
    }
    return;
};
