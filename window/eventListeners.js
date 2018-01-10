'use strict';

const WindowCommon = require('./common');
const { _state } = require('../state');
const Handler = require('../eventHandler');


window.addEventListener('mouseup', (e) => windowMouseup());
window.addEventListener('keydown', (e) => windowKeydown(e));
window.addEventListener('keyup', (e) => windowKeyup(e));
window.addEventListener('mousemove', (e) => windowMousemove(e));
window.addEventListener('input', (e) => windowInput(e));
window.addEventListener('mousedown', (e) => windowMousedown(e));
window.addEventListener('mouseover', (e) => windowMouseover(e));
window.addEventListener('click', (e) => windowClick(e));


const windowClick = (e) => {

    if (e.target.nodeName === 'BUTTON') {

        return new Handler({
            type: 'buttonClick',
            e
        });
    };
};


const windowInput = (e) => {

    const cell = WindowCommon.getCell(_state, e);

    if (!cell) return;

    return new Handler({
        type: 'cellInput',
        cell
    });
};


const windowMousedown = (e) => {

    const cell = WindowCommon.getCell(_state, e);
    
    if (!cell) return;

    return new Handler({
        type: 'cellMousedown',
        cell
    });
};


const windowMouseover = (e) => {

    const cell = WindowCommon.getCell(_state, e);

    if (!cell || !_state.mousedown) return;

    return new Handler({
        type: 'cellMouseover',
        cell
    });
};


const windowMousemove = (e) => {

    if (_state.colDrag) {

        return new Handler({
            type: 'resizeRowColumn',
            value: 'column',
            e
        });
    }
    else if (_state.rowDrag) {

        return new Handler({
            type: 'resizeRowColumn',
            value: 'row',
            e
        });
    };
};


const windowKeydown = (e) => {

    if (e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown') {

        return new Handler({
            type: 'navigateCells',
            e
        });
    }

    else if (e.key === 'Meta') {

        return new Handler({
            type: 'enableCommandActive'
        });
    }

    if (_state.commandActive) {

        return new Handler({
            type: 'commandActiveKeydown',
            e
        });
    };
};


const windowMouseup = () => new Handler({ type: 'windowMouseup' });


const windowKeyup = () => new Handler({ type: 'windowKeyup' });
