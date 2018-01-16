'use strict';

const { _state } = require('./state');
const Router = require('./router').router;

// Internals
const internals = {};

internals.getCell = (state, e) => {

    const input = e.target.id;
    if (!input) return;
    const cell = state.allCells[input.slice(5)]; // input id are prefaced with 'cell-' to slice first 5 char
    if (!cell) return;
    return cell;
};


window.addEventListener('mouseup', () => windowMouseup());
window.addEventListener('keydown', (e) => windowKeydown(e));
window.addEventListener('keyup', (e) => windowKeyup(e));
window.addEventListener('mousemove', (e) => windowMousemove(e));
window.addEventListener('mousedown', (e) => windowMousedown(e));
window.addEventListener('mouseover', (e) => windowMouseover(e));
window.addEventListener('click', (e) => windowClick(e));


const windowClick = (e) => {

    if (e.target.nodeName === 'BUTTON') {

        return new Router({
            state: _state,
            type: 'buttonClick',
            e
        });
    }
};


const windowMousedown = (e) => {

    const cell = internals.getCell(_state, e);

    const colHeader = e.target.className === 'colHeader';

    if (colHeader) {

        return new Router({
            state: _state,
            type: 'colHeaderMousedown',
            e
        });
    }
    
    if (!cell) return;

    return new Router({
        state: _state,
        type: 'cellMousedown',
        cell
    });
};


const windowMouseover = (e) => {

    const cell = internals.getCell(_state, e);

    if (!cell || !_state.mousedown) return;

    return new Router({
        state: _state,
        type: 'cellMouseover',
        cell
    });
};


const windowMousemove = (e) => {

    if (_state.colDrag) {

        return new Router({
            state: _state,
            type: 'resizeRowColumn',
            value: 'column',
            e
        });
    }
    else if (_state.rowDrag) {

        return new Router({
            state: _state,
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

        e.preventDefault();

        return new Router({
            state: _state,
            type: 'navigateCells',
            e
        });
    }

    else if (e.key === 'Meta') {

        return new Router({
            state: _state,
            type: 'enableCommandActive'
        });
    }

    if (_state.commandActive) {

        return new Router({
            state: _state,
            type: 'commandActiveKeydown',
            e
        });
    }

    if (_state.startCellRect) {

        return new Router({
            state: _state,
            type: 'cellInput',
            e
        });
    }
};


const windowMouseup = () => {

    new Router({ state: _state, type: 'windowMouseup' });
};


const windowKeyup = () => {

    new Router({ state: _state, type: 'windowKeyup' });
};
