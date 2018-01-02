'use strict';

const _state = require('./state')._state;
const CellListeners = require('./cell/eventListeners');
const CellHandlers = require('./cell/eventHandlers');
const ToolbarListeners = require('./toolbar/eventListeners');
const CellCommon = require('./cell/common');
const DraggableDiv = require('./draggableDiv');
const Common = require('./common');

// common code
const getCell = (e) => {

    const input = e.target.id;
    if (!input) return;
    const cell = _state.allCells.find((c) => c.id === input.slice(5)); // input id are prefaced with 'cell-' to slice first 5 char
    if (!cell) return;
    return cell;
}

window.addEventListener('mouseup', (e) => window_Mouseup());
window.addEventListener('keydown', (e) => window_Keydown(e));
window.addEventListener('keyup', (e) => window_Keyup(e));
window.addEventListener('mousemove', (e) => window_Mousemove(e));
window.addEventListener('input', (e) => window_Input(e));
window.addEventListener('mousedown', (e) => window_Mousedown(e));
window.addEventListener('mouseover', (e) => window_Mouseover(e));

const window_Input = (e) => {

    const cell = getCell(e);
    return cell ? CellHandlers.cellInput(cell) : '';
}

const window_Mousedown = (e) => {

    const cell = getCell(e);
    return cell ? CellListeners.cellMousedown(cell) : '';
}

const window_Mouseover = (e) => {

    const cell = getCell(e);
    return cell ? CellListeners.cellMouseover(cell) : '';   
}

const window_Mousemove = (e) => {

    if (_state.colDrag) {
        handleResizeRowColumn(e, 'column');
    }
    else if (_state.rowDrag) {
        handleResizeRowColumn(e, 'row');
    }
};

const window_Mouseup = () => {

    _state.mousedown = false;
    _state.colDrag = false;
    _state.rowDrag = false;
}

const window_Keydown = (e) => {

    if (e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown') {
        return handleNavigateCells(e);
    }

    if (e.key === 'Meta') {
        return _state.commandActive = true;
    }

    if (_state.commandActive) {
        return handleCommandActiveKeydown(e);
    }
}

const window_Keyup = (e) => {

    if (e.key === 'Meta') {
        _state.commandActive = false;
    } 
}

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
        marker = _state.rowDrag;
        mousePosition = e.clientY;
        headerArray = _state.rowHeaders;
        prop = 'height';
        heightOffset = 100 + CELL_HEIGHT;
    }
    else if (type === 'column') {
        marker = _state.colDrag;
        mousePosition = e.clientX;
        headerArray = _state.columnHeaders;
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
    Common.updateHeightWidth(_spreadsheetContainer, movement, prop)

    const cells = _state.allCells.filter((c) => c[type] === marker[type] - 1);
    cells.forEach((c) => Common.updateHeightWidth(c.div, movement, prop))
    return;
}

const handleNavigateCells = (e) => {

    const activeElement = _state.allCells.find((cell) => 'cell-' + cell.id === document.activeElement.id);
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

    const newElement = _state.allCells.find((cell) => cell.row === row && cell.column === column);
    CellCommon.newSelectedCell(newElement);
    newElement.input.focus();
}
