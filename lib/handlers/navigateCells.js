'use strict';

const CellCommon = require('../cell/common');
const CommonHandler = require('./common');


module.exports = (state, e) => {

    const activeElement = state.startCellRect;
    if (!activeElement) return;

    const { row, column } = CommonHandler.getNewCellIdFromKeydown(activeElement, e.key);

    const cell = state.allCells[`r${row}.c${column}`];
    CellCommon.newSelectedCell(state, cell);


    const cellTop = cell.div.offsetTop;
    const cellBottom = cellTop + cell.div.offsetHeight;
    const cellLeft = cell.div.offsetLeft;
    const cellRight = cellLeft + cell.div.offsetWidth;

    const windowTop = window.pageYOffset;
    const windowBottom = windowTop + window.outerHeight;
    const windowLeft = window.pageXOffset;
    const windowRight = window.pageXOffset + window.outerWidth;

    // console.log('');
    // console.log('');
    // console.log('scrolled, y TOP at', window.scrollY);
    // console.log('y BOTTOM at', window.scrollY + window.outerHeight);
    // console.log('');
    // console.log('celltop', cellTop)
    // console.log('cellbottom', cellBottom)
    // console.log('');
    // console.log('windowtop', windowTop);
    // console.log('windowbottom', windowBottom);
    // console.log('windowHEIGHT', window.outerHeight);
    // console.log('');
    // console.log('');
    // if (cellTop - 100 < windowTop) {
    //     window.scrollTo(windowLeft, cellTop - 100);
    //     console.log('scrolled up to', cellTop - 100);
    // }
    // if (cellBottom > windowBottom) {
    //     window.scrollTo(windowLeft, cellBottom - window.outerHeight);
    //     console.log('scrolled down to', cellBottom - window.outerHeight, 'bottom is', cellBottom);
    // }

    // if (cellLeft < windowLeft) {
    //     window.scrollTo(cellLeft, windowTop);
    // }
    // if (cellRight > windowRight) {
    //     window.scrollTo(cellRight - window.outerWidth, windowTop)
    // }
    // console.log('');

    return;
};
