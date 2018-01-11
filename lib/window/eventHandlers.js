'use strict';

const { CELL_HEIGHT, ROW_COUNT, COL_COUNT } = require('../constants');
const CellCommon = require('../cell/common');
const CellStateUpdate = require('../cell/stateUpdate');
const ToolbarListeners = require('../toolbar/eventListeners');
const Common = require('../common');
const DraggableDiv = require('../draggableDiv');
const { $setState, $updateElementStyle, $updateCell } = require('../state');


// const handleCommandActiveKeydown = (state, e) => {

//     if (e.key === 'c') {
//         e.preventDefault();
//         ToolbarListeners.cutCopyButtonClick(state, 'copy');
//         return;
//     }
//     else if (e.key === 'x') {
//         e.preventDefault();
//         ToolbarListeners.cutCopyButtonClick(state, 'cut');
//         return;
//     }
//     else if (e.key === 'v') {
//         e.preventDefault();
//         ToolbarListeners.pasteButtonClick(state);
//         return;
//     }
//     return;
// };


// const handleResizeRowColumn = (state, e, type) => {

//     DraggableDiv.hideDraggableDiv();
//     CellStateUpdate.deactivateAllCells(state);

//     let marker;
//     let mousePosition;
//     let headerArray;
//     let prop;
//     let heightOffset;
//     if (type === 'row') {
//         marker = state.rowDrag;
//         mousePosition = e.clientY;
//         headerArray = state.rowHeaders;
//         prop = 'height';
//         heightOffset = 100 + CELL_HEIGHT;
//     }
//     else if (type === 'column') {
//         marker = state.colDrag;
//         mousePosition = e.clientX;
//         headerArray = state.columnHeaders;
//         prop = 'width';
//         heightOffset = 0;
//     }
//     else {
//         console.error('ERROR handleResizeRowColumn, type = ', type);
//     }


//     const i = headerArray.indexOf(marker);
//     const headerToMove = headerArray[i - 1];

//     const position = headerArray.slice(0, i).reduce((a, b) => a += Common.translatePxToNum(b.div.style[prop]), heightOffset)
//     const movement = mousePosition - position;

//     if (type === 'column' && Common.translatePxToNum(headerToMove.div.style[prop]) <= 50 && movement < 0) return;
//     if (type === 'row' && Common.translatePxToNum(headerToMove.div.style[prop]) <= 25 && movement < 0) return;

//     const headerChange = Common.getNewHeightWidth(headerToMove.div, movement, prop);
//     $updateElementStyle(headerToMove.div, headerChange);

//     const containerChange = Common.getNewHeightWidth(state.spreadsheetContainer, movement, prop);
//     $updateElementStyle(state.spreadsheetContainer, containerChange);

//     const cells = Object.keys(state.allCells).filter((c) => {

//         const cell = state.allCells[c];
//         return cell[type] === marker[type] - 1;
//     });
//     cells.forEach((c) => {

//         const cell = state.allCells[c];
//         const cellChange = Common.getNewHeightWidth(cell.div, movement, prop);
//         $updateCell(cell, { divStyle: cellChange });
//     })
//     return;
// };


// const handleNavigateCells = (args) => {

//     const { e, state} = args;

//     const activeElement = state.allCells[document.activeElement.id.slice(5)];
//     if (!activeElement) return;

//     let row = activeElement.row;
//     let column = activeElement.column;

//     switch (e.key) {
//         case "ArrowLeft":
//             column = column > 0 ? --column : 0
//             break;
//         case "ArrowRight":
//             column = column < COL_COUNT - 1 ? ++column : 0
//             break;
//         case "ArrowUp":
//             row = row > 0 ? --row : 0
//             break;
//         case "ArrowDown":
//             row = row < ROW_COUNT - 1 ? ++row : 0
//             break;
//     }

//     const cell = state.allCells[`r${row}.c${column}`];
//     CellCommon.newSelectedCell(state, cell);
//     cell.input.focus();

//     return;
// };

// const handleMouseup = (state) => {

//     $setState({
//         mousedown: false,
//         colDrag: false,
//         rowDrag: false
//     });

//     return;
// };


// const handleWindowKeyup = (state) => {

//     $setState({ commandActive: false });

//     return;
// };


// const enableCommandActive = (state) => {

//     $setState({ commandActive: true });

//     return;
// };


module.exports = {
    handleCommandActiveKeydown,
    handleNavigateCells,
    handleResizeRowColumn,
    handleMouseup,
    handleWindowKeyup,
    enableCommandActive
};
