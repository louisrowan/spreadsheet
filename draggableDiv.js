'use strict';

function DraggableDiv() {

    this.div = document.createElement('div');
    this.div.style.position = 'absolute';
    this.div.style['pointerEvents'] = 'none';
    this.div.style.background = 'transparent';
    this.div.style.border = '2px solid green';
    this.div.style['boxSizing'] = 'border-box';
    hideDraggableDiv(this.div);
    _state.draggableDiv = this.div;

    return this.div;
}

function hideDraggableDiv (div) {

    div = div || _state.draggableDiv;
    div.style.visibility = 'hidden';
}
