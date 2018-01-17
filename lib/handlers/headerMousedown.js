'use strict';

const { $setState } = require('../state');

module.exports = (type, id) => {

    switch (type) {
        case 'col':
            return $setState({ colDrag: +id });
        case 'row':
            return $setState({ rowDrag: +id });
        default:
            return;
    }
};
