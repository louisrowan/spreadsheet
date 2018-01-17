'use strict';

const { $setState } = require('../state');


module.exports = () => {

    $setState({ shiftActive: true });

    return;
};
