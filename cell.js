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
        this.input.style.background = 'whitesmoke';
    })

    this.input.addEventListener('blur',(e) => {

        // this.input.style['boxShadow'] = 'none';
        this.input.style.background = 'white';
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
    
    input.style.width = '100%';
    input.style.height = '100%';
    input.style.outline = 'none';
}