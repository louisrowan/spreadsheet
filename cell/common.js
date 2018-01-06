'use strict';

const _state = require('../state')._state;
const { $state } = require('../state');
const Common = require('../common');
const CellElement = require('./elements');
const CellStateUpdate = require('./stateUpdate');
const WindowStateUpdate = require('../window/stateUpdate');
const Styles = require('./styles');

const internals = {};


// internal-only


// internal and external functions

internals.newSelectedCell = exports.newSelectedCell = (cell) => {

    CellStateUpdate.deactivateAllCells();
    CellStateUpdate.addToActiveCells(cell);
    CellStateUpdate.styleSelectedCell(cell);
    CellStateUpdate.updateStartCellRect(cell);
    CellStateUpdate.updateEndCellRect()

    const bound = internals.getCellBounding(cell);
    WindowStateUpdate.setDraggableDivToCell(bound);

    return;
};


internals.getCellBounding = exports.getCellBounding = (cell) => {

    const column = $state(`columnHeaders:${cell.column + 1}`);
    const row = $state(`rowHeaders:${cell.row}`);

    return {
        x: column.position(),
        y: row.position(),
        width: Common.translatePxToNum(cell.div.style.width),
        height: Common.translatePxToNum(cell.div.style.height)
    }
};


// external functions

exports.copyCell = (cell) => {

    const newCell = new CellElement.Cell(cell.row, cell.column);
    newCell.input.style = Object.assign({}, cell.input.style);
    newCell.input.value = cell.input.value;
    newCell.copied = true;

    return newCell;
};


exports.overwriteCellProps = (origin, source) => {

    origin.style = Object.assign({}, source.style);
    origin.input.value = source.input.value;
};


exports.sortCellIdsByPosition = (cellIds) => {

    return cellIds.sort((a, b) => {

        return parseRow(a) - parseRow(b) || parseColumn(a) - parseColumn(b);
    });
};


exports.parseRow = (id) => +id.substr(1).split('.c')[0];


exports.parseColumn = (id) => +id.substr(1).split('.c')[1];


exports.isSameCell = (cell1, cell2) => {

    return cell1.row === cell2.row && cell1.column === cell2.column;
};


exports.clearCell = (cell) => {

    const CellListeners = require('./eventListeners');

    cell.input.value = '';
    Styles.inputStyle(cell.input);
    CellListeners.cellInputListener(cell);
};

exports.getMultiCellDimensions = (startCell, endCell) => {

    const startBounding = internals.getCellBounding(startCell);
    const endBounding = internals.getCellBounding(endCell);

    const left = Math.min(startBounding.x, endBounding.x);
    const top = Math.min(startBounding.y, endBounding.y);
    const maxWidth = Math.max(startBounding.x + startBounding.width, endBounding.x + endBounding.width);
    const maxHeight = Math.max(startBounding.y + startBounding.height, endBounding.y + endBounding.height);
    const width = maxWidth - left;
    const height = maxHeight - top;

    return {
        left,
        top,
        width,
        height
    }
};
