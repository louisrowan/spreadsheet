'use strict';

const { ROW_COUNT, COL_COUNT } = require('../constants');
const CellCommon = require('../cell/common');


module.exports = (state, e) => {

    const activeElement = state.startCellRect;
    if (!activeElement) return;

    let row = activeElement.row;
    let column = activeElement.column;

    switch (e.key) {
        case 'ArrowLeft':
            column = column > 0 ? --column : 0;
            break;
        case 'ArrowRight':
            column = column < COL_COUNT - 1 ? ++column : 0;
            break;
        case 'ArrowUp':
            row = row > 0 ? --row : 0;
            break;
        case 'ArrowDown':
            row = row < ROW_COUNT - 1 ? ++row : 0;
            break;
    }

    const cell = state.allCells[`r${row}.c${column}`];
    CellCommon.newSelectedCell(state, cell);

    return;
};
