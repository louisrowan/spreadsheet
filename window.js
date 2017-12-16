'use strict';

window.addEventListener('mouseup', (e) => {

    _state.mousedown = false;
})

window.addEventListener('keydown', (e) => {

    if (e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown') {

        const activeElement = _state.allCells.find((cell) => 'cell-' + cell.id === document.activeElement.id);
        let row = activeElement.row;
        let column = activeElement.column;

        switch (e.key) {
            case "ArrowLeft":
                console.log('left');
                column = column > 0 ? --column : 0
                break;
            case "ArrowRight":
                console.log('right');
                column = column < COL_COUNT - 1 ? ++column : 0
                break;
            case "ArrowUp":
                console.log('up');
                row = row > 0 ? --row : 0
                break;
            case "ArrowDown":
                console.log('down');
                row = row < ROW_COUNT - 1 ? ++row : 0
                break;
        }

        const newElement = _state.allCells.find((cell) => cell.row === row && cell.column === column);
        deactivateAllCells();
        addToActiveCells(newElement);
        newElement.input.style.border = '2px solid green';
        newElement.input.focus();
    }

})