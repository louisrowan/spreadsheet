'use strict';

const CellCommon = require('../cell/common');
const CommonHandler = require('./common');


module.exports = (state, e) => {

    const activeElement = state.startCellRect;
    if (!activeElement) return;

    const { row, column } = CommonHandler.getNewCellIdFromKeydown(activeElement, e.key);

    const cell = state.allCells[`r${row}.c${column}`];
    CellCommon.newSelectedCell(state, cell);

    CommonHandler.scrollToNewCell(cell);


    // const cellTop = cell.div.offsetTop;
    // const cellBottom = cellTop + cell.div.offsetHeight;
    // const cellLeft = cell.div.offsetLeft;
    // const cellRight = cellLeft + cell.div.offsetWidth;

    // const windowTop = window.pageYOffset;
    // const windowBottom = windowTop + window.innerHeight;
    // const windowLeft = window.pageXOffset;
    // const windowRight = window.pageXOffset + window.innerWidth;


    // if (cellTop - 140 < windowTop) {
    //     window.scrollTo(windowLeft, cellTop - 140);
    // }
    // if (cellBottom > windowBottom) {
    //     window.scrollTo(windowLeft, cellBottom - window.innerHeight);
    // }

    // if (cellLeft - 80 < windowLeft) {
    //     window.scrollTo(cellLeft - 80, windowTop);
    // }
    // if (cellRight > windowRight) {
    //     window.scrollTo(cellRight - window.innerWidth, windowTop)
    // }

    return;
};
