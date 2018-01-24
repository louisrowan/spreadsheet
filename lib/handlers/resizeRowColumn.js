'use strict';

const { CELL_HEIGHT, TOOLBAR_HEIGHT, COLUMN_HEADER_HEIGHT, ROW_HEADER_WIDTH } = require('../constants');
const CellStateUpdate = require('../cell/stateUpdate');
const Common = require('../common');
const DraggableDiv = require('../draggableDiv');
const { $updateElementStyle, $updateCell } = require('../state');


module.exports = (state, e, type) => {

    DraggableDiv.hideDraggableDiv();
    CellStateUpdate.deactivateAllCells(state);

    let marker;
    let mousePosition;
    let headerArray;
    let prop;
    let offset;
    if (type === 'row') {
        marker = state.rowDrag;
        mousePosition = e.clientY;
        headerArray = state.rowHeaders;
        prop = 'height';
        offset = TOOLBAR_HEIGHT + COLUMN_HEADER_HEIGHT;
    }
    else if (type === 'column') {
        marker = state.colDrag;
        mousePosition = e.clientX;
        headerArray = state.columnHeaders;
        prop = 'width';
        offset = ROW_HEADER_WIDTH;
    }
    else {
        console.error('ERROR handleResizeRowColumn, type = ', type); // eslint-disable-line
    }

    const i = +marker;
    const headerToMove = headerArray[i - 1];

    const position = headerArray.slice(0, i).reduce((a, b) => a += Common.translatePxToNum(b.div.style[prop]), offset);
    const movement = mousePosition - position;

    if (type === 'column' && Common.translatePxToNum(headerToMove.div.style[prop]) <= 50 && movement < 0) return;
    if (type === 'row' && Common.translatePxToNum(headerToMove.div.style[prop]) <= 25 && movement < 0) return;

    const headerChange = Common.getNewHeightWidth(headerToMove.div, movement, prop);
    $updateElementStyle(headerToMove.div, headerChange);

    const containerChange = Common.getNewHeightWidth(state.spreadsheetContainer, movement, prop);
    $updateElementStyle(state.spreadsheetContainer, containerChange);

    const headerContainerEl = document.getElementById(`${type}-header-div`);
    const headerContainerChange = Common.getNewHeightWidth(headerContainerEl, movement, prop);
    $updateElementStyle(headerContainerEl, headerContainerChange);

    const cells = Object.keys(state.allCells).filter((c) => {

        const cell = state.allCells[c];
        return cell[type] === marker - 1;
    });
    cells.forEach((c) => {

        const cell = state.allCells[c];
        const cellChange = Common.getNewHeightWidth(cell.div, movement, prop);
        $updateCell(cell, { divStyle: cellChange });
    });
    return;
};
