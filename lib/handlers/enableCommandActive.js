'use strict';

const { $setState } = require('../state');


module.exports = () => {

    $setState({ commandActive: true });

    return;
};
