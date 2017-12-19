'use strict';

window.addEventListener('mouseup', (e) => {

    _state.mousedown = false;
})

window.addEventListener('keydown', (e) => {

    if (e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown') {
        handleMove(e);
    }

    if (e.key === 'Meta') {
        _state.commandActive = true;
    }

    if (_state.commandActive) {
        if (e.key === 'c') {
            console.log('copy');
        }
        else if (e.key === 'x') {
            console.log('cut');
        }
        else if (e.key === 'p') {
            e.preventDefault();
            console.log('pase');
        }
    }
})

window.addEventListener('keyup', (e) => {

    if (e.key === 'Meta') {
        _state.commandActive = false;
    }
})

function handleMove(e) {

    const activeElement = _state.allCells.find((cell) => 'cell-' + cell.id === document.activeElement.id);
    if (!activeElement) { return };
    let row = activeElement.row;
    let column = activeElement.column;

    switch (e.key) {
        case "ArrowLeft":
            column = column > 0 ? --column : 0
            break;
        case "ArrowRight":
            column = column < COL_COUNT - 1 ? ++column : 0
            break;
        case "ArrowUp":
            row = row > 0 ? --row : 0
            break;
        case "ArrowDown":
            row = row < ROW_COUNT - 1 ? ++row : 0
            break;
    }

    const newElement = _state.allCells.find((cell) => cell.row === row && cell.column === column);
    newSelectedCell(newElement);
    newElement.input.focus();
}