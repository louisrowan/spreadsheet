'use strict';

const { $setState } = require('../state');

module.exports = (state) => {

    $setState({
        mousedown: false,
        colDrag: false,
        rowDrag: false
    });

    return;
};
