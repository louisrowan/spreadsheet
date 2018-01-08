'use strict';

const WindowCommon = require('./common');
const $state = require('../state').$state;
const Handler = require('../eventHandler');

window.addEventListener('mouseup', (e) => windowMouseup());
window.addEventListener('keydown', (e) => windowKeydown(e));
window.addEventListener('keyup', (e) => windowKeyup(e));
window.addEventListener('mousemove', (e) => windowMousemove(e));
window.addEventListener('input', (e) => windowInput(e));
window.addEventListener('mousedown', (e) => windowMousedown(e));
window.addEventListener('mouseover', (e) => windowMouseover(e));


const windowInput = (e) => {

    const cell = WindowCommon.getCell(e);

    if (!cell) return;

    return Handler({
        type: 'cellInput',
        cell
    });
}


const windowMousedown = (e) => {

    const cell = WindowCommon.getCell(e);
    
    if (!cell) return;

    return Handler({
        type: 'cellMousedown',
        cell
    });
}


const windowMouseover = (e) => {

    const cell = WindowCommon.getCell(e);

    if (!cell || !$state('mousedown')) return;

    return Handler({
        type: 'cellMouseover',
        cell
    });
}


const windowMousemove = (e) => {

    if ($state('colDrag')) {

        return Handler({
            type: 'resizeRowColumn',
            value: 'column',
            e
        });
    }
    else if ($state('rowDrag')) {

        return Handler({
            type: 'resizeRowColumn',
            value: 'row',
            e
        });
    }
};


const windowKeydown = (e) => {

    if (e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown') {

        return Handler({
            type: 'navigateCells',
            e
        });
    }

    else if (e.key === 'Meta') {

        return Handler({
            type: 'enableCommandActive'
        });
    }

    if ($state('commandActive')) {

        return Handler({
            type: 'commandActiveKeydown',
            e
        });
    }
}


const windowMouseup = () => Handler({ type: 'windowMouseup' });


const windowKeyup = () => Handler({ type: 'windowKeyup' });
