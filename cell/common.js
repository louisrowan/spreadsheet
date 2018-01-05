'use strict';

const _state = require('../state')._state;
const Common = require('../common');
const CellElement = require('./elements');
const Styles = require('./styles');

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

    const newCell = new CellElement.Cell(cell.row, cell.column);
    newCell.input.style = Object.assign({}, cell.input.style);
    newCell.input.value = cell.input.value;
    newCell.copied = true;

    return newCell;
};

function sortCellIdsByPosition (cellIds) {

    const splitId = (id) => {

        id = id.substr(1).split('.c');
        return {
            row: id[0],
            column: id[1]
        }
    }

    return cellIds.sort((a, b) => {

        return splitId(a).row - splitId(b).row || splitId(a).column - splitId(b).column;
    });
};

function isSameCell (cell1, cell2) {

    return cell1.row === cell2.row && cell1.column === cell2.column;
}

function clearCell (cell) {

    const CellListeners = require('./eventListeners');

    cell.input.value = '';
    Styles.inputStyle(cell.input);
    CellListeners.cellInput(cell);
}

function getCellBounding (cell) {

    const column = _state.columnHeaders[cell.column + 1];
    const row = _state.rowHeaders[cell.row];
    
    return {
        x: column.position(),
        y: row.position(),
        width: Common.translatePxToNum(cell.div.style.width),
        height: Common.translatePxToNum(cell.div.style.height)
    }
}

function addToActiveCells (cell) {

    if (!_state.activeCells.find((active) => active === cell.id)) {
        _state.activeCells.push(cell.id);
        cell.active = true;
    }
    return;
}

function removeFromActiveCells(cell) {

    const index = _state.activeCells.indexOf(cell.id);
    if (index > -1) {
        _state.activeCells.splice(index, 1);
        cell.input.style.border = '1px solid rgb(238, 238, 238)';
        cell.input.style.background = 'white';
        cell.active = false;
    }
    return;
}

function deactivateAllCells() {

    Object.keys(_state.allCells).forEach((cell) => removeFromActiveCells(_state.allCells[cell]));
    return;
}

module.exports = {
    newSelectedCell,
    copyCell,
    sortCellIdsByPosition,
    isSameCell,
    clearCell,
    getCellBounding,
    addToActiveCells,
    removeFromActiveCells,
    deactivateAllCells
}
