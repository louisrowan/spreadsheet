'use strict';

const { $updateCell } = require('../state');
const CellCommon = require('./common');
const CellStateUpdate = require('./stateUpdate');
const WindowStateUpdate = require('../window/stateUpdate');


const handleCellMousedown = (state, cell) => {

    CellCommon.newSelectedCell(state, cell);
    WindowStateUpdate.toggleMousedown(true)
}


const handleDrag = (state, cell) => {

    const start = state.startCellRect;
    const { left, top, width, height } = CellCommon.getMultiCellDimensions(state, start, cell);

    $updateCell(start, { style: { border: '1px solid rgb(238, 238, 238)' }});
    CellStateUpdate.updateEndCellRect(cell);
    WindowStateUpdate.setDraggableDivToDimensions(left, top, width, height)

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
            backgroundColor = 'lightgray'
        }
        // else if cell was marked as active, remove from active cells
        else if (cell.active) {
            CellStateUpdate.removeFromActiveCells(state, cell);
            backgroundColor = 'white'
        }
        // else do nothing
        else {};
        // if background color set, call update function
        if (backgroundColor) {
            $updateCell(cell, { style: { background: backgroundColor }})
        }
    });
    return;
}

const handleFuncCellInput = (state, cell) => {

    state.funcCellInput[cell.id].forEach((inputCellId) => {

        const cellToUpdate = state.allCells[inputCellId];
        CellStateUpdate.updateFuncCellInputValue(state, cellToUpdate);
    })
}

const handleFuncCellOutput = (state, cell) => {

    CellStateUpdate.updateFuncCellOutputValue(state, cell);
}

module.exports = {
    handleCellMousedown,
    handleDrag,
    handleFuncCellInput,
    handleFuncCellOutput
}
