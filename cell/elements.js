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
    this.input.addEventListener('input', (e) => {

        this.input.value = e.target.value;
        return;
    })

    this.input.addEventListener('mousedown', (e) => {

        newSelectedCell(this);
        _state.mousedown = true;
        return;
    })

    this.input.addEventListener('mouseover', (e) => {

        if (_state.mousedown) {
            handleDrag(this);
        }
        return;
    });

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
