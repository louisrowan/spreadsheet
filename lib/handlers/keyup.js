'use strict';

const { $setState } = require('../state');


module.exports = (e) => {

    const options = {};

    switch (e.key) {
        case 'Meta':
            options.commandActive = false;
            break;
        case 'Shift':
            options.shiftActive = false;
            break;
        default:
            break;
    }

    $setState(options);

    return;
};
