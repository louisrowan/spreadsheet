'use strict';

// const _state = require('../state')._state;
const $state = require('../state').$state;
const $setState = require('../state').$setState;
const CellCommon = require('./common');
const CellHandlers = require('./eventHandlers');

function cellMousedown (cell) {

    CellCommon.newSelectedCell(cell);
    $setState({
        mousedown: true
    });
    return;
}

function cellMouseover (cell) {

    if ($state('mousedown')) {
        CellHandlers.handleDrag(cell);
    }
    return;
}

function cellInput (cell) {

    if ($state(`funcCellOutput:${cell.id}`)) {
        CellHandlers.handleFuncCellOutput(cell);
    }
    if ($state(`funcCellInput:${cell.id}`)) {
        CellHandlers.handleFuncCellInput(cell);
    }
    return;
}

module.exports = {
    cellMousedown,
    cellMouseover,
    cellInput
}
