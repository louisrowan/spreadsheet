// 'use strict';

function Element (e) {

    this.children = [];
    this.appendChild = (e) => {

        this.children.push(e)
    };
    this.setAttribute = (att, value) => {

        this.att = value;
        if (att === 'id') {
            global[value] = this;
        }
    }
    this.addEventListener = () => {};
    this.style = {};
}

// const startServer = (done) => {

    global.document = {
        body: {
            style: {}
        },
        createElement: (e) => {

            return new Element(e)
        },
        getElementById: (id) => global[id]
    }

    global.window = {
        addEventListener: () => {}
    };

    global.main = new Element();



//     global.ROW_COUNT = 5;
//     global.COL_COUNT = 5;

//     const state = rewire('../state.js');
//     global._state = state.__get__('_state');

//     const main = new Element();
//     main.style.width = `${100 * COL_COUNT}px`;
//     main.appendChild(new Toolbar());

//     for (let i = 0; i < ROW_COUNT; ++i) {

//         for (let j = 0; j < COL_COUNT; ++j) {

//             let _cell = new Cell(i, j);

//             _cell.div.getBoundingClientRect = () => 0;

//             main.appendChild(_cell.div);
//         }
//     }

//     main.appendChild(new DraggableDiv());
//     return done(main);
// }


const startServer = (done) => {


    return done(require('../index'));


}

exports.startServer = startServer;


