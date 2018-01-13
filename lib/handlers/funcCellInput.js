'use strict';

const CellStateUpdate = require('../cell/stateUpdate');


module.exports = (state, cell) => {

    state.funcCellInput[cell.id].forEach((inputCellId) => {

        const cellToUpdate = state.allCells[inputCellId];
        CellStateUpdate.updateFuncCellInputValue(state, cellToUpdate);
    });
};
