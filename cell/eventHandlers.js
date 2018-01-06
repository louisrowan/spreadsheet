'use strict';

const { $state } = require('../state');
const Styles = require('./styles');
const CellCommon = require('./common');
const CellStateUpdate = require('./stateUpdate');
const WindowStateUpdate = require('../window/stateUpdate');


const handleCellMousedown = (cell) => {

    CellCommon.newSelectedCell(cell);
    WindowStateUpdate.toggleMousedown(true)
}


const handleDrag = (cell) => {

    const start = $state('startCellRect');
    const { left, top, width, height } = CellCommon.getMultiCellDimensions(start, cell);

    Styles.inputStyle(start.input);
    CellStateUpdate.updateEndCellRect(cell);
    WindowStateUpdate.setDraggableDivToDimensions(left, top, width, height)

    const leftCol = Math.min(start.column, cell.column);
    const rightCol = Math.max(start.column, cell.column);
    const topRow = Math.min(start.row, cell.row);
    const botRow = Math.max(start.row, cell.row);

    Object.keys($state('allCells')).forEach((id) => {

        const cell = $state(`allCells:${id}`);

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
            CellStateUpdate.addToActiveCells(cell);
            backgroundColor = 'lightgray'
        }
        // else if cell was marked as active, remove from active cells
        else if (cell.active) {
            CellStateUpdate.removeFromActiveCells(cell);
            backgroundColor = 'white'
        }
        // else do nothing
        else {};
        // if background color set, call update function
        if (backgroundColor) {
            CellStateUpdate.updateCellStyleBackground(cell, backgroundColor)
        }
    });
    return;
}

const handleFuncCellInput = (cell) => {

    $state(`funcCellInput:${cell.id}`).forEach((inputCellId) => {

        const cellToUpdate = $state(`allCells:${inputCellId}`);
        CellStateUpdate.updateFuncCellInputValue(cellToUpdate);
    })
}

const handleFuncCellOutput = (cell) => {

    CellStateUpdate.updateFuncCellOutputValue(cell);
}

module.exports = {
    handleCellMousedown,
    handleDrag,
    handleFuncCellInput,
    handleFuncCellOutput
}
