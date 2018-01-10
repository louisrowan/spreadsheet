'use strict';

const { $setState, $updateCell } = require('../state');

const addToActiveCells = (state, cell) => {

    if (!state.activeCells.find((active) => active === cell.id)) {
        $setState({ activeCells: state.activeCells.concat(cell.id)});
        $updateCell(cell, { active: true });
    }
};


const removeFromActiveCells = (state, cell) => {

    const index = state.activeCells.indexOf(cell.id);
    if (index > -1) {
        const activeCells = state.activeCells.concat(); // clone
        activeCells.splice(index, 1);
        $setState({ activeCells: activeCells })
        $updateCell(cell, {
            style: {
                border: '1px solid rgb(238, 238, 238)',
                background: 'white'
            },
            active: false
        });
    }
};


const deactivateAllCells = (state) => {

    Object.keys(state.allCells).forEach((id) => {

        const cell = state.allCells[id];
        removeFromActiveCells(state, cell);
    })
};


const styleSelectedCell = (cell) => {

    $updateCell(cell, { style: { border: '2px solid green' }});
};


const updateStartCellRect = (cell = {}) => {

    $setState({ startCellRect: cell })
};


const updateEndCellRect = (cell = {}) => {

    $setState({ endCellRect: cell })
};


const updateFuncCellInputValue = (state, cell) => {

    cell.input.value = state.funcCellOutput[cell.id].reduce((a, b) => {

        const cellToSum = state.allCells[b];
        if (isNaN(+cellToSum.input.value)) {
            return a;
        }
        return a += +cellToSum.input.value;
    }, 0)
};


const updateFuncCellOutputValue = (state, cell) => {

    delete state.funcCellOutput[cell.id];
    Object.keys(state.funcCellInput).forEach((id) => {

        if (state.funcCellInput[id].includes(cell.id)) {
            const index = state.funcCellInput[id].indexOf(cell.id)
            state.funcCellInput[id].splice(index, 1)
        }
    })
};


module.exports = {
    addToActiveCells,
    removeFromActiveCells,
    deactivateAllCells,
    styleSelectedCell,
    updateStartCellRect,
    updateEndCellRect,
    updateFuncCellInputValue,
    updateFuncCellOutputValue
};
