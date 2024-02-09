/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/dom.js":
/*!***********************!*\
  !*** ./src/js/dom.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const dom = {
  startGame(e) {
    e.preventDefault();
    const nameInput = document.querySelector('#name');
    const name = nameInput.value;
    e.target.reset();
    const form = document.querySelector('form');
    form.style.display = 'none';
    const messageBox = document.createElement('p');
    const gameContent = document.createElement('div');
    const playerContent = document.createElement('div');
    const enemyContent = document.createElement('div');
    const playerCaption = document.createElement('h3');
    const enemyCaption = document.createElement('h3');
    const playerBoardContainer = document.createElement('div');
    const enemyBoardContainer = document.createElement('div');
    messageBox.classList.add('message-box');
    gameContent.classList.add('game-content');
    playerContent.classList.add('player-content');
    enemyContent.classList.add('player-content');
    playerCaption.classList.add('caption');
    enemyCaption.classList.add('caption');
    playerBoardContainer.setAttribute('class', 'board-container');
    playerBoardContainer.setAttribute('id', 'player');
    enemyBoardContainer.setAttribute('class', 'board-container');
    enemyBoardContainer.setAttribute('id', 'enemy');
    messageBox.textContent = 'Place your ships';
    playerCaption.textContent = name ? `${name}'s Fleet` : "Player's Fleet";
    enemyCaption.textContent = `Enemy Fleet`;
    playerContent.appendChild(playerCaption);
    playerContent.appendChild(playerBoardContainer);
    enemyContent.appendChild(enemyCaption);
    enemyContent.appendChild(enemyBoardContainer);
    gameContent.appendChild(playerContent);
    gameContent.appendChild(enemyContent);
    document.body.insertBefore(gameContent, form);
    document.body.insertBefore(messageBox, gameContent);
  },
  endGame() {
    const messageBox = document.querySelector('.message-box');
    const newGameButton = document.createElement('button');
    newGameButton.classList.add('new-game');
    newGameButton.textContent = 'New Game';
    messageBox.appendChild(newGameButton);
  },
  openForm() {
    const messageBox = document.querySelector('.message-box');
    const gameContent = document.querySelector('.game-content');
    const form = document.querySelector('form');
    messageBox.remove();
    gameContent.remove();
    form.style.display = 'block';
  },
  buildBoard(gameboard) {
    const board = document.createElement('div');
    board.classList.add('board');
    for (let i = 0; i < 100; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.cell = i;
      for (let j = 0; j < gameboard.previousAttacks.length; j += 1) {
        if (gameboard.previousAttacks[j][0] === Math.floor(i / 10) && gameboard.previousAttacks[j][1] === i % 10) {
          cell.classList.add('attacked');
          if (typeof gameboard.board[Math.floor(i / 10)][i % 10] === 'object') {
            cell.classList.add('hit');
          }
        }
      }
      board.appendChild(cell);
    }
    return board;
  },
  appendBoards(playerBoard, computerBoard) {
    const playerBoardNode = dom.buildBoard(playerBoard);
    const computerBoardNode = dom.buildBoard(computerBoard);
    const boardContainers = document.querySelectorAll('.board-container');
    boardContainers[0].textContent = '';
    boardContainers[1].textContent = '';
    boardContainers[0].appendChild(playerBoardNode);
    boardContainers[1].appendChild(computerBoardNode);
  },
  newMessage(message) {
    const messageBox = document.querySelector('.message-box');
    messageBox.textContent = message;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);

/***/ }),

