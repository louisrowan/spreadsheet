'use strict';

const { $setState } = require('../state');
const CellCommon = require('../cell/common');

module.exports = (state) => {

    // return if no active cells
    if (state.activeCells.length < 1) {
        return;
    }

    // step 1: find 'first' active elemnt
    const firstActive = CellCommon.sortCellIdsByPosition(state.activeCells)[0];
    const firstRow = CellCommon.parseRow(firstActive);
    const firstColumn = CellCommon.parseColumn(firstActive);

    // step 2: set up looping of copy/paste rows (outer array)
    for (let r = 0; r < state.cutCopyCells.length; ++r) {

        const currentRow = state.cutCopyCells[r];
        for (let c = 0; c < currentRow.length; ++c) {

            const allCell = state.allCells[`r${firstRow + r}.c${firstColumn + c}`];
            if (!allCell) {
                break;
            }

            CellCommon.overwriteCellProps(allCell, state.cutCopyCells[r][c]);

            if (state.cutCopyType === 'cut') {
                const cutCell = state.allCells[state.cutCopyCells[r][c].id];
                CellCommon.clearCell(state, cutCell);
            }
        }
    }

    if (state.cutCopyType === 'cut') {
        $setState({ cutCopyType: 'copy' });
    }
};
