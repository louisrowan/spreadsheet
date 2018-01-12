'use strict';

const CellCommon = require('../cell/common');
const CellStateUpdate = require('../cell/stateUpdate');
const { $setState } = require('../state');

// exports.handleCellDragEnd = (state) => {

//     const cell1 = state.startCellRect;
//     const cell2 = state.endCellRect;
//     const { leftCol, rightCol, topRow, botRow } = CellCommon.getMultiCellRowCol(cell1, cell2);

//     Object.keys(state.allCells).forEach((id) => {

//         const cell = state.allCells[id];

//         if (topRow <= cell.row &&
//             leftCol <= cell.column &&
//             botRow >= cell.row &&
//             rightCol >= cell.column)
//         {
//             CellStateUpdate.addToActiveCells(state, cell);
//         }
//         else if (cell.active) {
//             CellStateUpdate.removeFromActiveCells(state, cell);
//         }
//     });
//     $setState({ cellDrag: false });
// }
