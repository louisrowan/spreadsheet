'use strict';

function handleDrag(cell) {

    const draggableDiv = _state.draggableDiv;
    const start = _state.startCellRect;

    const endBounding = getCellBounding(cell);
    const startBounding = getCellBounding(start);
    _state.endCellRect = cell;

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


    const leftCol = Math.min(start.column, cell.column);
    const rightCol = Math.max(start.column, cell.column);
    const topRow = Math.min(start.row, cell.row);
    const botRow = Math.max(start.row, cell.row);

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
