// 'use strict';

function Element () {

    this.children = [];
    this.appendChild = (e) => {

        this.children.push(e);
    };
    this.setAttribute = (att, value) => {

        this[att] = value;
        if (att === 'id') {
            global[value] = this;
        }
    };
    this.addEventListener = () => {};
    this.style = {};
    this.value = '';
}


global.document = {
    body: {
        style: {}
    },
    createElement: (e) => {

        return new Element(e);
    },
    getElementById: (id) => global[id]
};

global.window = {
    addEventListener: () => {},
    scrollX: 0,
    scrollY: 0
};

global.main = new Element();

