'use strict';

const { $updateFuncCellOutput, $updateFuncCellInput, $updateCell } = require('../state');


module.exports = (state) => {

    if (!state.activeCells || state.activeCells.length < 2) {
        return;
    }

    const cellsByCol = {};
    let finalRow = state.allCells[state.activeCells[0]].row;
    state.activeCells.forEach((id) => {

        const cell = state.allCells[id];

        finalRow = cell.row > finalRow ? cell.row : finalRow;

        if (!cellsByCol[cell.column]) {
            cellsByCol[cell.column] = [];
        }
        cellsByCol[cell.column].push({
            val: cell.input.value || 0,
            column: cell.column,
            row: cell.row,
            id: cell.id
        });
    });

    Object.keys(cellsByCol).forEach((i) => {

        const sum = cellsByCol[i].reduce((a, b) => a += +b.val, 0);
        const column = cellsByCol[i][0].column;
        const cellToSum = state.allCells[`r${finalRow + 1}.c${column}`];

        const outputArray = cellsByCol[i].map((i) => i.id);
        $updateFuncCellOutput(cellToSum.id, outputArray);

        cellsByCol[i].forEach((e) => {

            const inputArray = state.funcCellInput[e.id] ? state.funcCellInput[e.id].concat() : [];
            inputArray.push(cellToSum.id);
            $updateFuncCellInput(e.id, inputArray);
        });
        $updateCell(cellToSum, { value: sum });
    });
};
