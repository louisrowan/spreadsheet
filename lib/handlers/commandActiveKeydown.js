'use strict';

const ToolbarListeners = require('../toolbar/eventListeners');
const Common = require('../common');


module.exports = (state, e) => {

    if (e.key === 'c') {
        e.preventDefault();
        ToolbarListeners.cutCopyButtonClick(state, 'copy');
        return;
    }
    else if (e.key === 'x') {
        e.preventDefault();
        ToolbarListeners.cutCopyButtonClick(state, 'cut');
        return;
    }
    else if (e.key === 'v') {
        e.preventDefault();
        ToolbarListeners.pasteButtonClick(state);
        return;
    }
    return;
};
