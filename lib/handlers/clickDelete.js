'use strict';

const { $updateCell } = require('../state');


module.exports = (state) => {

    state.activeCells.forEach((id) => {

        $updateCell(id, { value: ' ' });
    });
};
