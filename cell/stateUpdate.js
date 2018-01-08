'use strict';

const { _state, $state } = require('../state');

const addToActiveCells = (cell) => {

    if (!$state('activeCells').find((active) => active === cell.id)) {
        _state.activeCells.push(cell.id);
        cell.active = true;
    }
}

const removeFromActiveCells = (cell) => {

    const index = $state('activeCells').indexOf(cell.id);
    if (index > -1) {
        _state.activeCells.splice(index, 1);
        cell.input.style.border = '1px solid rgb(238, 238, 238)';
        cell.input.style.background = 'white';
        cell.active = false;
    }
}

const deactivateAllCells = () => {

    Object.keys($state('allCells')).forEach((cellId) => removeFromActiveCells(_state.allCells[cellId]));
}

const styleSelectedCell = (cell) => {

    cell.input.style.border = '2px solid green';
}

const updateStartCellRect = (cell) => {

    _state.startCellRect = cell || {};
}

const updateEndCellRect = (cell) => {

    _state.endCellRect = cell || {};
}

const updateCellStyleBackground = (cell, color) => {

    cell.input.style.background = color;
}

const updateFuncCellInputValue = (cell) => {

    cell.input.value = $state(`funcCellOutput:${cell.id}`).reduce((a, b) => {

        const cellToSum = $state(`allCells:${b}`);
        if (isNaN(+cellToSum.input.value)) {
            return a;
        }
        return a += +cellToSum.input.value;
    }, 0)
}

const updateFuncCellOutputValue = (cell) => {

    delete _state.funcCellOutput[cell.id];
    Object.keys($state('funcCellInput')).forEach((id) => {

        if ($state(`funcCellInput:${id}`).includes(cell.id)) {
            const index = $state(`funcCellInput:${id}`).indexOf(cell.id)
            _state.funcCellInput[id].splice(index, 1)
        }
    })
}

module.exports = {
    addToActiveCells,
    removeFromActiveCells,
    deactivateAllCells,
    styleSelectedCell,
    updateStartCellRect,
    updateEndCellRect,
    updateCellStyleBackground,
    updateFuncCellInputValue,
    updateFuncCellOutputValue
}