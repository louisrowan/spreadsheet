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

module.exports = {
    cellMousedown,
    cellMouseover
}
