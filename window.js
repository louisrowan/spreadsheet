'use strict';

window.addEventListener('mouseup', (e) => {

    window_Mouseup();
});

function window_Mouseup () {

    _state.mousedown = false;
}

window.addEventListener('keydown', (e) => {

    window_Keydown(e);
});

function window_Keydown (e) {

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
            cutCopyButton_Click('copy');
        }
        else if (e.key === 'x') {
            cutCopyButton_Click('cut');
        }
        else if (e.key === 'v') {
            e.preventDefault();
            pasteButton_Click();
        }
    }
}

window.addEventListener('keyup', (e) => {

    window_Keyup(e);
})

function window_Keyup (e) {

    if (e.key === 'Meta') {
        _state.commandActive = false;
    } 
}

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