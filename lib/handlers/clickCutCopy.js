'use strict';

const { $setState } = require('../state');
const CellCommon = require('../cell/common');


module.exports = (state, type) => {

    state.activeCells = CellCommon.sortCellIdsByPosition(state.activeCells);
    $setState({ cutCopyCells: [], cutCopyType: type });

    let currentRow = [];
    let row = +state.allCells[state.activeCells[0]].row;
    state.activeCells.forEach((id) => {

        const cell = state.allCells[id];

        if (row !== cell.row) {
            // clone array and push new row array into it
            const addedLastRow = state.cutCopyCells.concat();
            addedLastRow.push(currentRow);
            $setState({ cutCopyCells: addedLastRow });
            currentRow = [];
            row = cell.row;
        }
        currentRow.push(CellCommon.copyCell(cell));
    });

    // clone array and push new row array into it
    const addedLastRow = state.cutCopyCells.concat();
    addedLastRow.push(currentRow);
    $setState({ cutCopyCells: addedLastRow });
    return;
};
