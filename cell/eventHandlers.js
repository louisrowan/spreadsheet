'use strict';

const _state = require('../state')._state;
const { $state } = require('../state');
const Styles = require('./styles');
const CellCommon = require('./common');

const handleDrag = (cell) => {

    const start = $state('startCellRect');
    Styles.inputStyle(start.input);

    const endBounding = CellCommon.getCellBounding(cell);
    const startBounding = CellCommon.getCellBounding(start);
    _state.endCellRect = cell;

    const left = Math.min(startBounding.x, endBounding.x);
    const top = Math.min(startBounding.y, endBounding.y);

    const maxWidth = Math.max(startBounding.x + startBounding.width, endBounding.x + endBounding.width);
    const maxHeight = Math.max(startBounding.y + startBounding.height, endBounding.y + endBounding.height);

    const width = maxWidth - left;
    const height = maxHeight - top;

    _state.draggableDiv.style.left = left + 'px';
    _state.draggableDiv.style.top = top + 'px';
    _state.draggableDiv.style.width = width + 'px';
    _state.draggableDiv.style.height = height + 'px';


    const leftCol = Math.min(start.column, cell.column);
    const rightCol = Math.max(start.column, cell.column);
    const topRow = Math.min(start.row, cell.row);
    const botRow = Math.max(start.row, cell.row);

    Object.keys($state('allCells')).forEach((id) => {

        const cell = $state(`allCells:${id}`);

        if (cell.copied) { return };

        if (CellCommon.isSameCell(cell, start)) {
            cell.input.style.background = 'white';
        }
        else if(topRow <= cell.row &&
            leftCol <= cell.column &&
            botRow >= cell.row &&
            rightCol >= cell.column)
        {
            CellCommon.addToActiveCells(cell);
            cell.input.style.background = 'lightgray';
        } else if (cell.active) {
            CellCommon.removeFromActiveCells(cell);
            cell.input.style.background = 'white';
        }
    });
    return;
}

const handleFuncCellInput = (cell) => {

    $state(`funcCellInput:${cell.id}`).forEach((inputCellId) => {

        const cellToUpdate = $state(`allCells:${inputCellId}`)
        cellToUpdate.input.value = $state(`funcCellOutput:${inputCellId}`).reduce((a, b) => {

            const cellToSum = $state(`allCells:${b}`);
            if (isNaN(+cellToSum.input.value)) {
                return a;
            }
            return a += +cellToSum.input.value;
        }, 0)
    })
}

const handleFuncCellOutput = (cell) => {

    delete _state.funcCellOutput[cell.id];
    Object.keys($state('funcCellInput')).forEach((id) => {

        if ($state(`funcCellInput:${id}`).includes(cell.id)) {
            const index = $state(`funcCellInput:${id}`).indexOf(cell.id)
            _state.funcCellInput[id].splice(index, 1)
        }
    })
    return;
}

module.exports = {
    handleDrag,
    handleFuncCellInput,
    handleFuncCellOutput
}
