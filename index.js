'use strict';

const Logger = new LoggerObject();
const main = document.getElementById('main');

const ROW_COUNT = 4;
const COL_COUNT = 4;

main.style.width = `${100 * COL_COUNT}px`;

const body = document.body;
body.style.padding = '0px';
body.style.margin = '0px';


// add nav bar
main.appendChild(new Toolbar());



// add cells
for (let i = 0; i < ROW_COUNT; ++i) {

    for (let j = 0; j < COL_COUNT; ++j) {

        let _cell = new Cell(i, j);

        main.appendChild(_cell.div);
    }
}

main.appendChild(new DraggableDiv());


function DraggableDiv() {

    this.div = document.createElement('div');
    this.div.style.position = 'absolute';
    // this.div.style['zIndex'] = -1;
    this.div.style['pointerEvents'] = 'none';
    this.div.style.background = 'transparent';
    this.div.style.border = '2px solid green';
    this.div.style['boxSizing'] = 'border-box';
    _state.draggableDiv = this.div;

    return this.div;
}



