'use strict';

const { $setState } = require('../state');
const WindowStateUpdate = require('../window/stateUpdate');

module.exports = (type, id) => {

    WindowStateUpdate.toggleMousedown(true);
    switch (type) {
        case 'col':
            return $setState({ colDrag: +id });
        case 'row':
            return $setState({ rowDrag: +id });
        default:
            return;
    }
};
