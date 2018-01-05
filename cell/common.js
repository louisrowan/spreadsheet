'use strict';

const _state = require('../state')._state;
const { $state } = require('../state');
const Common = require('../common');
const CellElement = require('./elements');
const Styles = require('./styles');

function newSelectedCell(cell) {

    deactivateAllCells();
    addToActiveCells(cell);
    cell.input.style.border = '2px solid green';

    _state.startCellRect = cell;
    _state.endCellRect = {};

    const bound = getCellBounding(cell);

    _state.draggableDiv.style.visibility = 'visible';
    _state.draggableDiv.style.left = bound.x + 'px';
    _state.draggableDiv.style.top = bound.y + 'px';
    _state.draggableDiv.style.width = '0px';
    _state.draggableDiv.style.height = '0px';

    return;
};

function copyCell (cell) {

    const newCell = new CellElement.Cell(cell.row, cell.column);
    newCell.input.style = Object.assign({}, cell.input.style);
    newCell.input.value = cell.input.value;
    newCell.copied = true;

    return newCell;
};

function overwriteCellProps (origin, source) {

    origin.style = Object.assign({}, source.style);
    origin.input.value = source.input.value;
}

function sortCellIdsByPosition (cellIds) {

    return cellIds.sort((a, b) => {

        return parseRow(a) - parseRow(b) || parseColumn(a) - parseColumn(b);
    });
};

const parseRow = (id) => +id.substr(1).split('.c')[0];

const parseColumn = (id) => +id.substr(1).split('.c')[1];

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

    const column = $state(`columnHeaders:${cell.column + 1}`);
    const row = $state(`rowHeaders:${cell.row}`);
    
    return {
        x: column.position(),
        y: row.position(),
        width: Common.translatePxToNum(cell.div.style.width),
        height: Common.translatePxToNum(cell.div.style.height)
    }
}

function addToActiveCells (cell) {

    if (!$state('activeCells').find((active) => active === cell.id)) {
        _state.activeCells.push(cell.id);
        cell.active = true;
    }
    return;
}

function removeFromActiveCells(cell) {

    const index = $state('activeCells').indexOf(cell.id);
    if (index > -1) {
        _state.activeCells.splice(index, 1);
        cell.input.style.border = '1px solid rgb(238, 238, 238)';
        cell.input.style.background = 'white';
        cell.active = false;
    }
    return;
}

function deactivateAllCells() {

    Object.keys($state('allCells')).forEach((cellId) => removeFromActiveCells(_state.allCells[cellId]));
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
    deactivateAllCells,
    parseRow,
    parseColumn,
    overwriteCellProps
}