/***/ "./src/js/gameboard.js":
/*!*****************************!*\
  !*** ./src/js/gameboard.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/js/ship.js");

class Gameboard {
  constructor() {
    this.board = [];
    this.previousAttacks = [];
    for (let i = 0; i < 10; i += 1) {
      const temp = [];
      for (let j = 0; j < 10; j += 1) {
        temp.push('empty');
      }
      this.board.push(temp);
    }
  }
  placeShip(coordinates) {
    const currentShip = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](coordinates.length);
    coordinates.forEach(coordPair => {
      this.board[coordPair[0]][coordPair[1]] = currentShip;
    });
  }
  receiveAttack(coordPair) {
    this.previousAttacks.push(coordPair);
    const cell = this.board[coordPair[0]][coordPair[1]];
    if (typeof cell === 'object') {
      cell.hit();
    } else {
      this.board[coordPair[0]][coordPair[1]] = 'miss';
    }
  }
  allSunk() {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (typeof this.board[i][j] === 'object' && !this.board[i][j].isSunk()) {
          return false;
        }
      }
    }
    return true;
  }
  inPreviousAttacks(coordPair) {
    for (let i = 0; i < this.previousAttacks.length; i += 1) {
      if (this.previousAttacks[i][0] === coordPair[0] && this.previousAttacks[i][1] === coordPair[1]) {
        return true;
      }
    }
    return false;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/js/player.js":
/*!**************************!*\
  !*** ./src/js/player.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/js/gameboard.js");

class Player {
  constructor() {
    this.playerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.computerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }
  playerMove(coordPair) {
    if (this.computerBoard.inPreviousAttacks(coordPair)) {
      return false;
    }
    this.computerBoard.receiveAttack(coordPair);
    return true;
  }
  computerMove() {
    let row = Math.floor(Math.random() * 10);
    let column = Math.floor(Math.random() * 10);
    while (this.playerBoard.inPreviousAttacks([row, column])) {
      row = Math.floor(Math.random() * 10);
      column = Math.floor(Math.random() * 10);
    }
    this.playerBoard.receiveAttack([row, column]);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/js/ship.js":
/*!************************!*\
  !*** ./src/js/ship.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Ship {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
  }
  hit() {
    if (!this.isSunk()) {
      this.timesHit += 1;
    }
  }
  isSunk() {
    return this.timesHit === this.length;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/ITC Machine Regular.otf */ "./src/fonts/ITC Machine Regular.otf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./img/alpha-x.svg */ "./src/img/alpha-x.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@font-face {
  font-family: 'ITC Machine Regular';
  src: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
}

:root {
  background-color: navy;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
}

body {
  height: 100vh;
  display: grid;
  grid-template-rows: max-content max-content 1fr;
  justify-items: center;
  gap: 30px;
}

h1 {
  font-family: 'ITC Machine Regular', Arial, Helvetica, sans-serif;
  font-size: 4rem;
}

.enter-name {
  display: grid;
  grid-template-rows: repeat(3, max-content);
  gap: 10px;
  justify-items: center;
}

button {
  width: max-content;
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 20px;
}

.message-box {
  font-size: 1.5rem;
  display: grid;
  grid-template-rows: max-content, max-content;
  justify-items: center;
}

.game-content {
  width: 100%;
  text-align: center;
  display: grid;
  grid-template-columns: max-content max-content;
  justify-content: space-evenly;
  font-family: 'ITC Machine Regular', sans-serif;
  font-size: 1.5rem;
  letter-spacing: 2px;
}

.board {
  display: grid;
  grid-template-columns: repeat(10, 30px);
  grid-template-rows: repeat(10, 30px);
  gap: 1px;
}

#player .cell {
  cursor: auto;
}

.cell {
  background-color: white;
  cursor: pointer;
}

.attacked {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_1___});
  cursor: auto;
}

