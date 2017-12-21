// 'use strict';

const rewire = require('rewire');
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

const startServer = (done) => {

    global._state = 

    global.document = {
        createElement: (e) => {

            return new Element(e)
        }
    }

    global.Logger = new LoggerObject();
    global.ROW_COUNT = 5;
    global.COL_COUNT = 5;

    const state = rewire('../state.js');
    global._state = state.__get__('_state');

    const main = new Element();
    main.style.width = `${100 * COL_COUNT}px`;
    main.appendChild(new Toolbar());

    for (let i = 0; i < ROW_COUNT; ++i) {

        for (let j = 0; j < COL_COUNT; ++j) {

            let _cell = new Cell(i, j);

            _cell.div.getBoundingClientRect = () => 0;

            main.appendChild(_cell.div);
        }
    }

    main.appendChild(new DraggableDiv());
    return done(main);
}

exports.startServer = startServer;


