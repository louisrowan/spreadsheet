'use strict';

const { $setState, $updateDraggable } = require('./state');

function DraggableDiv() {

    this.div = document.createElement('div');
    this.div.style.position = 'absolute';
    this.div.style['pointerEvents'] = 'none';
    this.div.style.background = 'transparent';
    this.div.style.border = '2px solid green';
    this.div.style['boxSizing'] = 'border-box';
    $setState({ draggableDiv: this.div });
    hideDraggableDiv(this.div);

    return this.div;
}

const hideDraggableDiv = () => {

    $updateDraggable({ visibility: 'hidden'});
};

module.exports = {
    DraggableDiv,
    hideDraggableDiv
};
