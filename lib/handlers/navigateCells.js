'use strict';

const CellCommon = require('../cell/common');
const CommonHandler = require('./common');


module.exports = (state, e) => {

    const activeElement = state.startCellRect;
    if (!activeElement) return;

    const { row, column } = CommonHandler.getNewCellIdFromKeydown(activeElement, e.key);

    const cell = state.allCells[`r${row}.c${column}`];
    CellCommon.newSelectedCell(state, cell);

    return;
};
