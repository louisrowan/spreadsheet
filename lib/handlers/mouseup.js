'use strict';

const { $setState } = require('../state');
const CommonHandler = require('./common');

module.exports = (state) => {

    if (state.cellDrag) {
        CommonHandler.handleCellDragEnd(state);
    }

    $setState({
        mousedown: false,
        colDrag: false,
        rowDrag: false
    });

    return;
};
