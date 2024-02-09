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
  buildBoard(gameboard, isPlayer) {
    const board = document.createElement('div');
    board.classList.add('board');
    for (let i = 0; i < 100; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.cell = i;
      if (typeof gameboard.board[Math.floor(i / 10)][i % 10] === 'object' && isPlayer) {
        cell.classList.add('ship');
      }
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
    const playerBoardNode = dom.buildBoard(playerBoard, true);
    const computerBoardNode = dom.buildBoard(computerBoard, false);
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
  computerPlaceShips() {
    const ships = [{
      name: 'Carrier',
      size: 5
    }, {
      name: 'Battleship',
      size: 4
    }, {
      name: 'Destroyer',
      size: 3
    }, {
      name: 'Submarine',
      size: 3
    }, {
      name: 'Patrol Boat',
      size: 2
    }];
    ships.forEach(ship => {
      let keepGoing = true;
      while (keepGoing) {
        const isVertical = Math.floor(Math.random() * 2);
        if (isVertical === 0) {
          const row = Math.floor(Math.random() * 10);
          const firstColumn = Math.floor(Math.random() * (10 - ship.size));
          let allEmpty = true;
          for (let i = 0; i <= ship.size; i += 1) {
            const currentCell = this.computerBoard.board[row][firstColumn + i];
            if (typeof currentCell === 'object') {
              allEmpty = false;
              break;
            }
          }
          if (allEmpty) {
            const coordinates = [];
            for (let i = 0; i < ship.size; i += 1) {
              coordinates.push([row, firstColumn + i]);
            }
            this.computerBoard.placeShip(coordinates);
          }
          keepGoing = !allEmpty;
        } else {
          const firstRow = Math.floor(Math.random() * (10 - ship.size));
          const column = Math.floor(Math.random() * 10);
          let allEmpty = true;
          ;
          for (let i = 0; i <= ship.size; i += 1) {
            const currentCell = this.computerBoard.board[firstRow + i][column];
            if (typeof currentCell === 'object') {
              allEmpty = false;
              break;
            }
          }
          if (allEmpty) {
            const coordinates = [];
            for (let i = 0; i < ship.size; i += 1) {
              coordinates.push([firstRow + i, column]);
            }
            this.computerBoard.placeShip(coordinates);
          }
          keepGoing = !allEmpty;
        }
      }
    });
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

.ship {
  background-color: gray;
}

.attacked {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_1___});
  cursor: auto;
}

.hit {
  background-color: #ff6161;
}
`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,kCAAkC;EAClC,4CAA6C;AAC/C;;AAEA;EACE,sBAAsB;EACtB,YAAY;EACZ,yCAAyC;AAC3C;;AAEA;EACE,aAAa;EACb,aAAa;EACb,+CAA+C;EAC/C,qBAAqB;EACrB,SAAS;AACX;;AAEA;EACE,gEAAgE;EAChE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,0CAA0C;EAC1C,SAAS;EACT,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,iBAAiB;EACjB,aAAa;EACb,4CAA4C;EAC5C,qBAAqB;AACvB;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,aAAa;EACb,8CAA8C;EAC9C,6BAA6B;EAC7B,8CAA8C;EAC9C,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,uCAAuC;EACvC,oCAAoC;EACpC,QAAQ;AACV;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,uBAAuB;EACvB,eAAe;AACjB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,yDAAwC;EACxC,YAAY;AACd;;AAEA;EACE,yBAAyB;AAC3B","sourcesContent":["@font-face {\r\n  font-family: 'ITC Machine Regular';\r\n  src: url('./fonts/ITC\\ Machine\\ Regular.otf');\r\n}\r\n\r\n:root {\r\n  background-color: navy;\r\n  color: white;\r\n  font-family: Arial, Helvetica, sans-serif;\r\n}\r\n\r\nbody {\r\n  height: 100vh;\r\n  display: grid;\r\n  grid-template-rows: max-content max-content 1fr;\r\n  justify-items: center;\r\n  gap: 30px;\r\n}\r\n\r\nh1 {\r\n  font-family: 'ITC Machine Regular', Arial, Helvetica, sans-serif;\r\n  font-size: 4rem;\r\n}\r\n\r\n.enter-name {\r\n  display: grid;\r\n  grid-template-rows: repeat(3, max-content);\r\n  gap: 10px;\r\n  justify-items: center;\r\n}\r\n\r\nbutton {\r\n  width: max-content;\r\n  padding: 5px 10px;\r\n  border-radius: 5px;\r\n  margin-top: 20px;\r\n}\r\n\r\n.message-box {\r\n  font-size: 1.5rem;\r\n  display: grid;\r\n  grid-template-rows: max-content, max-content;\r\n  justify-items: center;\r\n}\r\n\r\n.game-content {\r\n  width: 100%;\r\n  text-align: center;\r\n  display: grid;\r\n  grid-template-columns: max-content max-content;\r\n  justify-content: space-evenly;\r\n  font-family: 'ITC Machine Regular', sans-serif;\r\n  font-size: 1.5rem;\r\n  letter-spacing: 2px;\r\n}\r\n\r\n.board {\r\n  display: grid;\r\n  grid-template-columns: repeat(10, 30px);\r\n  grid-template-rows: repeat(10, 30px);\r\n  gap: 1px;\r\n}\r\n\r\n#player .cell {\r\n  cursor: auto;\r\n}\r\n\r\n.cell {\r\n  background-color: white;\r\n  cursor: pointer;\r\n}\r\n\r\n.ship {\r\n  background-color: gray;\r\n}\r\n\r\n.attacked {\r\n  background-image: url(./img/alpha-x.svg);\r\n  cursor: auto;\r\n}\r\n\r\n.hit {\r\n  background-color: #ff6161;\r\n}\r\n"],"sourceRoot":""}]);
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
  const enemy = document.querySelector('#enemy');
  newGameButton.addEventListener('click', _dom__WEBPACK_IMPORTED_MODULE_2__["default"].openForm);
  enemy.removeEventListener('click', playRound);
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
player.computerPlaceShips();
_dom__WEBPACK_IMPORTED_MODULE_2__["default"].appendBoards(player.playerBoard, player.computerBoard);
const enemy = document.querySelector('#enemy');
enemy.addEventListener('click', playRound);
// });
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUN5QyxNQUFNLENBQUN4QyxXQUFXLEVBQUV3QyxNQUFNLENBQUN2QyxhQUFhLENBQUM7QUFDMUQsTUFBTXdDLEtBQUssR0FBR25GLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFFBQVEsQ0FBQztBQUM5Q2tGLEtBQUssQ0FBQ0MsZ0JBQWdCLENBQUMsT0FBTyxFQUFFRSxTQUFTLENBQUM7QUFDMUMsTSIsInNvdXJjZXMiOlsid2VicGFjazovL25ldy8uL3NyYy9qcy9kb20uanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vc3JjL2pzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9uZXcvLi9zcmMvanMvcGxheWVyLmpzIiwid2VicGFjazovL25ldy8uL3NyYy9qcy9zaGlwLmpzIiwid2VicGFjazovL25ldy8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vbmV3Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9uZXcvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL25ldy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL25ldy8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9uZXcvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9uZXcvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL25ldy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL25ldy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL25ldy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXcvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbmV3L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXcvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9uZXcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXcvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXcvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vbmV3L3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL25ldy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vbmV3Ly4vc3JjL2pzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGRvbSA9IHtcclxuICBzdGFydEdhbWUoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25hbWUnKTtcclxuICAgIGNvbnN0IG5hbWUgPSBuYW1lSW5wdXQudmFsdWU7XHJcbiAgICBlLnRhcmdldC5yZXNldCgpO1xyXG5cclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XHJcbiAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG4gICAgY29uc3QgbWVzc2FnZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIGNvbnN0IGdhbWVDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb25zdCBwbGF5ZXJDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb25zdCBlbmVteUNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IHBsYXllckNhcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xyXG4gICAgY29uc3QgZW5lbXlDYXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcclxuICAgIGNvbnN0IHBsYXllckJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb25zdCBlbmVteUJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgbWVzc2FnZUJveC5jbGFzc0xpc3QuYWRkKCdtZXNzYWdlLWJveCcpO1xyXG4gICAgZ2FtZUNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnZ2FtZS1jb250ZW50Jyk7XHJcbiAgICBwbGF5ZXJDb250ZW50LmNsYXNzTGlzdC5hZGQoJ3BsYXllci1jb250ZW50Jyk7XHJcbiAgICBlbmVteUNvbnRlbnQuY2xhc3NMaXN0LmFkZCgncGxheWVyLWNvbnRlbnQnKTtcclxuICAgIHBsYXllckNhcHRpb24uY2xhc3NMaXN0LmFkZCgnY2FwdGlvbicpO1xyXG4gICAgZW5lbXlDYXB0aW9uLmNsYXNzTGlzdC5hZGQoJ2NhcHRpb24nKTtcclxuICAgIHBsYXllckJvYXJkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYm9hcmQtY29udGFpbmVyJyk7XHJcbiAgICBwbGF5ZXJCb2FyZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3BsYXllcicpO1xyXG4gICAgZW5lbXlCb2FyZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2JvYXJkLWNvbnRhaW5lcicpO1xyXG4gICAgZW5lbXlCb2FyZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2VuZW15Jyk7XHJcblxyXG4gICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9ICdQbGFjZSB5b3VyIHNoaXBzJztcclxuICAgIHBsYXllckNhcHRpb24udGV4dENvbnRlbnQgPSBuYW1lID8gYCR7bmFtZX0ncyBGbGVldGAgOiBcIlBsYXllcidzIEZsZWV0XCI7XHJcbiAgICBlbmVteUNhcHRpb24udGV4dENvbnRlbnQgPSBgRW5lbXkgRmxlZXRgO1xyXG5cclxuICAgIHBsYXllckNvbnRlbnQuYXBwZW5kQ2hpbGQocGxheWVyQ2FwdGlvbik7XHJcbiAgICBwbGF5ZXJDb250ZW50LmFwcGVuZENoaWxkKHBsYXllckJvYXJkQ29udGFpbmVyKTtcclxuICAgIGVuZW15Q29udGVudC5hcHBlbmRDaGlsZChlbmVteUNhcHRpb24pO1xyXG4gICAgZW5lbXlDb250ZW50LmFwcGVuZENoaWxkKGVuZW15Qm9hcmRDb250YWluZXIpO1xyXG4gICAgZ2FtZUNvbnRlbnQuYXBwZW5kQ2hpbGQocGxheWVyQ29udGVudCk7XHJcbiAgICBnYW1lQ29udGVudC5hcHBlbmRDaGlsZChlbmVteUNvbnRlbnQpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUoZ2FtZUNvbnRlbnQsIGZvcm0pO1xyXG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUobWVzc2FnZUJveCwgZ2FtZUNvbnRlbnQpO1xyXG4gIH0sXHJcblxyXG4gIGVuZEdhbWUoKSB7XHJcbiAgICBjb25zdCBtZXNzYWdlQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2UtYm94Jyk7XHJcbiAgICBjb25zdCBuZXdHYW1lQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBuZXdHYW1lQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ25ldy1nYW1lJyk7XHJcbiAgICBuZXdHYW1lQnV0dG9uLnRleHRDb250ZW50ID0gJ05ldyBHYW1lJztcclxuICAgIG1lc3NhZ2VCb3guYXBwZW5kQ2hpbGQobmV3R2FtZUJ1dHRvbik7XHJcbiAgfSxcclxuXHJcbiAgb3BlbkZvcm0oKSB7XHJcbiAgICBjb25zdCBtZXNzYWdlQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2UtYm94Jyk7XHJcbiAgICBjb25zdCBnYW1lQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLWNvbnRlbnQnKTtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XHJcbiAgICBtZXNzYWdlQm94LnJlbW92ZSgpO1xyXG4gICAgZ2FtZUNvbnRlbnQucmVtb3ZlKCk7XHJcbiAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gIH0sXHJcblxyXG4gIGJ1aWxkQm9hcmQoZ2FtZWJvYXJkLCBpc1BsYXllcikge1xyXG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGJvYXJkLmNsYXNzTGlzdC5hZGQoJ2JvYXJkJyk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkgKz0gMSkge1xyXG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xyXG4gICAgICBjZWxsLmRhdGFzZXQuY2VsbCA9IGk7XHJcblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdHlwZW9mIGdhbWVib2FyZC5ib2FyZFtNYXRoLmZsb29yKGkgLyAxMCldW2kgJSAxMF0gPT09ICdvYmplY3QnICYmXHJcbiAgICAgICAgaXNQbGF5ZXJcclxuICAgICAgKSB7XHJcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ2FtZWJvYXJkLnByZXZpb3VzQXR0YWNrcy5sZW5ndGg7IGogKz0gMSkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIGdhbWVib2FyZC5wcmV2aW91c0F0dGFja3Nbal1bMF0gPT09IE1hdGguZmxvb3IoaSAvIDEwKSAmJlxyXG4gICAgICAgICAgZ2FtZWJvYXJkLnByZXZpb3VzQXR0YWNrc1tqXVsxXSA9PT0gaSAlIDEwXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2F0dGFja2VkJyk7XHJcblxyXG4gICAgICAgICAgaWYgKHR5cGVvZiBnYW1lYm9hcmQuYm9hcmRbTWF0aC5mbG9vcihpIC8gMTApXVtpICUgMTBdID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoY2VsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGJvYXJkO1xyXG4gIH0sXHJcblxyXG4gIGFwcGVuZEJvYXJkcyhwbGF5ZXJCb2FyZCwgY29tcHV0ZXJCb2FyZCkge1xyXG4gICAgY29uc3QgcGxheWVyQm9hcmROb2RlID0gZG9tLmJ1aWxkQm9hcmQocGxheWVyQm9hcmQsIHRydWUpO1xyXG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZE5vZGUgPSBkb20uYnVpbGRCb2FyZChjb21wdXRlckJvYXJkLCBmYWxzZSk7XHJcbiAgICBjb25zdCBib2FyZENvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm9hcmQtY29udGFpbmVyJyk7XHJcbiAgICBib2FyZENvbnRhaW5lcnNbMF0udGV4dENvbnRlbnQgPSAnJztcclxuICAgIGJvYXJkQ29udGFpbmVyc1sxXS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgYm9hcmRDb250YWluZXJzWzBdLmFwcGVuZENoaWxkKHBsYXllckJvYXJkTm9kZSk7XHJcbiAgICBib2FyZENvbnRhaW5lcnNbMV0uYXBwZW5kQ2hpbGQoY29tcHV0ZXJCb2FyZE5vZGUpO1xyXG4gIH0sXHJcblxyXG4gIG5ld01lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgY29uc3QgbWVzc2FnZUJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlLWJveCcpO1xyXG4gICAgbWVzc2FnZUJveC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRvbTtcclxuIiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcclxuXHJcbmNsYXNzIEdhbWVib2FyZCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmJvYXJkID0gW107XHJcbiAgICB0aGlzLnByZXZpb3VzQXR0YWNrcyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xyXG4gICAgICBjb25zdCB0ZW1wID0gW107XHJcblxyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcclxuICAgICAgICB0ZW1wLnB1c2goJ2VtcHR5Jyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuYm9hcmQucHVzaCh0ZW1wKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBsYWNlU2hpcChjb29yZGluYXRlcykge1xyXG4gICAgY29uc3QgY3VycmVudFNoaXAgPSBuZXcgU2hpcChjb29yZGluYXRlcy5sZW5ndGgpO1xyXG5cclxuICAgIGNvb3JkaW5hdGVzLmZvckVhY2goKGNvb3JkUGFpcikgPT4ge1xyXG4gICAgICB0aGlzLmJvYXJkW2Nvb3JkUGFpclswXV1bY29vcmRQYWlyWzFdXSA9IGN1cnJlbnRTaGlwO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZWNlaXZlQXR0YWNrKGNvb3JkUGFpcikge1xyXG4gICAgdGhpcy5wcmV2aW91c0F0dGFja3MucHVzaChjb29yZFBhaXIpO1xyXG4gICAgY29uc3QgY2VsbCA9IHRoaXMuYm9hcmRbY29vcmRQYWlyWzBdXVtjb29yZFBhaXJbMV1dO1xyXG5cclxuICAgIGlmICh0eXBlb2YgY2VsbCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgY2VsbC5oaXQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYm9hcmRbY29vcmRQYWlyWzBdXVtjb29yZFBhaXJbMV1dID0gJ21pc3MnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWxsU3VuaygpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB0eXBlb2YgdGhpcy5ib2FyZFtpXVtqXSA9PT0gJ29iamVjdCcgJiZcclxuICAgICAgICAgICF0aGlzLmJvYXJkW2ldW2pdLmlzU3VuaygpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBpblByZXZpb3VzQXR0YWNrcyhjb29yZFBhaXIpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcmV2aW91c0F0dGFja3MubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMucHJldmlvdXNBdHRhY2tzW2ldWzBdID09PSBjb29yZFBhaXJbMF0gJiZcclxuICAgICAgICB0aGlzLnByZXZpb3VzQXR0YWNrc1tpXVsxXSA9PT0gY29vcmRQYWlyWzFdXHJcbiAgICAgICkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xyXG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkJztcclxuXHJcbmNsYXNzIFBsYXllciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnBsYXllckJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xyXG4gICAgdGhpcy5jb21wdXRlckJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xyXG4gIH1cclxuXHJcbiAgcGxheWVyTW92ZShjb29yZFBhaXIpIHtcclxuICAgIGlmICh0aGlzLmNvbXB1dGVyQm9hcmQuaW5QcmV2aW91c0F0dGFja3MoY29vcmRQYWlyKSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jb21wdXRlckJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRQYWlyKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgY29tcHV0ZXJNb3ZlKCkge1xyXG4gICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgIGxldCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcblxyXG4gICAgd2hpbGUgKHRoaXMucGxheWVyQm9hcmQuaW5QcmV2aW91c0F0dGFja3MoW3JvdywgY29sdW1uXSkpIHtcclxuICAgICAgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wbGF5ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKFtyb3csIGNvbHVtbl0pO1xyXG4gIH1cclxuXHJcbiAgY29tcHV0ZXJQbGFjZVNoaXBzKCkge1xyXG4gICAgY29uc3Qgc2hpcHMgPSBbXHJcbiAgICAgIHsgbmFtZTogJ0NhcnJpZXInLCBzaXplOiA1IH0sXHJcbiAgICAgIHsgbmFtZTogJ0JhdHRsZXNoaXAnLCBzaXplOiA0IH0sXHJcbiAgICAgIHsgbmFtZTogJ0Rlc3Ryb3llcicsIHNpemU6IDMgfSxcclxuICAgICAgeyBuYW1lOiAnU3VibWFyaW5lJywgc2l6ZTogMyB9LFxyXG4gICAgICB7IG5hbWU6ICdQYXRyb2wgQm9hdCcsIHNpemU6IDIgfSxcclxuICAgIF07XHJcblxyXG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICBsZXQga2VlcEdvaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgIHdoaWxlIChrZWVwR29pbmcpIHtcclxuICAgICAgICBjb25zdCBpc1ZlcnRpY2FsID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XHJcblxyXG4gICAgICAgIGlmIChpc1ZlcnRpY2FsID09PSAwKSB7XHJcbiAgICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgICBjb25zdCBmaXJzdENvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMCAtIHNoaXAuc2l6ZSkpO1xyXG4gICAgICAgICAgbGV0IGFsbEVtcHR5ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBzaGlwLnNpemU7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Q2VsbCA9IHRoaXMuY29tcHV0ZXJCb2FyZC5ib2FyZFtyb3ddW2ZpcnN0Q29sdW1uICsgaV07XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGN1cnJlbnRDZWxsID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgIGFsbEVtcHR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoYWxsRW1wdHkpIHtcclxuICAgICAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5zaXplOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKFtyb3csIGZpcnN0Q29sdW1uICsgaV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKGNvb3JkaW5hdGVzKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBrZWVwR29pbmcgPSAhYWxsRW1wdHk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IGZpcnN0Um93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwIC0gc2hpcC5zaXplKSk7XHJcbiAgICAgICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgICBsZXQgYWxsRW1wdHkgPSB0cnVlOztcclxuXHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBzaGlwLnNpemU7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Q2VsbCA9IHRoaXMuY29tcHV0ZXJCb2FyZC5ib2FyZFtmaXJzdFJvdyArIGldW2NvbHVtbl07XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGN1cnJlbnRDZWxsID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgIGFsbEVtcHR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoYWxsRW1wdHkpIHtcclxuICAgICAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5zaXplOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKFtmaXJzdFJvdyArIGksIGNvbHVtbl0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKGNvb3JkaW5hdGVzKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBrZWVwR29pbmcgPSAhYWxsRW1wdHk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcclxuIiwiY2xhc3MgU2hpcCB7XHJcbiAgY29uc3RydWN0b3IobGVuZ3RoKSB7XHJcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgIHRoaXMudGltZXNIaXQgPSAwO1xyXG4gIH1cclxuXHJcbiAgaGl0KCkge1xyXG4gICAgaWYgKCF0aGlzLmlzU3VuaygpKSB7XHJcbiAgICAgIHRoaXMudGltZXNIaXQgKz0gMTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzU3VuaygpIHtcclxuICAgIHJldHVybiB0aGlzLnRpbWVzSGl0ID09PSB0aGlzLmxlbmd0aDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNoaXA7XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2ZvbnRzL0lUQyBNYWNoaW5lIFJlZ3VsYXIub3RmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi9pbWcvYWxwaGEteC5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBAZm9udC1mYWNlIHtcclxuICBmb250LWZhbWlseTogJ0lUQyBNYWNoaW5lIFJlZ3VsYXInO1xyXG4gIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xyXG59XHJcblxyXG46cm9vdCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogbmF2eTtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XHJcbn1cclxuXHJcbmJvZHkge1xyXG4gIGhlaWdodDogMTAwdmg7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IG1heC1jb250ZW50IDFmcjtcclxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiAzMHB4O1xyXG59XHJcblxyXG5oMSB7XHJcbiAgZm9udC1mYW1pbHk6ICdJVEMgTWFjaGluZSBSZWd1bGFyJywgQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcclxuICBmb250LXNpemU6IDRyZW07XHJcbn1cclxuXHJcbi5lbnRlci1uYW1lIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDMsIG1heC1jb250ZW50KTtcclxuICBnYXA6IDEwcHg7XHJcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG5idXR0b24ge1xyXG4gIHdpZHRoOiBtYXgtY29udGVudDtcclxuICBwYWRkaW5nOiA1cHggMTBweDtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgbWFyZ2luLXRvcDogMjBweDtcclxufVxyXG5cclxuLm1lc3NhZ2UtYm94IHtcclxuICBmb250LXNpemU6IDEuNXJlbTtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtcm93czogbWF4LWNvbnRlbnQsIG1heC1jb250ZW50O1xyXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLmdhbWUtY29udGVudCB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtYXgtY29udGVudCBtYXgtY29udGVudDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcclxuICBmb250LWZhbWlseTogJ0lUQyBNYWNoaW5lIFJlZ3VsYXInLCBzYW5zLXNlcmlmO1xyXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gIGxldHRlci1zcGFjaW5nOiAycHg7XHJcbn1cclxuXHJcbi5ib2FyZCB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDMwcHgpO1xyXG4gIGdhcDogMXB4O1xyXG59XHJcblxyXG4jcGxheWVyIC5jZWxsIHtcclxuICBjdXJzb3I6IGF1dG87XHJcbn1cclxuXHJcbi5jZWxsIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5zaGlwIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xyXG59XHJcblxyXG4uYXR0YWNrZWQge1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX199KTtcclxuICBjdXJzb3I6IGF1dG87XHJcbn1cclxuXHJcbi5oaXQge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjYxNjE7XHJcbn1cclxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usa0NBQWtDO0VBQ2xDLDRDQUE2QztBQUMvQzs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixZQUFZO0VBQ1oseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGFBQWE7RUFDYiwrQ0FBK0M7RUFDL0MscUJBQXFCO0VBQ3JCLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGdFQUFnRTtFQUNoRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDBDQUEwQztFQUMxQyxTQUFTO0VBQ1QscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGFBQWE7RUFDYiw0Q0FBNEM7RUFDNUMscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsOENBQThDO0VBQzlDLDZCQUE2QjtFQUM3Qiw4Q0FBOEM7RUFDOUMsaUJBQWlCO0VBQ2pCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGFBQWE7RUFDYix1Q0FBdUM7RUFDdkMsb0NBQW9DO0VBQ3BDLFFBQVE7QUFDVjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLHVCQUF1QjtFQUN2QixlQUFlO0FBQ2pCOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UseURBQXdDO0VBQ3hDLFlBQVk7QUFDZDs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnSVRDIE1hY2hpbmUgUmVndWxhcic7XFxyXFxuICBzcmM6IHVybCgnLi9mb250cy9JVENcXFxcIE1hY2hpbmVcXFxcIFJlZ3VsYXIub3RmJyk7XFxyXFxufVxcclxcblxcclxcbjpyb290IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IG5hdnk7XFxyXFxuICBjb2xvcjogd2hpdGU7XFxyXFxuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBoZWlnaHQ6IDEwMHZoO1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogbWF4LWNvbnRlbnQgbWF4LWNvbnRlbnQgMWZyO1xcclxcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcclxcbiAgZ2FwOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG5oMSB7XFxyXFxuICBmb250LWZhbWlseTogJ0lUQyBNYWNoaW5lIFJlZ3VsYXInLCBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcclxcbiAgZm9udC1zaXplOiA0cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4uZW50ZXItbmFtZSB7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMywgbWF4LWNvbnRlbnQpO1xcclxcbiAgZ2FwOiAxMHB4O1xcclxcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG5idXR0b24ge1xcclxcbiAgd2lkdGg6IG1heC1jb250ZW50O1xcclxcbiAgcGFkZGluZzogNXB4IDEwcHg7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWVzc2FnZS1ib3gge1xcclxcbiAgZm9udC1zaXplOiAxLjVyZW07XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtYXgtY29udGVudCwgbWF4LWNvbnRlbnQ7XFxyXFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLWNvbnRlbnQge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtYXgtY29udGVudCBtYXgtY29udGVudDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcclxcbiAgZm9udC1mYW1pbHk6ICdJVEMgTWFjaGluZSBSZWd1bGFyJywgc2Fucy1zZXJpZjtcXHJcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcclxcbiAgbGV0dGVyLXNwYWNpbmc6IDJweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkIHtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxyXFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMzBweCk7XFxyXFxuICBnYXA6IDFweDtcXHJcXG59XFxyXFxuXFxyXFxuI3BsYXllciAuY2VsbCB7XFxyXFxuICBjdXJzb3I6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi5jZWxsIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcCB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xcclxcbn1cXHJcXG5cXHJcXG4uYXR0YWNrZWQge1xcclxcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaW1nL2FscGhhLXguc3ZnKTtcXHJcXG4gIGN1cnNvcjogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLmhpdCB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY2MTYxO1xcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuLi9zdHlsZS5jc3MnO1xyXG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcclxuaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XHJcblxyXG5sZXQgcGxheWVyO1xyXG5jb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpO1xyXG5jb25zdCBlID0geyBwcmV2ZW50RGVmYXVsdCgpIHt9LCB0YXJnZXQ6IHsgcmVzZXQoKSB7fSB9IH07XHJcblxyXG5mdW5jdGlvbiBlbmRHYW1lKCkge1xyXG4gIGlmIChwbGF5ZXIuY29tcHV0ZXJCb2FyZC5hbGxTdW5rKCkpIHtcclxuICAgIGRvbS5uZXdNZXNzYWdlKCdFbmVteSBmbGVldCBzdW5rISBZb3Ugd2luIScpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBkb20ubmV3TWVzc2FnZSgnWW91ciBmbGVldCB3YXMgc3VuayEgR2FtZSBvdmVyIScpO1xyXG4gIH1cclxuXHJcbiAgZG9tLmVuZEdhbWUoKTtcclxuICBjb25zdCBuZXdHYW1lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy1nYW1lJyk7XHJcbiAgY29uc3QgZW5lbXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5lbXknKTtcclxuICBuZXdHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZG9tLm9wZW5Gb3JtKTtcclxuICBlbmVteS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYXlSb3VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBsYXlSb3VuZChlKSB7XHJcbiAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgaWYgKFxyXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxsJykgJiZcclxuICAgICFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2F0dGFja2VkJylcclxuICApIHtcclxuICAgIGNvbnN0IHsgY2VsbCB9ID0gZS50YXJnZXQuZGF0YXNldDtcclxuICAgIHBsYXllci5wbGF5ZXJNb3ZlKFtNYXRoLmZsb29yKGNlbGwgLyAxMCksIGNlbGwgJSAxMF0pO1xyXG4gICAgcGxheWVyLmNvbXB1dGVyTW92ZSgpO1xyXG4gICAgZG9tLmFwcGVuZEJvYXJkcyhwbGF5ZXIucGxheWVyQm9hcmQsIHBsYXllci5jb21wdXRlckJvYXJkKTtcclxuICB9XHJcbiAgaWYgKHBsYXllci5wbGF5ZXJCb2FyZC5hbGxTdW5rKCkgfHwgcGxheWVyLmNvbXB1dGVyQm9hcmQuYWxsU3VuaygpKSB7XHJcbiAgICBlbmRHYW1lKCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XHJcbnBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxuZG9tLnN0YXJ0R2FtZShlKTtcclxucGxheWVyLmNvbXB1dGVyUGxhY2VTaGlwcygpO1xyXG5kb20uYXBwZW5kQm9hcmRzKHBsYXllci5wbGF5ZXJCb2FyZCwgcGxheWVyLmNvbXB1dGVyQm9hcmQpO1xyXG5jb25zdCBlbmVteSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbmVteScpO1xyXG5lbmVteS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYXlSb3VuZCk7XHJcbi8vIH0pO1xyXG4iXSwibmFtZXMiOlsiZG9tIiwic3RhcnRHYW1lIiwiZSIsInByZXZlbnREZWZhdWx0IiwibmFtZUlucHV0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibmFtZSIsInZhbHVlIiwidGFyZ2V0IiwicmVzZXQiLCJmb3JtIiwic3R5bGUiLCJkaXNwbGF5IiwibWVzc2FnZUJveCIsImNyZWF0ZUVsZW1lbnQiLCJnYW1lQ29udGVudCIsInBsYXllckNvbnRlbnQiLCJlbmVteUNvbnRlbnQiLCJwbGF5ZXJDYXB0aW9uIiwiZW5lbXlDYXB0aW9uIiwicGxheWVyQm9hcmRDb250YWluZXIiLCJlbmVteUJvYXJkQ29udGFpbmVyIiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0QXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJhcHBlbmRDaGlsZCIsImJvZHkiLCJpbnNlcnRCZWZvcmUiLCJlbmRHYW1lIiwibmV3R2FtZUJ1dHRvbiIsIm9wZW5Gb3JtIiwicmVtb3ZlIiwiYnVpbGRCb2FyZCIsImdhbWVib2FyZCIsImlzUGxheWVyIiwiYm9hcmQiLCJpIiwiY2VsbCIsImRhdGFzZXQiLCJNYXRoIiwiZmxvb3IiLCJqIiwicHJldmlvdXNBdHRhY2tzIiwibGVuZ3RoIiwiYXBwZW5kQm9hcmRzIiwicGxheWVyQm9hcmQiLCJjb21wdXRlckJvYXJkIiwicGxheWVyQm9hcmROb2RlIiwiY29tcHV0ZXJCb2FyZE5vZGUiLCJib2FyZENvbnRhaW5lcnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibmV3TWVzc2FnZSIsIm1lc3NhZ2UiLCJTaGlwIiwiR2FtZWJvYXJkIiwiY29uc3RydWN0b3IiLCJ0ZW1wIiwicHVzaCIsInBsYWNlU2hpcCIsImNvb3JkaW5hdGVzIiwiY3VycmVudFNoaXAiLCJmb3JFYWNoIiwiY29vcmRQYWlyIiwicmVjZWl2ZUF0dGFjayIsImhpdCIsImFsbFN1bmsiLCJpc1N1bmsiLCJpblByZXZpb3VzQXR0YWNrcyIsIlBsYXllciIsInBsYXllck1vdmUiLCJjb21wdXRlck1vdmUiLCJyb3ciLCJyYW5kb20iLCJjb2x1bW4iLCJjb21wdXRlclBsYWNlU2hpcHMiLCJzaGlwcyIsInNpemUiLCJzaGlwIiwia2VlcEdvaW5nIiwiaXNWZXJ0aWNhbCIsImZpcnN0Q29sdW1uIiwiYWxsRW1wdHkiLCJjdXJyZW50Q2VsbCIsImZpcnN0Um93IiwidGltZXNIaXQiLCJwbGF5ZXIiLCJlbmVteSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicGxheVJvdW5kIiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwiY29udGFpbnMiXSwic291cmNlUm9vdCI6IiJ9