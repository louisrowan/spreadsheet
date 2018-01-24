'use strict';

const { TOOLBAR_HEIGHT, COLUMN_HEADER_HEIGHT, ROW_HEADER_WIDTH } = require('../constants');
const { $updateElementStyle } = require('../state');

module.exports = (state) => {

    const columnHeaderDiv = state.columnHeaderDiv;
    $updateElementStyle(columnHeaderDiv, { left: -window.scrollX - ROW_HEADER_WIDTH + 'px' });

    const rowHeaderDiv = state.rowHeaderDiv;
    $updateElementStyle(rowHeaderDiv, { top: -window.scrollY + TOOLBAR_HEIGHT + COLUMN_HEADER_HEIGHT + 'px' });

    return;
};


// to do get these items from state so that i am not accessing the dom this deep