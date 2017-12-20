'use strict';

function Cell (row, column) {

    // set props
    this.div = document.createElement('div');
    this.input = document.createElement('input');
    this.div.appendChild(this.input);
    this.id = Math.random().toString();
    this.input.setAttribute('id', `cell-${this.id}`);
    this.row = row;
    this.column = column;

    // add styles
    cellStyle(this.div);
    inputStyle(this.input);

    // event listeners
    this.input.addEventListener('input', (e) => cellInput(this, e));
    this.input.addEventListener('mousedown', (e) => cellMousedown(this, e));
    this.input.addEventListener('mouseover', (e) => cellMouseover(this, e));

    _state.allCells.push(this);
    return this;
}

Cell.prototype.getText = function() {

    return this.input.value;
}

Cell.prototype.setText = function(val) {

    this.input.value = val;
    return this.input.value;
}
