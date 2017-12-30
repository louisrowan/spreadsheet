'use strict';

function newSelectedCell(cell) {

    deactivateAllCells();
    addToActiveCells(cell);
    cell.input.style.border = '2px solid green';

    const draggableDiv = _state.draggableDiv;
    const startCellRect = cell;
    _state.startCellRect = startCellRect;
    _state.endCellRect = {};

    const column = _state.columnHeaders[cell.column + 1];
    const row = _state.rowHeaders[cell.row];

    console.log('col', column);
    
    const startCellBounding = {
        x: column.position(),
        y: row.position(),
        width: translatePxToNum(cell.div.style.width),
        height: translatePxToNum(cell.div.style.height)
    }

    draggableDiv.style.left = startCellBounding.x + 'px';
    draggableDiv.style.top = startCellBounding.y + 'px';
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
}
