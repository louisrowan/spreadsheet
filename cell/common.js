'use strict';

function newSelectedCell(cell) {

    deactivateAllCells();
    addToActiveCells(cell);
    cell.input.style.border = '2px solid green';

    _state.startCellRect = cell;
    _state.endCellRect = {};

    const draggableDiv = _state.draggableDiv;
    const bound = getCellBounding(cell);

    draggableDiv.style.visibility = 'visible';
    draggableDiv.style.left = bound.x + 'px';
    draggableDiv.style.top = bound.y + 'px';
    draggableDiv.style.width = '0px';
    draggableDiv.style.height = '0px';

    return;
};

function copyCell (cell) {

    const newCell = new Cell();
    newCell.input.value = cell.input.value;
    newCell.copied = true;

    return newCell;
};

function sortCellsByPosition (cells) {

    return cells.sort((a, b) => {

        return a.row - b.row || a.column - b.column;
    });
};

function isSameCell (cell1, cell2) {

    return cell1.row === cell2.row && cell1.column === cell2.column;
}

function clearCell (cell) {

    cell.input.value = '';
    inputStyle(cell.input);
    cellInput(cell);
}

function getCellBounding (cell) {

    const column = _state.columnHeaders[cell.column + 1];
    const row = _state.rowHeaders[cell.row];
    
    return {
        x: column.position(),
        y: row.position(),
        width: translatePxToNum(cell.div.style.width),
        height: translatePxToNum(cell.div.style.height)
    }
}

function addToActiveCells (cell) {

    if (!_state.activeCells.find((active) => active.id === cell.id)) {
        _state.activeCells.push(cell);
        cell.active = true;
    }
    return;
}

function removeFromActiveCells(cell) {

    const index = _state.activeCells.indexOf(cell);
    if (index > -1) {
        _state.activeCells.splice(index, 1);
        cell.input.style.border = '1px solid rgb(238, 238, 238)';
        cell.input.style.background = 'white';
        cell.active = false;
    }
    return;
}

function deactivateAllCells() {

    _state.allCells.forEach((cell) => removeFromActiveCells(cell));
    return;
}

