// 'use strict';

function Element (e) {

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
}

global.window = {
    addEventListener: () => {}
};

global.main = new Element();

