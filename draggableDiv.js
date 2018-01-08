'use strict';

const { $state, _state } = require('./state');

function DraggableDiv() {

    this.div = document.createElement('div');
    this.div.style.position = 'absolute';
    this.div.style['pointerEvents'] = 'none';
    this.div.style.background = 'transparent';
    this.div.style.border = '2px solid green';
    this.div.style['boxSizing'] = 'border-box';
    _state.draggableDiv = this.div;
    hideDraggableDiv(this.div);

    return this.div;
}

function hideDraggableDiv (div) {

    div = $state('draggableDiv');
    div.style.visibility = 'hidden';
}

module.exports = {
    DraggableDiv,
    hideDraggableDiv
}
