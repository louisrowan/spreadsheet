// 'use strict';

const rewire = require('rewire');
const styles = rewire('../cell/styles.js');
const state = rewire('../state.js');


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


const document = {
    createElement: (e) => {

        return new Element(e)
    }
}


global.document = document;
global.cellStyle = styles.__get__('cellStyle');
global.inputStyle = styles.__get__('cellStyle');
global._state = state.__get__('_state');


const main = new Element();

const Cell = require('../cell/elements.js');



const t = new Cell(1, 2);
