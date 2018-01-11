'use strict';

const { $setState } = require('../state');


module.exports = (state) => {

    $setState({ commandActive: true });

    return;
};
