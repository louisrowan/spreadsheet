'use strict';

const { TOOLBAR_HEIGHT } = require('../constants');

const styleToolbar = (toolbar) => {

    const style = toolbar.style;

    style.background = 'white';
    style.height = TOOLBAR_HEIGHT + 'px';
    style.border = '1px solid black';
    style.position = 'fixed';
    style.width = '100%';
    style['zIndex'] = '999';
    style['minWidth'] = '500px';
    style['boxSizing'] = 'border-box';
};


const commonButtonStyle = (button) => {

    button.style.width = '70px';
    button.style.height = '35px';
    button.style.float = 'left';
};


module.exports = {
    styleToolbar,
    commonButtonStyle
};
