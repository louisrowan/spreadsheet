'use strict';

const CellDrag = require('./cellDrag');
const CommonHandler = require('./common');
const { $setState } = require('../state');

module.exports = (state, e) => {

    const dragStart = state.startCellRect;
    const dragEnd = state.endCellRect.id ? state.endCellRect : state.startCellRect;

    const { row, column } = CommonHandler.getNewCellIdFromKeydown(dragEnd, e.key);

    const cell = state.allCells[`r${row}.c${column}`];

    $setState({ cellDrag: true });
    CellDrag(state, cell);
    CommonHandler.handleCellDragEnd(state);
};
