'use strict';

function newSelectedCell(cell) {

    deactivateAllCells();
    addToActiveCells(cell);
    cell.input.style.border = '2px solid green';

    const draggableDiv = _state.draggableDiv;
    const startCellRect = cell;
    _state.startCellRect = startCellRect;
    _state.endCellRect = {};

    const startCellBounding = startCellRect.div.getBoundingClientRect();

    draggableDiv.style.left = startCellBounding.x + 'px';
    draggableDiv.style.top = startCellBounding.y + 'px';
    draggableDiv.style.width = '0px';
    draggableDiv.style.height = '0px';
    return;
};

function copyCell (cell) {

    const newCell = new Cell();
    newCell.input.value = cell.input.value;

    return newCell;
};

function sortCellsByPosition (cells) {

    return cells.sort((a, b) => {

        return a.row - b.row || a.column - b.column;
    });
};