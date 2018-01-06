'use strict';

const { $state, $setState } = require('./state');

function DraggableDiv() {

    this.div = document.createElement('div');
    this.div.style.position = 'absolute';
    this.div.style['pointerEvents'] = 'none';
    this.div.style.background = 'transparent';
    this.div.style.border = '2px solid green';
    this.div.style['boxSizing'] = 'border-box';
    $setState({
        draggableDiv: this.div
    });
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
