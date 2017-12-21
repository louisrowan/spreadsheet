'use strict';

const rewire = require('rewire');

// cell
const cellCommon = rewire('../cell/common.js');
global.newSelectedCell = cellCommon.__get__('newSelectedCell');
global.copyCell = cellCommon.__get__('copyCell');
global.sortCellsByPosition = cellCommon.__get__('sortCellsByPosition');
global.isSameCell = cellCommon.__get__('isSameCell');
global.clearCell = cellCommon.__get__('clearCell');
const cellElements = rewire('../cell/elements.js');
global.Cell = cellElements.__get__('Cell');
const cellEventHandlers = rewire('../cell/eventHandlers.js');
global.handleDrag = cellEventHandlers.__get__('handleDrag');
global.addToActiveCells = cellEventHandlers.__get__('addToActiveCells');
global.removeFromActiveCells = cellEventHandlers.__get__('removeFromActiveCells');
global.deactivateAllCells = cellEventHandlers.__get__('deactivateAllCells');
const cellEventListeners = rewire('../cell/eventListeners');
global.cellInput = cellEventListeners.__get__('cellInput');
global.cellMousedown = cellEventListeners.__get__('cellMousedown');
global.cellMouseover = cellEventListeners.__get__('cellMouseover');
const cellStyles = rewire('../cell/styles.js');
global.cellStyle = cellStyles.__get__('cellStyle');
global.inputStyle = cellStyles.__get__('inputStyle');

// toolbar
const toolbarCommon = rewire('../toolbar/common.js');
global.getColumnCount = toolbarCommon.__get__('getColumnCount');
const toolbarElements = rewire('../toolbar/elements.js');
global.Toolbar = toolbarElements.__get__('Toolbar');
global.EraseButton = toolbarElements.__get__('EraseButton');
global.DropdownButton = toolbarElements.__get__('DropdownButton');
global.CssButton = toolbarElements.__get__('CssButton');
global.CutCopyButton = toolbarElements.__get__('CutCopyButton');
global.PasteButton = toolbarElements.__get__('PasteButton');
const toolbarEventHandlers = rewire('../toolbar/eventHandlers.js');
global.handlePaste = toolbarEventHandlers.__get__('handlePaste');
global.handleCut = toolbarEventHandlers.__get__('handleCut');
const toolbarEventListeners = rewire('../toolbar/eventListeners.js');
global.eraseButton_Click = toolbarEventListeners.__get__('eraseButton_Click');
global.cssButton_Click = toolbarEventListeners.__get__('cssButton_Click');
global.cutCopyButton_Click = toolbarEventListeners.__get__('cutCopyButton_Click');
global.pasteButton_Click = toolbarEventListeners.__get__('pasteButton_Click');
const toolbarSetup = rewire('../toolbar/setup.js');
global.addButtons = toolbarSetup.__get__('addButtons');
const toolbarStyles = rewire('../toolbar/styles.js');
global.styleToolbar = toolbarStyles.__get__('styleToolbar');
global.commonButtonStyle = toolbarStyles.__get__('commonButtonStyle');

// draggableDiv
const draggableDiv = rewire('../draggableDiv.js');
global.DraggableDiv = draggableDiv.__get__('DraggableDiv');

// logger
const logger = rewire('../logger.js');
global.LoggerObject = logger.__get__('LoggerObject');
