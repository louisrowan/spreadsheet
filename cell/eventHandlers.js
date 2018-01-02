'use strict';

const _state = require('../state')._state;
const Styles = require('./styles');
const CellCommon = require('./common');

const handleDrag = (cell) => {

    const draggableDiv = _state.draggableDiv;
    const start = _state.startCellRect;
    Styles.inputStyle(start.input);

    console.log('common?', CellCommon);

    const endBounding = CellCommon.getCellBounding(cell);
    const startBounding = CellCommon.getCellBounding(start);
    _state.endCellRect = cell;

    const left = Math.min(startBounding.x, endBounding.x);
    const top = Math.min(startBounding.y, endBounding.y);

    const maxWidth = Math.max(startBounding.x + startBounding.width, endBounding.x + endBounding.width);
    const maxHeight = Math.max(startBounding.y + startBounding.height, endBounding.y + endBounding.height);

    const width = maxWidth - left;
    const height = maxHeight - top;

    draggableDiv.style.left = left + 'px';
    draggableDiv.style.top = top + 'px';
    draggableDiv.style.width = width + 'px';
    draggableDiv.style.height = height + 'px';


    const leftCol = Math.min(start.column, cell.column);
    const rightCol = Math.max(start.column, cell.column);
    const topRow = Math.min(start.row, cell.row);
    const botRow = Math.max(start.row, cell.row);

    _state.allCells.forEach((cell) => {

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

    _state.funcCellInput[cell.id].forEach((inputCell) => {

        const cellToUpdate = _state.allCells.find((c) => c.id === inputCell);
        cellToUpdate.input.value = _state.funcCellOutput[inputCell].reduce((a, b) => {

            const cellToSum = _state.allCells.find((_c) => _c.id === b);
            if (isNaN(+cellToSum.input.value)) {
                return a;
            }
            return a += +cellToSum.input.value;
        }, 0)
    })
}

const handleFuncCellOutput = (cell) => {

    delete _state.funcCellOutput[cell.id];
    Object.keys(_state.funcCellInput).forEach((each) => {

        if (_state.funcCellInput[each].includes(cell.id)) {
            delete _state.funcCellInput[each];
        }
    })
    return;
}

function cellInput (cell) {

    if (_state.funcCellOutput[cell.id]) {
        CellHandlers.handleFuncCellOutput(cell);
    }
    if (_state.funcCellInput[cell.id]) {
        CellHandlers.handleFuncCellInput(cell);
    }
    return;
}

module.exports = {
    handleDrag,
    handleFuncCellInput,
    handleFuncCellOutput,
    cellInput
}
