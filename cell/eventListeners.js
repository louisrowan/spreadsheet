'use strict';

// const _state = require('../state')._state;
const $state = require('../state').$state;
const $setState = require('../state').$setState;
const CellCommon = require('./common');
const CellHandlers = require('./eventHandlers');


exports.cellMousedownListener = (cell) => {

    CellHandlers.handleCellMousedown(cell);
}

exports.cellMouseoverListener (cell) {

    CellHandlers.handleDrag(cell);
}

exports.cellInputListener (cell) {

    if ($state(`funcCellOutput:${cell.id}`)) {
        CellHandlers.handleFuncCellOutput(cell);
    }
    if ($state(`funcCellInput:${cell.id}`)) {
        CellHandlers.handleFuncCellInput(cell);
    }
    return;
}
