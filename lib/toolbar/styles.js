'use strict';

const styleToolbar = (toolbar) => {

    const style = toolbar.style;

    style.background = 'white';
    style.height = '100px';
    style.border = '1px solid black';
    style.position = 'fixed';
    style.width = '100%';
    style['zIndex'] = '999';
    style['minWidth'] = '500px';
};


const commonButtonStyle = (button) => {

    button.style.width = '70px';
    button.style.height = '35px';
};


module.exports = {
    styleToolbar,
    commonButtonStyle
};
