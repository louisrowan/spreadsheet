'use strict';

const { $setState } = require('../state');

module.exports = () => {

    $setState({
        mousedown: false,
        colDrag: false,
        rowDrag: false
    });

    return;
};
