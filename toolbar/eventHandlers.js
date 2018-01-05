'use strict';

const COL_COUNT = require('../constants').COL_COUNT;
const _state = require('../state')._state;
const CellCommon = require('../cell/common');
const CellListeners = require('../cell/eventListeners');
const ToolbarCommon = require('./common');


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


module.exports = {
    handlePaste
}
