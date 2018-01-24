'use strict';

const { COL_COUNT, ROW_COUNT, TOOLBAR_HEIGHT, COLUMN_HEADER_HEIGHT, ROW_HEADER_WIDTH } = require('../constants');
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


exports.scrollToNewCell = (cell, offset = 0) => {

    const cellTop = cell.div.offsetTop;
    const cellBottom = cellTop + cell.div.offsetHeight;
    const cellLeft = cell.div.offsetLeft;
    const cellRight = cellLeft + cell.div.offsetWidth;

    const windowTop = window.pageYOffset;
    const windowBottom = windowTop + window.innerHeight;
    const windowLeft = window.pageXOffset;
    const windowRight = window.pageXOffset + window.innerWidth;

    // if (offset > 0) {

    //     console.log('os');
    //     console.log('ct', cellTop, 'wt', windowTop);
    //     console.log(cellTop - (TOOLBAR_HEIGHT + (offset * CELL_HEIGHT)));

    //     if (cellTop - (TOOLBAR_HEIGHT + CELL_HEIGHT + (offset * CELL_HEIGHT)) <= windowTop) {
    //         window.scrollTo(windowLeft, cellTop - (TOOLBAR_HEIGHT + CELL_HEIGHT));
    //         console.log('scroll up');
    //     }
    //     if (cellBottom + (offset * CELL_HEIGHT) >= windowBottom) {
    //         window.scrollTo(windowLeft, cellBottom - window.innerHeight);
    //         console.log('scroll down');
    //     }

    //     if (cellLeft - (offset * CELL_WIDTH) <= windowLeft) {
    //         window.scrollTo(cellLeft - CELL_WIDTH, windowTop);
    //     }
    //     if (cellRight - (offset * CELL_WIDTH) >= windowRight) {
    //         window.scrollTo(cellRight - window.innerWidth, windowTop)
    //     }
    //     return;
    // }


    if (cellTop - (TOOLBAR_HEIGHT + COLUMN_HEADER_HEIGHT) < windowTop) {
        window.scrollTo(windowLeft, cellTop - (TOOLBAR_HEIGHT + COLUMN_HEADER_HEIGHT));
    }
    if (cellBottom > windowBottom) {
        window.scrollTo(windowLeft, cellBottom - window.innerHeight);
    }

    if (cellLeft - ROW_HEADER_WIDTH < windowLeft) {
        window.scrollTo(cellLeft - ROW_HEADER_WIDTH, windowTop);
    }
    if (cellRight > windowRight) {
        window.scrollTo(cellRight - window.innerWidth, windowTop);
    }

    return;
};
