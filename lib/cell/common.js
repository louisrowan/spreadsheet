'use strict';

const { $updateCell } = require('../state');
const { ROW_HEADER_WIDTH } = require('../constants');
const Common = require('../common');
const CellElement = require('./elements');
const Prehandler = require('../preHandler');
const CellStateUpdate = require('./stateUpdate');
const WindowStateUpdate = require('../window/stateUpdate');


const internals = {};

// internal-only


// internal and external functions

internals.newSelectedCell = exports.newSelectedCell = (state, cell) => {

    CellStateUpdate.deactivateAllCells(state);
    CellStateUpdate.addToActiveCells(state, cell);
    CellStateUpdate.styleSelectedCell(cell);
    CellStateUpdate.updateStartCellRect(cell);
    CellStateUpdate.updateEndCellRect();

    const bound = internals.getCellBounding(state, cell);
    WindowStateUpdate.setDraggableDivToCell(bound);

    return;
};


internals.getCellBounding = exports.getCellBounding = (state, cell) => {

    let column = state.columnHeaders[cell.column - 1];
    const row = state.rowHeaders[cell.row];

    if (!column) {
        column = {
            position: () => ROW_HEADER_WIDTH
        };
    }

    return {
        x: column.position(),
        y: row.position(),
        width: Common.translatePxToNum(cell.div.style.width),
        height: Common.translatePxToNum(cell.div.style.height)
    };
};


internals.parseRow = exports.parseRow = (id) => +id.substr(1).split('.c')[0];


internals.parseColumn = exports.parseColumn = (id) => +id.substr(1).split('.c')[1];


// external functions

exports.copyCell = (cell) => {

    const newCell = new CellElement.Cell(cell.row, cell.column);
    newCell.input.style = Object.assign({}, cell.input.style);
    newCell.input.value = cell.input.value;
    newCell.copied = true;

    return newCell;
};


exports.overwriteCellProps = (origin, source) => {

    const sourceStyle = source.input.style;

    $updateCell(origin, {
        style: {
            fontWeight: sourceStyle.fontWeight,
            fontStyle: sourceStyle.fontStyle,
            textDecoration: sourceStyle.textDecoration,
            textAlign: sourceStyle.textAlign
        },
        value: source.input.value
    });
};


exports.sortCellIdsByPosition = (cellIds) => {

    return cellIds.sort((a, b) => {

        return internals.parseRow(a) - internals.parseRow(b) || internals.parseColumn(a) - internals.parseColumn(b);
    });
};


exports.isSameCell = (cell1, cell2) => {

    return cell1.row === cell2.row && cell1.column === cell2.column;
};


exports.clearCell = (state, cell) => {

    Prehandler.cellInput({
        state,
        e: {},
        cell,
        clear: true
    });
};


exports.getMultiCellDimensions = (state, startCell, endCell) => {

    const startBounding = internals.getCellBounding(state, startCell);
    const endBounding = internals.getCellBounding(state, endCell);

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
    };
};


exports.getMultiCellRowCol = (cell1, cell2) => {

    const leftCol = Math.min(cell1.column, cell2.column);
    const rightCol = Math.max(cell1.column, cell2.column);
    const topRow = Math.min(cell1.row, cell2.row);
    const botRow = Math.max(cell1.row, cell2.row);

    return { leftCol, rightCol, topRow, botRow };
};


exports.getArrayofCellIdsFromRowCol = (leftCol, rightCol, topRow, botRow) => {

    const cellIds = [];

    for (let c = leftCol; c <= rightCol; ++c) {

        for (let r = topRow; r <= botRow; ++r) {

            cellIds.push(`r${r}.c${c}`);
        }
    }
    return cellIds;
};
