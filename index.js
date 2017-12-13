'use strict';

const main = document.getElementById('main')

const ROW_COUNT = 4;
const COL_COUNT = 4;

main.style.width = `${100 * COL_COUNT}px`;
main.style.padding = '0px';
main.style.margin = '0px';





for (let i = 0; i < ROW_COUNT; ++i) {


    for (let j = 0; j < COL_COUNT; ++j) {

        let _cell = new Cell()

        main.appendChild(_cell.div)
    }
}


window.addEventListener('mouseup', (e) => {

        const inputs = document.getElementsByTagName('input');
        console.log(inputs);
        console.log(typeof inputs);

        Object.keys(inputs).forEach((i) => {

            inputs[i].style.outline = 'none';
        })
        window.mousedown = false;
    })
