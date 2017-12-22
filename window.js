'use strict';

window.addEventListener('mouseup', (e) => {

    window_Mouseup();
});

function window_Mouseup () {

    _state.mousedown = false;
    _state.colDrag = false;
    _state.rowDrag = false;
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



window.addEventListener('mousemove', (e) => {

    if (_state.colDrag) {

            const colMarker = _state.colDrag;

            const movement = e.clientX - colMarker.position;
            updateWidth(colMarker.div.previousSibling, movement)

            const main = document.getElementById('main');
            // console.log('main width', main.style.width);
            updateWidth(main, movement)
            // console.log('new main', main.style.width);
            const start = Date.now();
            
            const cells = _state.allCells.filter((c) => c.column === colMarker.column - 2);
            cells.forEach((c) => updateWidth(c.div, movement))
            colMarker.position = e.clientX;

    }
    else if (_state.rowDrag) {

            let rowMarker = _state.rowDrag;

            const movement = e.clientY - rowMarker.position;
            const i = _state.rowHeaders.indexOf(rowMarker)
            console.log(i);
            const NrowMarker = _state.rowHeaders[i - 1]
            updateHeight(NrowMarker.div, movement)

            const main = document.getElementById('main');
            // console.log('main width', main.style.width);
            updateHeight(main, movement)
            
            const cells = _state.allCells.filter((c) => c.row === rowMarker.row - 1);
            cells.forEach((c) => updateHeight(c.div, movement))
            rowMarker.position = e.clientY;

    }
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