.hit {
  background-color: #ff6161;
}
`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,kCAAkC;EAClC,4CAA6C;AAC/C;;AAEA;EACE,sBAAsB;EACtB,YAAY;EACZ,yCAAyC;AAC3C;;AAEA;EACE,aAAa;EACb,aAAa;EACb,+CAA+C;EAC/C,qBAAqB;EACrB,SAAS;AACX;;AAEA;EACE,gEAAgE;EAChE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,0CAA0C;EAC1C,SAAS;EACT,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,iBAAiB;EACjB,aAAa;EACb,4CAA4C;EAC5C,qBAAqB;AACvB;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,aAAa;EACb,8CAA8C;EAC9C,6BAA6B;EAC7B,8CAA8C;EAC9C,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,uCAAuC;EACvC,oCAAoC;EACpC,QAAQ;AACV;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,uBAAuB;EACvB,eAAe;AACjB;;AAEA;EACE,yDAAwC;EACxC,YAAY;AACd;;AAEA;EACE,yBAAyB;AAC3B","sourcesContent":["@font-face {\r\n  font-family: 'ITC Machine Regular';\r\n  src: url('./fonts/ITC\\ Machine\\ Regular.otf');\r\n}\r\n\r\n:root {\r\n  background-color: navy;\r\n  color: white;\r\n  font-family: Arial, Helvetica, sans-serif;\r\n}\r\n\r\nbody {\r\n  height: 100vh;\r\n  display: grid;\r\n  grid-template-rows: max-content max-content 1fr;\r\n  justify-items: center;\r\n  gap: 30px;\r\n}\r\n\r\nh1 {\r\n  font-family: 'ITC Machine Regular', Arial, Helvetica, sans-serif;\r\n  font-size: 4rem;\r\n}\r\n\r\n.enter-name {\r\n  display: grid;\r\n  grid-template-rows: repeat(3, max-content);\r\n  gap: 10px;\r\n  justify-items: center;\r\n}\r\n\r\nbutton {\r\n  width: max-content;\r\n  padding: 5px 10px;\r\n  border-radius: 5px;\r\n  margin-top: 20px;\r\n}\r\n\r\n.message-box {\r\n  font-size: 1.5rem;\r\n  display: grid;\r\n  grid-template-rows: max-content, max-content;\r\n  justify-items: center;\r\n}\r\n\r\n.game-content {\r\n  width: 100%;\r\n  text-align: center;\r\n  display: grid;\r\n  grid-template-columns: max-content max-content;\r\n  justify-content: space-evenly;\r\n  font-family: 'ITC Machine Regular', sans-serif;\r\n  font-size: 1.5rem;\r\n  letter-spacing: 2px;\r\n}\r\n\r\n.board {\r\n  display: grid;\r\n  grid-template-columns: repeat(10, 30px);\r\n  grid-template-rows: repeat(10, 30px);\r\n  gap: 1px;\r\n}\r\n\r\n#player .cell {\r\n  cursor: auto;\r\n}\r\n\r\n.cell {\r\n  background-color: white;\r\n  cursor: pointer;\r\n}\r\n\r\n.attacked {\r\n  background-image: url(./img/alpha-x.svg);\r\n  cursor: auto;\r\n}\r\n\r\n.hit {\r\n  background-color: #ff6161;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/fonts/ITC Machine Regular.otf":
/*!*******************************************!*\
  !*** ./src/fonts/ITC Machine Regular.otf ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "73aa1b4569dafacaccd8.otf";

/***/ }),

/***/ "./src/img/alpha-x.svg":
/*!*****************************!*\
  !*** ./src/img/alpha-x.svg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "c2da584013b56ac2903b.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style.css */ "./src/style.css");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/js/player.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ "./src/js/dom.js");



let player;
const form = document.querySelector('form');
const e = {
  preventDefault() {},
  target: {
    reset() {}
  }
};
function endGame() {
  if (player.computerBoard.allSunk()) {
    _dom__WEBPACK_IMPORTED_MODULE_2__["default"].newMessage('Enemy fleet sunk! You win!');
  } else {
    _dom__WEBPACK_IMPORTED_MODULE_2__["default"].newMessage('Your fleet was sunk! Game over!');
  }
  _dom__WEBPACK_IMPORTED_MODULE_2__["default"].endGame();
  const newGameButton = document.querySelector('.new-game');
  newGameButton.addEventListener('click', _dom__WEBPACK_IMPORTED_MODULE_2__["default"].openForm);
}
function playRound(e) {
  e.stopImmediatePropagation();
  if (e.target.classList.contains('cell') && !e.target.classList.contains('attacked')) {
    const {
      cell
    } = e.target.dataset;
    player.playerMove([Math.floor(cell / 10), cell % 10]);
    player.computerMove();
    _dom__WEBPACK_IMPORTED_MODULE_2__["default"].appendBoards(player.playerBoard, player.computerBoard);
  }
  if (player.playerBoard.allSunk() || player.computerBoard.allSunk()) {
    endGame();
  }
}

// form.addEventListener('submit', (e) => {
player = new _player__WEBPACK_IMPORTED_MODULE_1__["default"]();
_dom__WEBPACK_IMPORTED_MODULE_2__["default"].startGame(e);
_dom__WEBPACK_IMPORTED_MODULE_2__["default"].appendBoards(player.playerBoard, player.computerBoard);
const enemyBoard = document.querySelector('#enemy');
enemyBoard.addEventListener('click', playRound);
// });
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UCwrQ0FBTSxDQUFDLENBQUM7QUFDckJyRSw0Q0FBRyxDQUFDQyxTQUFTLENBQUNDLENBQUMsQ0FBQztBQUNoQkYsNENBQUcsQ0FBQzZDLFlBQVksQ0FBQytCLE1BQU0sQ0FBQzlCLFdBQVcsRUFBRThCLE1BQU0sQ0FBQzdCLGFBQWEsQ0FBQztBQUMxRCxNQUFNa0MsVUFBVSxHQUFHNUUsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO0FBQ25EMkUsVUFBVSxDQUFDSixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUVDLFNBQVMsQ0FBQztBQUMvQyxNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3Ly4vc3JjL2pzL2RvbS5qcyIsIndlYnBhY2s6Ly9uZXcvLi9zcmMvanMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL25ldy8uL3NyYy9qcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vc3JjL2pzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9uZXcvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL25ldy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL25ldy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9uZXcvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL25ldy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9uZXcvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vbmV3L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9uZXcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL25ldy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9uZXcvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbmV3L3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9uZXcvLi9zcmMvanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZG9tID0ge1xyXG4gIHN0YXJ0R2FtZShlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmFtZScpO1xyXG4gICAgY29uc3QgbmFtZSA9IG5hbWVJbnB1dC52YWx1ZTtcclxuICAgIGUudGFyZ2V0LnJlc2V0KCk7XHJcblxyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcclxuICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbiAgICBjb25zdCBtZXNzYWdlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgY29uc3QgZ2FtZUNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IHBsYXllckNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IGVuZW15Q29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgcGxheWVyQ2FwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XHJcbiAgICBjb25zdCBlbmVteUNhcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xyXG4gICAgY29uc3QgcGxheWVyQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IGVuZW15Qm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICBtZXNzYWdlQm94LmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2UtYm94Jyk7XHJcbiAgICBnYW1lQ29udGVudC5jbGFzc0xpc3QuYWRkKCdnYW1lLWNvbnRlbnQnKTtcclxuICAgIHBsYXllckNvbnRlbnQuY2xhc3NMaXN0LmFkZCgncGxheWVyLWNvbnRlbnQnKTtcclxuICAgIGVuZW15Q29udGVudC5jbGFzc0xpc3QuYWRkKCdwbGF5ZXItY29udGVudCcpO1xyXG4gICAgcGxheWVyQ2FwdGlvbi5jbGFzc0xpc3QuYWRkKCdjYXB0aW9uJyk7XHJcbiAgICBlbmVteUNhcHRpb24uY2xhc3NMaXN0LmFkZCgnY2FwdGlvbicpO1xyXG4gICAgcGxheWVyQm9hcmRDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdib2FyZC1jb250YWluZXInKTtcclxuICAgIHBsYXllckJvYXJkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAncGxheWVyJyk7XHJcbiAgICBlbmVteUJvYXJkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYm9hcmQtY29udGFpbmVyJyk7XHJcbiAgICBlbmVteUJvYXJkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnZW5lbXknKTtcclxuXHJcbiAgICBtZXNzYWdlQm94LnRleHRDb250ZW50ID0gJ1BsYWNlIHlvdXIgc2hpcHMnO1xyXG4gICAgcGxheWVyQ2FwdGlvbi50ZXh0Q29udGVudCA9IG5hbWUgPyBgJHtuYW1lfSdzIEZsZWV0YCA6IFwiUGxheWVyJ3MgRmxlZXRcIjtcclxuICAgIGVuZW15Q2FwdGlvbi50ZXh0Q29udGVudCA9IGBFbmVteSBGbGVldGA7XHJcblxyXG4gICAgcGxheWVyQ29udGVudC5hcHBlbmRDaGlsZChwbGF5ZXJDYXB0aW9uKTtcclxuICAgIHBsYXllckNvbnRlbnQuYXBwZW5kQ2hpbGQocGxheWVyQm9hcmRDb250YWluZXIpO1xyXG4gICAgZW5lbXlDb250ZW50LmFwcGVuZENoaWxkKGVuZW15Q2FwdGlvbik7XHJcbiAgICBlbmVteUNvbnRlbnQuYXBwZW5kQ2hpbGQoZW5lbXlCb2FyZENvbnRhaW5lcik7XHJcbiAgICBnYW1lQ29udGVudC5hcHBlbmRDaGlsZChwbGF5ZXJDb250ZW50KTtcclxuICAgIGdhbWVDb250ZW50LmFwcGVuZENoaWxkKGVuZW15Q29udGVudCk7XHJcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShnYW1lQ29udGVudCwgZm9ybSk7XHJcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShtZXNzYWdlQm94LCBnYW1lQ29udGVudCk7XHJcbiAgfSxcclxuXHJcbiAgZW5kR2FtZSgpIHtcclxuICAgIGNvbnN0IG1lc3NhZ2VCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZS1ib3gnKTtcclxuICAgIGNvbnN0IG5ld0dhbWVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIG5ld0dhbWVCdXR0b24uY2xhc3NMaXN0LmFkZCgnbmV3LWdhbWUnKTtcclxuICAgIG5ld0dhbWVCdXR0b24udGV4dENvbnRlbnQgPSAnTmV3IEdhbWUnO1xyXG4gICAgbWVzc2FnZUJveC5hcHBlbmRDaGlsZChuZXdHYW1lQnV0dG9uKTtcclxuICB9LFxyXG5cclxuICBvcGVuRm9ybSgpIHtcclxuICAgIGNvbnN0IG1lc3NhZ2VCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZS1ib3gnKTtcclxuICAgIGNvbnN0IGdhbWVDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtY29udGVudCcpO1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcclxuICAgIG1lc3NhZ2VCb3gucmVtb3ZlKCk7XHJcbiAgICBnYW1lQ29udGVudC5yZW1vdmUoKTtcclxuICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgfSxcclxuXHJcbiAgYnVpbGRCb2FyZChnYW1lYm9hcmQpIHtcclxuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBib2FyZC5jbGFzc0xpc3QuYWRkKCdib2FyZCcpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpICs9IDEpIHtcclxuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcclxuICAgICAgY2VsbC5kYXRhc2V0LmNlbGwgPSBpO1xyXG5cclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBnYW1lYm9hcmQucHJldmlvdXNBdHRhY2tzLmxlbmd0aDsgaiArPSAxKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgZ2FtZWJvYXJkLnByZXZpb3VzQXR0YWNrc1tqXVswXSA9PT0gTWF0aC5mbG9vcihpIC8gMTApICYmXHJcbiAgICAgICAgICBnYW1lYm9hcmQucHJldmlvdXNBdHRhY2tzW2pdWzFdID09PSBpICUgMTBcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnYXR0YWNrZWQnKTtcclxuXHJcbiAgICAgICAgICBpZiAodHlwZW9mIGdhbWVib2FyZC5ib2FyZFtNYXRoLmZsb29yKGkgLyAxMCldW2kgJSAxMF0gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBib2FyZC5hcHBlbmRDaGlsZChjZWxsKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYm9hcmQ7XHJcbiAgfSxcclxuXHJcbiAgYXBwZW5kQm9hcmRzKHBsYXllckJvYXJkLCBjb21wdXRlckJvYXJkKSB7XHJcbiAgICBjb25zdCBwbGF5ZXJCb2FyZE5vZGUgPSBkb20uYnVpbGRCb2FyZChwbGF5ZXJCb2FyZCk7XHJcbiAgICBjb25zdCBjb21wdXRlckJvYXJkTm9kZSA9IGRvbS5idWlsZEJvYXJkKGNvbXB1dGVyQm9hcmQpO1xyXG4gICAgY29uc3QgYm9hcmRDb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJvYXJkLWNvbnRhaW5lcicpO1xyXG4gICAgYm9hcmRDb250YWluZXJzWzBdLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICBib2FyZENvbnRhaW5lcnNbMV0udGV4dENvbnRlbnQgPSAnJztcclxuICAgIGJvYXJkQ29udGFpbmVyc1swXS5hcHBlbmRDaGlsZChwbGF5ZXJCb2FyZE5vZGUpO1xyXG4gICAgYm9hcmRDb250YWluZXJzWzFdLmFwcGVuZENoaWxkKGNvbXB1dGVyQm9hcmROb2RlKTtcclxuICB9LFxyXG5cclxuICBuZXdNZXNzYWdlKG1lc3NhZ2UpIHtcclxuICAgIGNvbnN0IG1lc3NhZ2VCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZS1ib3gnKTtcclxuICAgIG1lc3NhZ2VCb3gudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkb207XHJcbiIsImltcG9ydCBTaGlwIGZyb20gJy4vc2hpcCc7XHJcblxyXG5jbGFzcyBHYW1lYm9hcmQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ib2FyZCA9IFtdO1xyXG4gICAgdGhpcy5wcmV2aW91c0F0dGFja3MgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcclxuICAgICAgY29uc3QgdGVtcCA9IFtdO1xyXG5cclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XHJcbiAgICAgICAgdGVtcC5wdXNoKCdlbXB0eScpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmJvYXJkLnB1c2godGVtcCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwbGFjZVNoaXAoY29vcmRpbmF0ZXMpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gbmV3IFNoaXAoY29vcmRpbmF0ZXMubGVuZ3RoKTtcclxuXHJcbiAgICBjb29yZGluYXRlcy5mb3JFYWNoKChjb29yZFBhaXIpID0+IHtcclxuICAgICAgdGhpcy5ib2FyZFtjb29yZFBhaXJbMF1dW2Nvb3JkUGFpclsxXV0gPSBjdXJyZW50U2hpcDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVjZWl2ZUF0dGFjayhjb29yZFBhaXIpIHtcclxuICAgIHRoaXMucHJldmlvdXNBdHRhY2tzLnB1c2goY29vcmRQYWlyKTtcclxuICAgIGNvbnN0IGNlbGwgPSB0aGlzLmJvYXJkW2Nvb3JkUGFpclswXV1bY29vcmRQYWlyWzFdXTtcclxuXHJcbiAgICBpZiAodHlwZW9mIGNlbGwgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGNlbGwuaGl0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmJvYXJkW2Nvb3JkUGFpclswXV1bY29vcmRQYWlyWzFdXSA9ICdtaXNzJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFsbFN1bmsoKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgdHlwZW9mIHRoaXMuYm9hcmRbaV1bal0gPT09ICdvYmplY3QnICYmXHJcbiAgICAgICAgICAhdGhpcy5ib2FyZFtpXVtqXS5pc1N1bmsoKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgaW5QcmV2aW91c0F0dGFja3MoY29vcmRQYWlyKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJldmlvdXNBdHRhY2tzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICB0aGlzLnByZXZpb3VzQXR0YWNrc1tpXVswXSA9PT0gY29vcmRQYWlyWzBdICYmXHJcbiAgICAgICAgdGhpcy5wcmV2aW91c0F0dGFja3NbaV1bMV0gPT09IGNvb3JkUGFpclsxXVxyXG4gICAgICApIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcclxuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCc7XHJcblxyXG5jbGFzcyBQbGF5ZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5wbGF5ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcclxuICAgIHRoaXMuY29tcHV0ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcclxuICB9XHJcblxyXG4gIHBsYXllck1vdmUoY29vcmRQYWlyKSB7XHJcbiAgICBpZiAodGhpcy5jb21wdXRlckJvYXJkLmluUHJldmlvdXNBdHRhY2tzKGNvb3JkUGFpcikpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY29tcHV0ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkUGFpcik7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGNvbXB1dGVyTW92ZSgpIHtcclxuICAgIGxldCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICBsZXQgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG5cclxuICAgIHdoaWxlICh0aGlzLnBsYXllckJvYXJkLmluUHJldmlvdXNBdHRhY2tzKFtyb3csIGNvbHVtbl0pKSB7XHJcbiAgICAgIHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucGxheWVyQm9hcmQucmVjZWl2ZUF0dGFjayhbcm93LCBjb2x1bW5dKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcclxuIiwiY2xhc3MgU2hpcCB7XHJcbiAgY29uc3RydWN0b3IobGVuZ3RoKSB7XHJcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgIHRoaXMudGltZXNIaXQgPSAwO1xyXG4gIH1cclxuXHJcbiAgaGl0KCkge1xyXG4gICAgaWYgKCF0aGlzLmlzU3VuaygpKSB7XHJcbiAgICAgIHRoaXMudGltZXNIaXQgKz0gMTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzU3VuaygpIHtcclxuICAgIHJldHVybiB0aGlzLnRpbWVzSGl0ID09PSB0aGlzLmxlbmd0aDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNoaXA7XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2ZvbnRzL0lUQyBNYWNoaW5lIFJlZ3VsYXIub3RmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi9pbWcvYWxwaGEteC5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBAZm9udC1mYWNlIHtcclxuICBmb250LWZhbWlseTogJ0lUQyBNYWNoaW5lIFJlZ3VsYXInO1xyXG4gIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xyXG59XHJcblxyXG46cm9vdCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogbmF2eTtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XHJcbn1cclxuXHJcbmJvZHkge1xyXG4gIGhlaWdodDogMTAwdmg7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IG1heC1jb250ZW50IDFmcjtcclxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiAzMHB4O1xyXG59XHJcblxyXG5oMSB7XHJcbiAgZm9udC1mYW1pbHk6ICdJVEMgTWFjaGluZSBSZWd1bGFyJywgQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcclxuICBmb250LXNpemU6IDRyZW07XHJcbn1cclxuXHJcbi5lbnRlci1uYW1lIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDMsIG1heC1jb250ZW50KTtcclxuICBnYXA6IDEwcHg7XHJcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG5idXR0b24ge1xyXG4gIHdpZHRoOiBtYXgtY29udGVudDtcclxuICBwYWRkaW5nOiA1cHggMTBweDtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgbWFyZ2luLXRvcDogMjBweDtcclxufVxyXG5cclxuLm1lc3NhZ2UtYm94IHtcclxuICBmb250LXNpemU6IDEuNXJlbTtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtcm93czogbWF4LWNvbnRlbnQsIG1heC1jb250ZW50O1xyXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLmdhbWUtY29udGVudCB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtYXgtY29udGVudCBtYXgtY29udGVudDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcclxuICBmb250LWZhbWlseTogJ0lUQyBNYWNoaW5lIFJlZ3VsYXInLCBzYW5zLXNlcmlmO1xyXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gIGxldHRlci1zcGFjaW5nOiAycHg7XHJcbn1cclxuXHJcbi5ib2FyZCB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDMwcHgpO1xyXG4gIGdhcDogMXB4O1xyXG59XHJcblxyXG4jcGxheWVyIC5jZWxsIHtcclxuICBjdXJzb3I6IGF1dG87XHJcbn1cclxuXHJcbi5jZWxsIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5hdHRhY2tlZCB7XHJcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fX30pO1xyXG4gIGN1cnNvcjogYXV0bztcclxufVxyXG5cclxuLmhpdCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNjE2MTtcclxufVxyXG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxrQ0FBa0M7RUFDbEMsNENBQTZDO0FBQy9DOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWix5Q0FBeUM7QUFDM0M7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsYUFBYTtFQUNiLCtDQUErQztFQUMvQyxxQkFBcUI7RUFDckIsU0FBUztBQUNYOztBQUVBO0VBQ0UsZ0VBQWdFO0VBQ2hFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsMENBQTBDO0VBQzFDLFNBQVM7RUFDVCxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsYUFBYTtFQUNiLDRDQUE0QztFQUM1QyxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYiw4Q0FBOEM7RUFDOUMsNkJBQTZCO0VBQzdCLDhDQUE4QztFQUM5QyxpQkFBaUI7RUFDakIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHVDQUF1QztFQUN2QyxvQ0FBb0M7RUFDcEMsUUFBUTtBQUNWOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSx5REFBd0M7RUFDeEMsWUFBWTtBQUNkOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcclxcbiAgZm9udC1mYW1pbHk6ICdJVEMgTWFjaGluZSBSZWd1bGFyJztcXHJcXG4gIHNyYzogdXJsKCcuL2ZvbnRzL0lUQ1xcXFwgTWFjaGluZVxcXFwgUmVndWxhci5vdGYnKTtcXHJcXG59XFxyXFxuXFxyXFxuOnJvb3Qge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogbmF2eTtcXHJcXG4gIGNvbG9yOiB3aGl0ZTtcXHJcXG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGhlaWdodDogMTAwdmg7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtYXgtY29udGVudCBtYXgtY29udGVudCAxZnI7XFxyXFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBnYXA6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbmgxIHtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnSVRDIE1hY2hpbmUgUmVndWxhcicsIEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxyXFxuICBmb250LXNpemU6IDRyZW07XFxyXFxufVxcclxcblxcclxcbi5lbnRlci1uYW1lIHtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgzLCBtYXgtY29udGVudCk7XFxyXFxuICBnYXA6IDEwcHg7XFxyXFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbmJ1dHRvbiB7XFxyXFxuICB3aWR0aDogbWF4LWNvbnRlbnQ7XFxyXFxuICBwYWRkaW5nOiA1cHggMTBweDtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbi5tZXNzYWdlLWJveCB7XFxyXFxuICBmb250LXNpemU6IDEuNXJlbTtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50LCBtYXgtY29udGVudDtcXHJcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtY29udGVudCB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1heC1jb250ZW50IG1heC1jb250ZW50O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxyXFxuICBmb250LWZhbWlseTogJ0lUQyBNYWNoaW5lIFJlZ3VsYXInLCBzYW5zLXNlcmlmO1xcclxcbiAgZm9udC1zaXplOiAxLjVyZW07XFxyXFxuICBsZXR0ZXItc3BhY2luZzogMnB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQge1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAzMHB4KTtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAzMHB4KTtcXHJcXG4gIGdhcDogMXB4O1xcclxcbn1cXHJcXG5cXHJcXG4jcGxheWVyIC5jZWxsIHtcXHJcXG4gIGN1cnNvcjogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLmNlbGwge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5hdHRhY2tlZCB7XFxyXFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9pbWcvYWxwaGEteC5zdmcpO1xcclxcbiAgY3Vyc29yOiBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4uaGl0IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjYxNjE7XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4uL3N0eWxlLmNzcyc7XHJcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xyXG5pbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcclxuXHJcbmxldCBwbGF5ZXI7XHJcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XHJcbmNvbnN0IGUgPSB7IHByZXZlbnREZWZhdWx0KCkge30sIHRhcmdldDogeyByZXNldCgpIHt9IH0gfTtcclxuXHJcbmZ1bmN0aW9uIGVuZEdhbWUoKSB7XHJcbiAgaWYgKHBsYXllci5jb21wdXRlckJvYXJkLmFsbFN1bmsoKSkge1xyXG4gICAgZG9tLm5ld01lc3NhZ2UoJ0VuZW15IGZsZWV0IHN1bmshIFlvdSB3aW4hJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGRvbS5uZXdNZXNzYWdlKCdZb3VyIGZsZWV0IHdhcyBzdW5rISBHYW1lIG92ZXIhJyk7XHJcbiAgfVxyXG5cclxuICBkb20uZW5kR2FtZSgpO1xyXG5cclxuICBjb25zdCBuZXdHYW1lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy1nYW1lJyk7XHJcbiAgbmV3R2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRvbS5vcGVuRm9ybSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBsYXlSb3VuZChlKSB7XHJcbiAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgaWYgKFxyXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxsJykgJiZcclxuICAgICFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2F0dGFja2VkJylcclxuICApIHtcclxuICAgIGNvbnN0IHsgY2VsbCB9ID0gZS50YXJnZXQuZGF0YXNldDtcclxuICAgIHBsYXllci5wbGF5ZXJNb3ZlKFtNYXRoLmZsb29yKGNlbGwgLyAxMCksIGNlbGwgJSAxMF0pO1xyXG4gICAgcGxheWVyLmNvbXB1dGVyTW92ZSgpO1xyXG4gICAgZG9tLmFwcGVuZEJvYXJkcyhwbGF5ZXIucGxheWVyQm9hcmQsIHBsYXllci5jb21wdXRlckJvYXJkKTtcclxuICB9XHJcbiAgaWYgKHBsYXllci5wbGF5ZXJCb2FyZC5hbGxTdW5rKCkgfHwgcGxheWVyLmNvbXB1dGVyQm9hcmQuYWxsU3VuaygpKSB7XHJcbiAgICBlbmRHYW1lKCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XHJcbnBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxuZG9tLnN0YXJ0R2FtZShlKTtcclxuZG9tLmFwcGVuZEJvYXJkcyhwbGF5ZXIucGxheWVyQm9hcmQsIHBsYXllci5jb21wdXRlckJvYXJkKTtcclxuY29uc3QgZW5lbXlCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbmVteScpO1xyXG5lbmVteUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxheVJvdW5kKTtcclxuLy8gfSk7XHJcbiJdLCJuYW1lcyI6WyJkb20iLCJzdGFydEdhbWUiLCJlIiwicHJldmVudERlZmF1bHQiLCJuYW1lSW5wdXQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJuYW1lIiwidmFsdWUiLCJ0YXJnZXQiLCJyZXNldCIsImZvcm0iLCJzdHlsZSIsImRpc3BsYXkiLCJtZXNzYWdlQm94IiwiY3JlYXRlRWxlbWVudCIsImdhbWVDb250ZW50IiwicGxheWVyQ29udGVudCIsImVuZW15Q29udGVudCIsInBsYXllckNhcHRpb24iLCJlbmVteUNhcHRpb24iLCJwbGF5ZXJCb2FyZENvbnRhaW5lciIsImVuZW15Qm9hcmRDb250YWluZXIiLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRBdHRyaWJ1dGUiLCJ0ZXh0Q29udGVudCIsImFwcGVuZENoaWxkIiwiYm9keSIsImluc2VydEJlZm9yZSIsImVuZEdhbWUiLCJuZXdHYW1lQnV0dG9uIiwib3BlbkZvcm0iLCJyZW1vdmUiLCJidWlsZEJvYXJkIiwiZ2FtZWJvYXJkIiwiYm9hcmQiLCJpIiwiY2VsbCIsImRhdGFzZXQiLCJqIiwicHJldmlvdXNBdHRhY2tzIiwibGVuZ3RoIiwiTWF0aCIsImZsb29yIiwiYXBwZW5kQm9hcmRzIiwicGxheWVyQm9hcmQiLCJjb21wdXRlckJvYXJkIiwicGxheWVyQm9hcmROb2RlIiwiY29tcHV0ZXJCb2FyZE5vZGUiLCJib2FyZENvbnRhaW5lcnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibmV3TWVzc2FnZSIsIm1lc3NhZ2UiLCJTaGlwIiwiR2FtZWJvYXJkIiwiY29uc3RydWN0b3IiLCJ0ZW1wIiwicHVzaCIsInBsYWNlU2hpcCIsImNvb3JkaW5hdGVzIiwiY3VycmVudFNoaXAiLCJmb3JFYWNoIiwiY29vcmRQYWlyIiwicmVjZWl2ZUF0dGFjayIsImhpdCIsImFsbFN1bmsiLCJpc1N1bmsiLCJpblByZXZpb3VzQXR0YWNrcyIsIlBsYXllciIsInBsYXllck1vdmUiLCJjb21wdXRlck1vdmUiLCJyb3ciLCJyYW5kb20iLCJjb2x1bW4iLCJ0aW1lc0hpdCIsInBsYXllciIsImFkZEV2ZW50TGlzdGVuZXIiLCJwbGF5Um91bmQiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJjb250YWlucyIsImVuZW15Qm9hcmQiXSwic291cmNlUm9vdCI6IiJ9