'use strict';

const CELL_HEIGHT = require('../constants').CELL_HEIGHT;
const ROW_COUNT = require('../constants').ROW_COUNT;
const COL_COUNT = require('../constants').COL_COUNT;
const CellCommon = require('../cell/common');
const ToolbarListeners = require('../toolbar/eventListeners');
const Common = require('../common');
const DraggableDiv = require('../draggableDiv');
const $state = require('../state').$state;
const $setState = require('../state').$setState;

const handleCommandActiveKeydown = (e) => {

    if (e.key === 'c') {
        ToolbarListeners.cutCopyButton_Click('copy');
        return;
    }
    else if (e.key === 'x') {
        ToolbarListeners.cutCopyButton_Click('cut');
        return;
    }
    else if (e.key === 'v') {
        e.preventDefault();
        ToolbarListeners.pasteButton_Click();
        return;
    }
    return;
}


const handleResizeRowColumn = (e, type) => {

    DraggableDiv.hideDraggableDiv();
    CellCommon.deactivateAllCells();

    let marker;
    let mousePosition;
    let headerArray;
    let prop;
    let heightOffset;
    if (type === 'row') {
        marker = $state().rowDrag;
        mousePosition = e.clientY;
        headerArray = $state().rowHeaders;
        prop = 'height';
        heightOffset = 100 + CELL_HEIGHT;
    }
    else if (type === 'column') {
        marker = $state().colDrag;
        mousePosition = e.clientX;
        headerArray = $state().columnHeaders;
        prop = 'width';
        heightOffset = 0;
    }
    else {
        console.error('ERROR handleResizeRowColumn, type = ', type);
    }


    const i = headerArray.indexOf(marker);
    const headerToMove = headerArray[i - 1];

    const position = headerArray.slice(0, i).reduce((a, b) => a += Common.translatePxToNum(b.div.style[prop]), heightOffset)
    const movement = mousePosition - position;

    if (type === 'column' && Common.translatePxToNum(headerToMove.div.style[prop]) <= 50 && movement < 0) return;
    if (type === 'row' && Common.translatePxToNum(headerToMove.div.style[prop]) <= 25 && movement < 0) return;

    Common.updateHeightWidth(headerToMove.div, movement, prop);
    Common.updateHeightWidth(document.getElementById('spreadsheet-div'), movement, prop)

    const cells = $state().allCells.filter((c) => c[type] === marker[type] - 1);
    cells.forEach((c) => Common.updateHeightWidth(c.div, movement, prop))
    return;
}

const handleNavigateCells = (e) => {

    const activeElement = $state().allCells.find((cell) => 'cell-' + cell.id === document.activeElement.id);
    if (!activeElement) { return };
    let row = activeElement.row;
    let column = activeElement.column;

    switch (e.key) {
        case "ArrowLeft":
            column = column > 0 ? --column : 0
            break;
        case "ArrowRight":
            column = column < COL_COUNT - 1 ? ++column : 0
            break;
        case "ArrowUp":
            row = row > 0 ? --row : 0
            break;
        case "ArrowDown":
            row = row < ROW_COUNT - 1 ? ++row : 0
            break;
    }

    const newElement = $state().allCells.find((cell) => cell.row === row && cell.column === column);
    CellCommon.newSelectedCell(newElement);
    newElement.input.focus();
}

module.exports = {
    handleCommandActiveKeydown,
    handleNavigateCells,
    handleResizeRowColumn
}
