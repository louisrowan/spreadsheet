'use strict';

const main = document.getElementById('main')

const ROW_COUNT = 4;
const COL_COUNT = 4;

main.style.width = `${100 * COL_COUNT}px`;


function cell () {

    this.div = document.createElement('div');
    cellStyle(this.div);


    this.input = document.createElement('input');
    inputStyle(this.input)

    this.input.addEventListener('input', (e) => {


        this.input = e.target.value;
    })

    this.input.addEventListener('focus',(e) => {

        this.input.style['boxShadow'] = '0px 0px 2px 2px black inset';
    })

    this.input.addEventListener('blur',(e) => {

        this.input.style['boxShadow'] = 'none';
    })


    this.div.appendChild(this.input);
    this.id = Math.random().toString()

    return this;
}

cell.prototype.getText = function() {

    return this.input.value;
}

cell.prototype.setText = function(val) {

    this.input.value = val;
    return this.input.value
}


for (let i = 0; i < ROW_COUNT; ++i) {


    for (let j = 0; j < COL_COUNT; ++j) {

        let _cell = new cell()

        main.appendChild(_cell.div)
    }
}

function cellStyle(div) {
    
    div.style.width = '100px';
    div.style.height = '50px';
    div.style.display = 'inline-block';
}

function inputStyle(input) {
    
    input.style.width = '100%';
    input.style.height = '100%';
    input.style.outline = 'none';
    input.style
}
