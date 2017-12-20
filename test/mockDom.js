// 'use strict';

require('./globalDefinitions');


function Element (e) {

    this.children = [];
    this.appendChild = (e) => {

        this.children.push(e)
    };
    this.setAttribute = (att, value) => {

        this.att = value;
    }
    this.addEventListener = () => {};
    this.style = {};
}

global.document = {
    createElement: (e) => {

        return new Element(e)
    }
}


const main = new Element();


const t = new Cell(1, 2);

main.appendChild(t);
