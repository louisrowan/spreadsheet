'use strict';

const COL_COUNT = require('../constants').COL_COUNT;
const _state = require('../state')._state;
const CellCommon = require('../cell/common');
const CellListeners = require('../cell/eventListeners');
const ToolbarCommon = require('./common');

function handlePaste2 () {

    // sort copied cells, find top-right from active cells
    _state.cutCopy.cells = CellCommon.sortCellIdsByPosition(_state.cutCopy.cells);
    const startCell = CellCommon.sortCellIdsByPosition(_state.activeCells)[0];
    const cols = ToolbarCommon.getColumnCount(_state.cutCopy.cells)

    // reset active cells to empty, find first cell to being copying to from allCells array and its index in the array
    _state.activeCells = [];
    const ac = _state.allCells[startCell.id]
    const index = _state.allCells.indexOf(ac);

    // push cell from allCells to activeCells array, accounting for new rows
    let columnsAdded = 0;
    for (let i = index; _state.activeCells.length < _state.cutCopy.cells.length; ++i) {

        if (columnsAdded === cols) {
            i = i - cols + COL_COUNT - 1;
            columnsAdded = 0;
            if (i > _state.allCells.length) {
                break;
            }
            continue;
        }

        const newCell = _state.allCells[i];
        _state.activeCells.push(newCell);
        ++columnsAdded
    }

    // Loop through these active cells and copy value from copied array
    console.log('cut copy', _state.activeCells);
    _state.activeCells.forEach((cell, index) => {

        // console.log('cell?', cell);

        cell.input.value = _state.cutCopy.cells[index].input.value;
        CellListeners.cellInput(cell);
        if (_state.cutCopy.type === 'cut') {
            handleCut(_state.activeCells, _state.cutCopy.cells[index]);
        }
    });
}


function handlePaste () {

    // return if no active cells
    if (_state.activeCells.length < 1) {
        console.warn('pasting with no active cells')
        return
    }

    // step 1: find 'first' active elemnt
    const firstActive = CellCommon.sortCellIdsByPosition(_state.activeCells)[0];
    const firstRow = CellCommon.parseRow(firstActive);
    const firstColumn = CellCommon.parseColumn(firstActive);

    // step 2: set up looping of copy/paste rows (outer array)
    for (let r = 0; r < _state.cutCopy.cells.length; ++r) {

        const currentRow = _state.cutCopy.cells[r];
        for (let c = 0; c < currentRow.length; ++c) {

            const allCell = _state.allCells[`r${firstRow + r}.c${firstColumn + c}`];
            if (!allCell) {
                break;
            }
            CellCommon.overwriteCellProps(allCell, _state.cutCopy.cells[r][c]);

            console.log(_state.cutCopy);

            if (_state.cutCopy.type === 'cut') {
                const cutCell = _state.allCells[_state.cutCopy.cells[r][c].id];
                console.log('cutcell?', cutCell);
                CellCommon.clearCell(cutCell)
            }
        }
    }

    if (_state.cutCopy.type === 'cut') {
        _state.cutCopy.type = 'copy';
    }

}





function handleCut (pastedCells, cutCell) {

    const found = pastedCells.find((p) => CellCommon.isSameCell(p, cutCell));
    if (!found) {
        const originalCutCell = _state.allCells[cutCell.id];
        CellCommon.clearCell(originalCutCell);
    } 
}

module.exports = {
    handlePaste
}
