'use strict';

function Cell () {

    this.div = document.createElement('div');
    cellStyle(this.div);


    this.input = document.createElement('input');
    inputStyle(this.input)

    this.input.addEventListener('input', (e) => {


        this.input.value = e.target.value;
    })

    this.input.addEventListener('focus',(e) => {

        // this.input.style['boxShadow'] = '0px 0px 0px 1px black inset';
        this.input.style.border = '2px solid green';
        addToActiveCells(this);
    })

    this.input.addEventListener('blur',(e) => {

        // this.input.style['boxShadow'] = 'none';
        this.input.style.border = '1px solid rgb(238, 238, 238)';
    })

    this.input.addEventListener('mousedown', (e) => {

        this.input.style.outline = '1px solid blue';
        window.mousedown = true;
    })



    this.input.addEventListener('mouseover', (e) => {

        if (window.mousedown) {
            this.input.style.outline = '1px solid blue';
        }
    })



    this.div.appendChild(this.input);
    this.id = Math.random().toString()

    _state.allCells.push(this);

    return this;
}

Cell.prototype.getText = function() {

    return this.input.value;
}

Cell.prototype.setText = function(val) {

    this.input.value = val;
    return this.input.value
}

function cellStyle(div) {

    const style = div.style;
    
    style.width = '100px';
    style.height = '50px';
    style.display = 'inline-block';
}

function inputStyle(input) {

    const style = input.style;
    
    style.width = '100%';
    style.height = '100%';
    style.outline = 'none';
    style.border = '1px solid rgb(238, 238, 238)';
    style['boxSizing'] = 'border-box';
    style.cursor = 'cell';
}

function addToActiveCells(cell) {

    if (!_state.activeCells.find((active) => active.id === cell.id)) {
        _state.activeCells.push(cell);
    }
    
}