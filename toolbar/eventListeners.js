'use strict';

const _state = require('../state')._state;
const { $cell, $setCell, $state } = require('../state');
const CellCommon = require('../cell/common');
const ToolbarHandlers = require('./eventHandlers');

function eraseButton_Click () {

    _state.activeCells.forEach((id) => _state.allCells[id].input.value = '');

    // $state().activeCells.forEach((cell) => {

    //     console.log('update cell');
    //     const c = $cell(cell.id);
    //     // cell.input.value = '';
    //     $setCell({
    //         c: cell
    //     });
    // })
}

function cssButton_Click (atts) {

    _state.activeCells.forEach((id) => {

        const cell = _state.allCells[id];

        // toggle property
        let style = cell.input.style;
        style[atts.key] = style[atts.key] === atts.value ? '' : atts.value;
    });
}

function cutCopyButton_Click (type) {

    _state.activeCells = CellCommon.sortCellIdsByPosition(_state.activeCells);
    _state.cutCopy.cells = [];
    _state.cutCopy.type = type;
    let currentRow = [];
    let row;
    _state.activeCells.forEach((id) => {

        const cell = _state.allCells[id];

        if (!row) {
            row = cell.row
        }

        if (row !== cell.row) {
            _state.cutCopy.cells.push(currentRow);
            currentRow = [];
            row = cell.row;
        }
        currentRow.push(CellCommon.copyCell(cell));
    });
    _state.cutCopy.cells.push(currentRow);
    return;
}

function pasteButton_Click () {

    ToolbarHandlers.handlePaste();
}

function sumButton_Click () {

    if (!_state.activeCells || _state.activeCells.length < 2) {
        return;
    }

    const cellsByCol = {};
    let finalRow = _state.allCells[_state.activeCells[0]].row;
    _state.activeCells.forEach((id) => {

        const cell = _state.allCells[id]

        finalRow = cell.row > finalRow ? cell.row : finalRow;

        if (!cellsByCol[cell.column]) {
            cellsByCol[cell.column] = [];
        }
        cellsByCol[cell.column].push({
            val: cell.input.value || 0,
            column: cell.column,
            row: cell.row,
            id: cell.id
        })
    })

    Object.keys(cellsByCol).forEach((i) => {

        const sum = cellsByCol[i].reduce((a, b) => a += +b.val, 0);
        const column = cellsByCol[i][0].column;
        const cellToSum = _state.allCells[`r${finalRow + 1}.c${column}`]
        // const cellToSum = _state.allCells.find((c) => c.row === finalRow + 1 && c.column === column);

        _state.funcCellOutput[cellToSum.id] = cellsByCol[i].map((i) => i.id);

        cellsByCol[i].forEach((e) => {

            _state.funcCellInput[e.id] = [cellToSum.id];
        });
        cellToSum.input.value = sum;
    })
}

module.exports = {
    eraseButton_Click,
    cssButton_Click,
    cutCopyButton_Click,
    pasteButton_Click,
    sumButton_Click
}
