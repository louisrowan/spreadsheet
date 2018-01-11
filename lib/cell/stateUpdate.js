'use strict';

const { $setState, $updateCell, $updateFuncCellOutput, $updateFuncCellInput } = require('../state');

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

    const newValue = state.funcCellOutput[cell.id].reduce((a, b) => {

        const cellToSum = state.allCells[b];
        if (isNaN(+cellToSum.input.value)) {
            return a;
        }
        return a += +cellToSum.input.value;
    }, 0)

    $updateCell(cell, { value: newValue })
};


const updateFuncCellOutputValue = (state, cell) => {

    $updateFuncCellOutput(cell.id, null, true)
    Object.keys(state.funcCellInput).forEach((id) => {

        if (state.funcCellInput[id].includes(cell.id)) {
            const index = state.funcCellInput[id].indexOf(cell.id);
            const newInputArray = state.funcCellInput[id].concat();
            newInputArray.splice(index, 1);
            $updateFuncCellInput(id, newInputArray);
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
