'use strict';

const CellStateUpdate = require('../cell/stateUpdate');

module.exports = (state, cell) => {

    CellStateUpdate.updateFuncCellOutputValue(state, cell);
};
