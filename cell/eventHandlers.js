'use strict';

function handleDrag(cell) {

    const draggableDiv = _state.draggableDiv;
    const end = cell;
    const endBounding = end.div.getBoundingClientRect();
    const start = _state.startCellRect;
    const startBounding = start.div.getBoundingClientRect();
    _state.endCellRect = end;

    const left = Math.min(startBounding.x, endBounding.x);
    const top = Math.min(startBounding.y, endBounding.y);

    const maxWidth = Math.max(startBounding.x + startBounding.width, endBounding.x + endBounding.width);
    const maxHeight = Math.max(startBounding.y + startBounding.height, endBounding.y + endBounding.height);

    const width = maxWidth - left;
    const height = maxHeight - top;

    draggableDiv.style.left = left + 'px';
    draggableDiv.style.top = top + 'px';
    draggableDiv.style.width = width + 'px';
    draggableDiv.style.height = height + 'px';


    const leftCol = Math.min(start.column, end.column);
    const rightCol = Math.max(start.column, end.column);
    const topRow = Math.min(start.row, end.row);
    const botRow = Math.max(start.row, end.row);

    _state.allCells.forEach((cell) => {

        if (cell.copied) { return };

        if(topRow <= cell.row &&
            leftCol <= cell.column &&
            botRow >= cell.row &&
            rightCol >= cell.column)
        {
            addToActiveCells(cell);
            cell.input.style.background = 'whitesmoke';
        } else {
            removeFromActiveCells(cell);
            cell.input.style.background = 'white';
        }
    });
    return;
}

function addToActiveCells(cell) {

    if (!_state.activeCells.find((active) => active.id === cell.id)) {
        _state.activeCells.push(cell);
    }
    return;
}

function removeFromActiveCells(cell) {

    const index = _state.activeCells.indexOf(cell);
    if (index > -1) {
        _state.activeCells.splice(index, 1);
        cell.input.style.border = '1px solid rgb(238, 238, 238)';
        cell.input.style.background = 'white';
    }
    return;
}

function deactivateAllCells() {

    _state.allCells.forEach((cell) => removeFromActiveCells(cell));
    return;
}
