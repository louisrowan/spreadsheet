'use strict';

const CellCommon = require('../cell/common');
const WindowStateUpdate = require('../window/stateUpdate');


module.exports = (state, cell) => {

    CellCommon.newSelectedCell(state, cell);
    WindowStateUpdate.toggleMousedown(true);
};
