'use strict';

window.addEventListener('mouseup', (e) => window_Mouseup());
window.addEventListener('keydown', (e) => window_Keydown(e));
window.addEventListener('keyup', (e) => window_Keyup(e));
window.addEventListener('mousemove', (e) => window_Mousemove(e));


function window_Mousemove (e) {

    if (_state.colDrag) {
        handleResizeRowColumn(e, 'column');
    }
    else if (_state.rowDrag) {
        handleResizeRowColumn(e, 'row');
    }
};

function window_Mouseup () {

    _state.mousedown = false;
    _state.colDrag = false;
    _state.rowDrag = false;
}

function window_Keydown (e) {

    if (e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown') {
        handleMove(e);
        return;
    }

    if (e.key === 'Meta') {
        _state.commandActive = true;
    }

    if (_state.commandActive) {
        if (e.key === 'c') {
            cutCopyButton_Click('copy');
            return;
        }
        else if (e.key === 'x') {
            cutCopyButton_Click('cut');
            return;
        }
        else if (e.key === 'v') {
            e.preventDefault();
            pasteButton_Click();
            return;
        }
    }
}


const handleResizeRowColumn = (e, type) => {

    hideDraggableDiv();
    deactivateAllCells();

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

    const position = headerArray.slice(0, i).reduce((a, b) => a += translatePxToNum(b.div.style[prop]), heightOffset)
    const movement = mousePosition - position;

    if (type === 'column' && translatePxToNum(headerToMove.div.style[prop]) <= 50 && movement < 0) return;
    if (type === 'row' && translatePxToNum(headerToMove.div.style[prop]) <= 25 && movement < 0) return;

    updateHeightWidth(headerToMove.div, movement, prop);
    updateHeightWidth(_spreadsheetContainer, movement, prop)

    const cells = _state.allCells.filter((c) => c[type] === marker[type] - 1);
    cells.forEach((c) => updateHeightWidth(c.div, movement, prop))
    return;
}


function window_Keyup (e) {

    if (e.key === 'Meta') {
        _state.commandActive = false;
    } 
}

function handleMove(e) {

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
    newSelectedCell(newElement);
    newElement.input.focus();
}
