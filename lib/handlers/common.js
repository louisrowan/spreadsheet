'use strict';

const { COL_COUNT, ROW_COUNT } = require('../constants');
const CellCommon = require('../cell/common');
const CellStateUpdate = require('../cell/stateUpdate');
const { $setState } = require('../state');

exports.handleCellDragEnd = (state) => {

    const cell1 = state.startCellRect;
    const cell2 = state.endCellRect;
    const { leftCol, rightCol, topRow, botRow } = CellCommon.getMultiCellRowCol(cell1, cell2);

    const relevantCells = CellCommon.getArrayofCellIdsFromRowCol(leftCol - 5, rightCol + 5, topRow - 5, botRow + 5);

    const len = relevantCells.length;
    for (let i = 0; i < len; ++i) {

        const id = relevantCells[i];
        const cell = state.allCells[id];
        if (!cell) continue;

        if (topRow <= cell.row &&
            leftCol <= cell.column &&
            botRow >= cell.row &&
            rightCol >= cell.column)
        {
            CellStateUpdate.addToActiveCells(state, cell);
        }
        else if (cell.active) {
            CellStateUpdate.removeFromActiveCells(state, cell);
        }
    }
    $setState({ cellDrag: false });
};


exports.getNewCellIdFromKeydown = (startCell, key) => {

    let row = startCell.row;
    let column = startCell.column;

    switch (key) {
        case 'ArrowLeft':
            column = column > 0 ? --column : 0;
            break;
        case 'ArrowRight':
        console.log(column, COL_COUNT);
            column = column < COL_COUNT - 1 ? ++column : COL_COUNT - 1;
            break;
        case 'ArrowUp':
            row = row > 0 ? --row : 0;
            break;
        case 'ArrowDown':
            row = row < ROW_COUNT - 1 ? ++row : ROW_COUNT - 1;
            break;
    }

    return { row, column };
};
