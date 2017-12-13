'use strict';

const main = document.getElementById('main')



function cell () {

    this.div = document.createElement('div');


    this.input = document.createElement('input');

    this.input.addEventListener('input', (e) => {


        this.input = e.target.value;
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

const t = new cell()
main.appendChild(t.div)

t.setText('hello')
t.getText()

