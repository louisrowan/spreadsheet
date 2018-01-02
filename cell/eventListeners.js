'use strict';

const _state = require('../state')._state;
const CellCommon = require('./common');
const CellHandlers = require('./eventHandlers');

function cellMousedown (cell) {

    CellCommon.newSelectedCell(cell);
    _state.mousedown = true;
    return;
}

function cellMouseover (cell) {

    if (_state.mousedown) {
        CellHandlers.handleDrag(cell);
    }
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
    cellMousedown,
    cellMouseover,
    cellInput
}
