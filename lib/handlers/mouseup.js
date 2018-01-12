'use strict';

const { $setState } = require('../state');
const CommonHandler = require('./common');

module.exports = (state) => {

    // if (state.cellDrag) {
    //     console.log('call common handler now');
    //     CommonHandler.handleCellDragEnd(state);
    // }

    $setState({
        mousedown: false,
        colDrag: false,
        rowDrag: false
    });

    return;
};
