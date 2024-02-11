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
    const messageBox = document.createElement('div');
    const messageP = document.createElement('p');
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
    playerCaption.textContent = name ? `${name}'s Fleet` : "Player's Fleet";
    enemyCaption.textContent = `Enemy Fleet`;
    messageBox.appendChild(messageP);
    playerContent.appendChild(playerCaption);
    playerContent.appendChild(playerBoardContainer);
    enemyContent.appendChild(enemyCaption);
    enemyContent.appendChild(enemyBoardContainer);
    gameContent.appendChild(playerContent);
    gameContent.appendChild(enemyContent);
    document.body.insertBefore(messageBox, form);
    document.body.insertBefore(gameContent, messageBox);
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
  buildBoard(gameboard, type, condition) {
    const board = document.createElement('div');
    board.classList.add('board');
    for (let i = 0; i < 100; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.cell = i;
      if (typeof gameboard.board[Math.floor(i / 10)][i % 10] === 'object' && (type === 'player' || condition === 'game over')) {
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
      if (type === 'computer' && condition === 'normal play' && !cell.classList.contains('attacked')) {
        cell.classList.add('clickable');
      }
      board.appendChild(cell);
    }
    return board;
  },
  appendBoards(playerBoard, computerBoard, condition) {
    const playerBoardNode = dom.buildBoard(playerBoard, 'player', condition);
    const computerBoardNode = dom.buildBoard(computerBoard, 'computer', condition);
    const boardContainers = document.querySelectorAll('.board-container');
    boardContainers[0].textContent = '';
    boardContainers[1].textContent = '';
    boardContainers[0].appendChild(playerBoardNode);
    boardContainers[1].appendChild(computerBoardNode);
  },
  newMessage(message) {
    const messageP = document.querySelector('.message-box p');
    messageP.textContent = message;
  },
  createShips(isVertical) {
    const allShips = document.querySelector('.all-ships');
    if (isVertical) {
      allShips.classList.add('vertical');
    } else {
      allShips.classList.remove('vertical');
    }
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
    if (isVertical) {
      ships.forEach(ship => {
        const shipName = document.createElement('p');
        shipName.textContent = ship.name;
        allShips.append(shipName);
      });
    }
    ships.forEach(ship => {
      const shipDiv = document.createElement('div');
      shipDiv.classList.add('ship-div');
      const idName = ship.name === 'Patrol Boat' ? 'Patrol-Boat' : ship.name;
      shipDiv.setAttribute('id', idName);
      shipDiv.setAttribute('draggable', 'true');
      for (let i = 0; i < ship.size; i += 1) {
        const cell = document.createElement('div');
        cell.classList.add('ship');
        shipDiv.appendChild(cell);
      }
      if (!isVertical) {
        const shipName = document.createElement('p');
        shipName.textContent = ship.name;
        allShips.append(shipName);
      }
      allShips.append(shipDiv);
      shipDiv.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text', e.target.id);
      });
    });
  },
  playerPlaceShips(player) {
    let isVertical = false;
    const messageBox = document.querySelector('.message-box');
    const allShips = document.createElement('div');
    allShips.classList.add('all-ships');
    const rotateButton = document.createElement('button');
    rotateButton.textContent = 'Rotate';
    messageBox.appendChild(rotateButton);
    messageBox.append(allShips);
    rotateButton.addEventListener('click', () => {
      isVertical = !isVertical;
      allShips.textContent = '';
      this.createShips(isVertical);
    });
    this.appendBoards(player.playerBoard, player.computerBoard, 'ship placing');
    this.createShips(isVertical);
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
  placeShip(name, coordinates) {
    const currentShip = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](name, coordinates.length);
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
    this.computerBoard.receiveAttack(coordPair);
    const cell = this.computerBoard[coordPair[0]][coordPair[1]];
    let message = 'You missed the enemy';
    if (typeof cell === 'object') {
      message = 'You hit the enemy!';
      if (cell.isSunk) {
        message = `${message} You sunk the enemy's ${cell.name}!`;
      }
    }
    return message;
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
            this.computerBoard.placeShip(ship.name, coordinates);
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
            this.computerBoard.placeShip(ship.name, coordinates);
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
  constructor(name, length) {
    this.name = name;
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
  grid-template-rows: max-content max-content 200px;
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
  cursor: pointer;
}

.message-box {
  font-size: 1.5rem;
  display: grid;
  justify-items: center;
  grid-template-rows: max-content max-content;
}

.all-ships {
  display: grid;
  grid-template-columns: max-content max-content;
  align-items: center;
  justify-items: center;
  column-gap: 30px;
  margin: 20px 0;
}

.ship-div {
  display: grid;
  margin: 10px 0;
  grid-auto-flow: column;
  grid-auto-columns: 30px;
  gap: 1px;
  height: 30px;
  cursor: pointer;
  justify-self: start;
}

.vertical {
  grid-template-columns: repeat(5, max-content);
  grid-template-rows: max-content max-content;
}

.all-ships p {
  margin: 0;
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

.cell {
  background-color: white;
}

.ship {
  background-color: gray;
}

.attacked {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_1___});
}

.hit {
  background-color: #ff6161;
}

.clickable {
  cursor: pointer;
}
`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,kCAAkC;EAClC,4CAA6C;AAC/C;;AAEA;EACE,sBAAsB;EACtB,YAAY;EACZ,yCAAyC;AAC3C;;AAEA;EACE,aAAa;EACb,aAAa;EACb,iDAAiD;EACjD,qBAAqB;EACrB,SAAS;AACX;;AAEA;EACE,gEAAgE;EAChE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,0CAA0C;EAC1C,SAAS;EACT,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,iBAAiB;EACjB,aAAa;EACb,qBAAqB;EACrB,2CAA2C;AAC7C;;AAEA;EACE,aAAa;EACb,8CAA8C;EAC9C,mBAAmB;EACnB,qBAAqB;EACrB,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,cAAc;EACd,sBAAsB;EACtB,uBAAuB;EACvB,QAAQ;EACR,YAAY;EACZ,eAAe;EACf,mBAAmB;AACrB;;AAEA;EACE,6CAA6C;EAC7C,2CAA2C;AAC7C;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,aAAa;EACb,8CAA8C;EAC9C,6BAA6B;EAC7B,8CAA8C;EAC9C,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,uCAAuC;EACvC,oCAAoC;EACpC,QAAQ;AACV;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,yDAAwC;AAC1C;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,eAAe;AACjB","sourcesContent":["@font-face {\r\n  font-family: 'ITC Machine Regular';\r\n  src: url('./fonts/ITC\\ Machine\\ Regular.otf');\r\n}\r\n\r\n:root {\r\n  background-color: navy;\r\n  color: white;\r\n  font-family: Arial, Helvetica, sans-serif;\r\n}\r\n\r\nbody {\r\n  height: 100vh;\r\n  display: grid;\r\n  grid-template-rows: max-content max-content 200px;\r\n  justify-items: center;\r\n  gap: 30px;\r\n}\r\n\r\nh1 {\r\n  font-family: 'ITC Machine Regular', Arial, Helvetica, sans-serif;\r\n  font-size: 4rem;\r\n}\r\n\r\n.enter-name {\r\n  display: grid;\r\n  grid-template-rows: repeat(3, max-content);\r\n  gap: 10px;\r\n  justify-items: center;\r\n}\r\n\r\nbutton {\r\n  width: max-content;\r\n  padding: 5px 10px;\r\n  border-radius: 5px;\r\n  cursor: pointer;\r\n}\r\n\r\n.message-box {\r\n  font-size: 1.5rem;\r\n  display: grid;\r\n  justify-items: center;\r\n  grid-template-rows: max-content max-content;\r\n}\r\n\r\n.all-ships {\r\n  display: grid;\r\n  grid-template-columns: max-content max-content;\r\n  align-items: center;\r\n  justify-items: center;\r\n  column-gap: 30px;\r\n  margin: 20px 0;\r\n}\r\n\r\n.ship-div {\r\n  display: grid;\r\n  margin: 10px 0;\r\n  grid-auto-flow: column;\r\n  grid-auto-columns: 30px;\r\n  gap: 1px;\r\n  height: 30px;\r\n  cursor: pointer;\r\n  justify-self: start;\r\n}\r\n\r\n.vertical {\r\n  grid-template-columns: repeat(5, max-content);\r\n  grid-template-rows: max-content max-content;\r\n}\r\n\r\n.all-ships p {\r\n  margin: 0;\r\n}\r\n\r\n.game-content {\r\n  width: 100%;\r\n  text-align: center;\r\n  display: grid;\r\n  grid-template-columns: max-content max-content;\r\n  justify-content: space-evenly;\r\n  font-family: 'ITC Machine Regular', sans-serif;\r\n  font-size: 1.5rem;\r\n  letter-spacing: 2px;\r\n}\r\n\r\n.board {\r\n  display: grid;\r\n  grid-template-columns: repeat(10, 30px);\r\n  grid-template-rows: repeat(10, 30px);\r\n  gap: 1px;\r\n}\r\n\r\n.cell {\r\n  background-color: white;\r\n}\r\n\r\n.ship {\r\n  background-color: gray;\r\n}\r\n\r\n.attacked {\r\n  background-image: url(./img/alpha-x.svg);\r\n}\r\n\r\n.hit {\r\n  background-color: #ff6161;\r\n}\r\n\r\n.clickable {\r\n  cursor: pointer;\r\n}\r\n"],"sourceRoot":""}]);
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
function playRound(e) {
  e.stopImmediatePropagation();
  if (e.target.classList.contains('cell') && !e.target.classList.contains('attacked')) {
    const {
      cell
    } = e.target.dataset;
    const message = player.playerMove([Math.floor(cell / 10), cell % 10]);
    _dom__WEBPACK_IMPORTED_MODULE_2__["default"].newMessage(message);
    player.computerMove();
    _dom__WEBPACK_IMPORTED_MODULE_2__["default"].appendBoards(player.playerBoard, player.computerBoard, 'normal play');
  }
  if (player.playerBoard.allSunk() || player.computerBoard.allSunk()) {
    endGame();
  }
}
function endGame() {
  if (player.computerBoard.allSunk()) {
    _dom__WEBPACK_IMPORTED_MODULE_2__["default"].newMessage('Enemy fleet sunk! You win!');
  } else {
    _dom__WEBPACK_IMPORTED_MODULE_2__["default"].newMessage('Your fleet was sunk! Game over!');
  }
  _dom__WEBPACK_IMPORTED_MODULE_2__["default"].appendBoards(player.playerBoard, player.computerBoard, 'game over');
  _dom__WEBPACK_IMPORTED_MODULE_2__["default"].endGame();
  const newGameButton = document.querySelector('.new-game');
  const enemy = document.querySelector('#enemy');
  newGameButton.addEventListener('click', _dom__WEBPACK_IMPORTED_MODULE_2__["default"].openForm);
  enemy.removeEventListener('click', playRound);
}

// const form = document.querySelector('form');
const e = {
  preventDefault() {},
  target: {
    reset() {}
  }
};
// form.addEventListener('submit', (e) => {
player = new _player__WEBPACK_IMPORTED_MODULE_1__["default"]();
_dom__WEBPACK_IMPORTED_MODULE_2__["default"].startGame(e);
_dom__WEBPACK_IMPORTED_MODULE_2__["default"].playerPlaceShips(player);
player.computerPlaceShips();
// const enemy = document.querySelector('#enemy');
// enemy.addEventListener('click', playRound);
// });
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDM0I7QUFDQTtBQUNBLE0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXcvLi9zcmMvanMvZG9tLmpzIiwid2VicGFjazovL25ldy8uL3NyYy9qcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vc3JjL2pzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9uZXcvLi9zcmMvanMvc2hpcC5qcyIsIndlYnBhY2s6Ly9uZXcvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL25ldy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9uZXcvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9uZXcvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vbmV3Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL25ldy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL25ldy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9uZXcvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9uZXcvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9uZXcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25ldy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmV3L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmV3L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmV3L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV3L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL25ldy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9uZXcvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL25ldy8uL3NyYy9qcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkb20gPSB7XHJcbiAgc3RhcnRHYW1lKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuYW1lJyk7XHJcbiAgICBjb25zdCBuYW1lID0gbmFtZUlucHV0LnZhbHVlO1xyXG4gICAgZS50YXJnZXQucmVzZXQoKTtcclxuXHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpO1xyXG4gICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgIGNvbnN0IG1lc3NhZ2VCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IG1lc3NhZ2VQID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgY29uc3QgZ2FtZUNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IHBsYXllckNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IGVuZW15Q29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgcGxheWVyQ2FwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XHJcbiAgICBjb25zdCBlbmVteUNhcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xyXG4gICAgY29uc3QgcGxheWVyQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IGVuZW15Qm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICBtZXNzYWdlQm94LmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2UtYm94Jyk7XHJcbiAgICBnYW1lQ29udGVudC5jbGFzc0xpc3QuYWRkKCdnYW1lLWNvbnRlbnQnKTtcclxuICAgIHBsYXllckNvbnRlbnQuY2xhc3NMaXN0LmFkZCgncGxheWVyLWNvbnRlbnQnKTtcclxuICAgIGVuZW15Q29udGVudC5jbGFzc0xpc3QuYWRkKCdwbGF5ZXItY29udGVudCcpO1xyXG4gICAgcGxheWVyQ2FwdGlvbi5jbGFzc0xpc3QuYWRkKCdjYXB0aW9uJyk7XHJcbiAgICBlbmVteUNhcHRpb24uY2xhc3NMaXN0LmFkZCgnY2FwdGlvbicpO1xyXG4gICAgcGxheWVyQm9hcmRDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdib2FyZC1jb250YWluZXInKTtcclxuICAgIHBsYXllckJvYXJkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAncGxheWVyJyk7XHJcbiAgICBlbmVteUJvYXJkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYm9hcmQtY29udGFpbmVyJyk7XHJcbiAgICBlbmVteUJvYXJkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnZW5lbXknKTtcclxuXHJcbiAgICBwbGF5ZXJDYXB0aW9uLnRleHRDb250ZW50ID0gbmFtZSA/IGAke25hbWV9J3MgRmxlZXRgIDogXCJQbGF5ZXIncyBGbGVldFwiO1xyXG4gICAgZW5lbXlDYXB0aW9uLnRleHRDb250ZW50ID0gYEVuZW15IEZsZWV0YDtcclxuXHJcbiAgICBtZXNzYWdlQm94LmFwcGVuZENoaWxkKG1lc3NhZ2VQKTtcclxuICAgIHBsYXllckNvbnRlbnQuYXBwZW5kQ2hpbGQocGxheWVyQ2FwdGlvbik7XHJcbiAgICBwbGF5ZXJDb250ZW50LmFwcGVuZENoaWxkKHBsYXllckJvYXJkQ29udGFpbmVyKTtcclxuICAgIGVuZW15Q29udGVudC5hcHBlbmRDaGlsZChlbmVteUNhcHRpb24pO1xyXG4gICAgZW5lbXlDb250ZW50LmFwcGVuZENoaWxkKGVuZW15Qm9hcmRDb250YWluZXIpO1xyXG4gICAgZ2FtZUNvbnRlbnQuYXBwZW5kQ2hpbGQocGxheWVyQ29udGVudCk7XHJcbiAgICBnYW1lQ29udGVudC5hcHBlbmRDaGlsZChlbmVteUNvbnRlbnQpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUobWVzc2FnZUJveCwgZm9ybSk7XHJcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShnYW1lQ29udGVudCwgbWVzc2FnZUJveCk7XHJcbiAgfSxcclxuXHJcbiAgZW5kR2FtZSgpIHtcclxuICAgIGNvbnN0IG1lc3NhZ2VCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZS1ib3gnKTtcclxuICAgIGNvbnN0IG5ld0dhbWVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIG5ld0dhbWVCdXR0b24uY2xhc3NMaXN0LmFkZCgnbmV3LWdhbWUnKTtcclxuICAgIG5ld0dhbWVCdXR0b24udGV4dENvbnRlbnQgPSAnTmV3IEdhbWUnO1xyXG4gICAgbWVzc2FnZUJveC5hcHBlbmRDaGlsZChuZXdHYW1lQnV0dG9uKTtcclxuICB9LFxyXG5cclxuICBvcGVuRm9ybSgpIHtcclxuICAgIGNvbnN0IG1lc3NhZ2VCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZS1ib3gnKTtcclxuICAgIGNvbnN0IGdhbWVDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtY29udGVudCcpO1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcclxuICAgIG1lc3NhZ2VCb3gucmVtb3ZlKCk7XHJcbiAgICBnYW1lQ29udGVudC5yZW1vdmUoKTtcclxuICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgfSxcclxuXHJcbiAgYnVpbGRCb2FyZChnYW1lYm9hcmQsIHR5cGUsIGNvbmRpdGlvbikge1xyXG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGJvYXJkLmNsYXNzTGlzdC5hZGQoJ2JvYXJkJyk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkgKz0gMSkge1xyXG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xyXG4gICAgICBjZWxsLmRhdGFzZXQuY2VsbCA9IGk7XHJcblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdHlwZW9mIGdhbWVib2FyZC5ib2FyZFtNYXRoLmZsb29yKGkgLyAxMCldW2kgJSAxMF0gPT09ICdvYmplY3QnICYmXHJcbiAgICAgICAgKHR5cGUgPT09ICdwbGF5ZXInIHx8IGNvbmRpdGlvbiA9PT0gJ2dhbWUgb3ZlcicpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdhbWVib2FyZC5wcmV2aW91c0F0dGFja3MubGVuZ3RoOyBqICs9IDEpIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBnYW1lYm9hcmQucHJldmlvdXNBdHRhY2tzW2pdWzBdID09PSBNYXRoLmZsb29yKGkgLyAxMCkgJiZcclxuICAgICAgICAgIGdhbWVib2FyZC5wcmV2aW91c0F0dGFja3Nbal1bMV0gPT09IGkgJSAxMFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdhdHRhY2tlZCcpO1xyXG5cclxuICAgICAgICAgIGlmICh0eXBlb2YgZ2FtZWJvYXJkLmJvYXJkW01hdGguZmxvb3IoaSAvIDEwKV1baSAlIDEwXSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICB0eXBlID09PSAnY29tcHV0ZXInICYmXHJcbiAgICAgICAgY29uZGl0aW9uID09PSAnbm9ybWFsIHBsYXknICYmXHJcbiAgICAgICAgIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdhdHRhY2tlZCcpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2xpY2thYmxlJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGNlbGwpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBib2FyZDtcclxuICB9LFxyXG5cclxuICBhcHBlbmRCb2FyZHMocGxheWVyQm9hcmQsIGNvbXB1dGVyQm9hcmQsIGNvbmRpdGlvbikge1xyXG4gICAgY29uc3QgcGxheWVyQm9hcmROb2RlID0gZG9tLmJ1aWxkQm9hcmQocGxheWVyQm9hcmQsICdwbGF5ZXInLCBjb25kaXRpb24pO1xyXG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZE5vZGUgPSBkb20uYnVpbGRCb2FyZChcclxuICAgICAgY29tcHV0ZXJCb2FyZCxcclxuICAgICAgJ2NvbXB1dGVyJyxcclxuICAgICAgY29uZGl0aW9uLFxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBib2FyZENvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm9hcmQtY29udGFpbmVyJyk7XHJcbiAgICBib2FyZENvbnRhaW5lcnNbMF0udGV4dENvbnRlbnQgPSAnJztcclxuICAgIGJvYXJkQ29udGFpbmVyc1sxXS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgYm9hcmRDb250YWluZXJzWzBdLmFwcGVuZENoaWxkKHBsYXllckJvYXJkTm9kZSk7XHJcbiAgICBib2FyZENvbnRhaW5lcnNbMV0uYXBwZW5kQ2hpbGQoY29tcHV0ZXJCb2FyZE5vZGUpO1xyXG4gIH0sXHJcblxyXG4gIG5ld01lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgY29uc3QgbWVzc2FnZVAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZS1ib3ggcCcpO1xyXG4gICAgbWVzc2FnZVAudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZVNoaXBzKGlzVmVydGljYWwpIHtcclxuICAgIGNvbnN0IGFsbFNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsbC1zaGlwcycpO1xyXG5cclxuICAgIGlmIChpc1ZlcnRpY2FsKSB7XHJcbiAgICAgIGFsbFNoaXBzLmNsYXNzTGlzdC5hZGQoJ3ZlcnRpY2FsJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGxTaGlwcy5jbGFzc0xpc3QucmVtb3ZlKCd2ZXJ0aWNhbCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNoaXBzID0gW1xyXG4gICAgICB7IG5hbWU6ICdDYXJyaWVyJywgc2l6ZTogNSB9LFxyXG4gICAgICB7IG5hbWU6ICdCYXR0bGVzaGlwJywgc2l6ZTogNCB9LFxyXG4gICAgICB7IG5hbWU6ICdEZXN0cm95ZXInLCBzaXplOiAzIH0sXHJcbiAgICAgIHsgbmFtZTogJ1N1Ym1hcmluZScsIHNpemU6IDMgfSxcclxuICAgICAgeyBuYW1lOiAnUGF0cm9sIEJvYXQnLCBzaXplOiAyIH0sXHJcbiAgICBdO1xyXG5cclxuICAgIGlmIChpc1ZlcnRpY2FsKSB7XHJcbiAgICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgICBjb25zdCBzaGlwTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBzaGlwTmFtZS50ZXh0Q29udGVudCA9IHNoaXAubmFtZTtcclxuICAgICAgICBhbGxTaGlwcy5hcHBlbmQoc2hpcE5hbWUpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNoaXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgc2hpcERpdi5jbGFzc0xpc3QuYWRkKCdzaGlwLWRpdicpO1xyXG4gICAgICBjb25zdCBpZE5hbWUgPSBzaGlwLm5hbWUgPT09ICdQYXRyb2wgQm9hdCcgPyAnUGF0cm9sLUJvYXQnIDogc2hpcC5uYW1lO1xyXG4gICAgICBzaGlwRGl2LnNldEF0dHJpYnV0ZSgnaWQnLCBpZE5hbWUpO1xyXG4gICAgICBzaGlwRGl2LnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ3RydWUnKTtcclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5zaXplOyBpICs9IDEpIHtcclxuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XHJcbiAgICAgICAgc2hpcERpdi5hcHBlbmRDaGlsZChjZWxsKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFpc1ZlcnRpY2FsKSB7XHJcbiAgICAgICAgY29uc3Qgc2hpcE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgc2hpcE5hbWUudGV4dENvbnRlbnQgPSBzaGlwLm5hbWU7XHJcbiAgICAgICAgYWxsU2hpcHMuYXBwZW5kKHNoaXBOYW1lKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYWxsU2hpcHMuYXBwZW5kKHNoaXBEaXYpO1xyXG5cclxuICAgICAgc2hpcERpdi5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCAoZSkgPT4ge1xyXG4gICAgICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQnLCBlLnRhcmdldC5pZCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgcGxheWVyUGxhY2VTaGlwcyhwbGF5ZXIpIHtcclxuICAgIGxldCBpc1ZlcnRpY2FsID0gZmFsc2U7XHJcbiAgICBjb25zdCBtZXNzYWdlQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2UtYm94Jyk7XHJcbiAgICBjb25zdCBhbGxTaGlwcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgYWxsU2hpcHMuY2xhc3NMaXN0LmFkZCgnYWxsLXNoaXBzJyk7XHJcblxyXG4gICAgY29uc3Qgcm90YXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICByb3RhdGVCdXR0b24udGV4dENvbnRlbnQgPSAnUm90YXRlJztcclxuICAgIG1lc3NhZ2VCb3guYXBwZW5kQ2hpbGQocm90YXRlQnV0dG9uKTtcclxuICAgIG1lc3NhZ2VCb3guYXBwZW5kKGFsbFNoaXBzKTtcclxuXHJcbiAgICByb3RhdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGlzVmVydGljYWwgPSAhaXNWZXJ0aWNhbDtcclxuICAgICAgYWxsU2hpcHMudGV4dENvbnRlbnQgPSAnJztcclxuICAgICAgdGhpcy5jcmVhdGVTaGlwcyhpc1ZlcnRpY2FsKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYXBwZW5kQm9hcmRzKHBsYXllci5wbGF5ZXJCb2FyZCwgcGxheWVyLmNvbXB1dGVyQm9hcmQsICdzaGlwIHBsYWNpbmcnKTtcclxuICAgIHRoaXMuY3JlYXRlU2hpcHMoaXNWZXJ0aWNhbCk7XHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRvbTtcclxuIiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcclxuXHJcbmNsYXNzIEdhbWVib2FyZCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmJvYXJkID0gW107XHJcbiAgICB0aGlzLnByZXZpb3VzQXR0YWNrcyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xyXG4gICAgICBjb25zdCB0ZW1wID0gW107XHJcblxyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcclxuICAgICAgICB0ZW1wLnB1c2goJ2VtcHR5Jyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuYm9hcmQucHVzaCh0ZW1wKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBsYWNlU2hpcChuYW1lLCBjb29yZGluYXRlcykge1xyXG4gICAgY29uc3QgY3VycmVudFNoaXAgPSBuZXcgU2hpcChuYW1lLCBjb29yZGluYXRlcy5sZW5ndGgpO1xyXG5cclxuICAgIGNvb3JkaW5hdGVzLmZvckVhY2goKGNvb3JkUGFpcikgPT4ge1xyXG4gICAgICB0aGlzLmJvYXJkW2Nvb3JkUGFpclswXV1bY29vcmRQYWlyWzFdXSA9IGN1cnJlbnRTaGlwO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZWNlaXZlQXR0YWNrKGNvb3JkUGFpcikge1xyXG4gICAgdGhpcy5wcmV2aW91c0F0dGFja3MucHVzaChjb29yZFBhaXIpO1xyXG4gICAgY29uc3QgY2VsbCA9IHRoaXMuYm9hcmRbY29vcmRQYWlyWzBdXVtjb29yZFBhaXJbMV1dO1xyXG5cclxuICAgIGlmICh0eXBlb2YgY2VsbCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgY2VsbC5oaXQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYm9hcmRbY29vcmRQYWlyWzBdXVtjb29yZFBhaXJbMV1dID0gJ21pc3MnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWxsU3VuaygpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB0eXBlb2YgdGhpcy5ib2FyZFtpXVtqXSA9PT0gJ29iamVjdCcgJiZcclxuICAgICAgICAgICF0aGlzLmJvYXJkW2ldW2pdLmlzU3VuaygpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBpblByZXZpb3VzQXR0YWNrcyhjb29yZFBhaXIpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcmV2aW91c0F0dGFja3MubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMucHJldmlvdXNBdHRhY2tzW2ldWzBdID09PSBjb29yZFBhaXJbMF0gJiZcclxuICAgICAgICB0aGlzLnByZXZpb3VzQXR0YWNrc1tpXVsxXSA9PT0gY29vcmRQYWlyWzFdXHJcbiAgICAgICkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xyXG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkJztcclxuXHJcbmNsYXNzIFBsYXllciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnBsYXllckJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xyXG4gICAgdGhpcy5jb21wdXRlckJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xyXG4gIH1cclxuXHJcbiAgcGxheWVyTW92ZShjb29yZFBhaXIpIHtcclxuICAgIHRoaXMuY29tcHV0ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkUGFpcik7XHJcbiAgICBjb25zdCBjZWxsID0gdGhpcy5jb21wdXRlckJvYXJkW2Nvb3JkUGFpclswXV1bY29vcmRQYWlyWzFdXVxyXG4gICAgbGV0IG1lc3NhZ2UgPSAnWW91IG1pc3NlZCB0aGUgZW5lbXknO1xyXG5cclxuICAgIGlmICh0eXBlb2YgY2VsbCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgbWVzc2FnZSA9ICdZb3UgaGl0IHRoZSBlbmVteSEnXHJcblxyXG4gICAgICBpZiAoY2VsbC5pc1N1bmspIHtcclxuICAgICAgICBtZXNzYWdlID0gYCR7bWVzc2FnZX0gWW91IHN1bmsgdGhlIGVuZW15J3MgJHtjZWxsLm5hbWV9IWA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWVzc2FnZTtcclxuICB9XHJcblxyXG4gIGNvbXB1dGVyTW92ZSgpIHtcclxuICAgIGxldCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICBsZXQgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG5cclxuICAgIHdoaWxlICh0aGlzLnBsYXllckJvYXJkLmluUHJldmlvdXNBdHRhY2tzKFtyb3csIGNvbHVtbl0pKSB7XHJcbiAgICAgIHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucGxheWVyQm9hcmQucmVjZWl2ZUF0dGFjayhbcm93LCBjb2x1bW5dKTtcclxuICB9XHJcblxyXG4gIGNvbXB1dGVyUGxhY2VTaGlwcygpIHtcclxuICAgIGNvbnN0IHNoaXBzID0gW1xyXG4gICAgICB7IG5hbWU6ICdDYXJyaWVyJywgc2l6ZTogNSB9LFxyXG4gICAgICB7IG5hbWU6ICdCYXR0bGVzaGlwJywgc2l6ZTogNCB9LFxyXG4gICAgICB7IG5hbWU6ICdEZXN0cm95ZXInLCBzaXplOiAzIH0sXHJcbiAgICAgIHsgbmFtZTogJ1N1Ym1hcmluZScsIHNpemU6IDMgfSxcclxuICAgICAgeyBuYW1lOiAnUGF0cm9sIEJvYXQnLCBzaXplOiAyIH0sXHJcbiAgICBdO1xyXG5cclxuICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgbGV0IGtlZXBHb2luZyA9IHRydWU7XHJcblxyXG4gICAgICB3aGlsZSAoa2VlcEdvaW5nKSB7XHJcbiAgICAgICAgY29uc3QgaXNWZXJ0aWNhbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xyXG5cclxuICAgICAgICBpZiAoaXNWZXJ0aWNhbCA9PT0gMCkge1xyXG4gICAgICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgICAgY29uc3QgZmlyc3RDb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAgLSBzaGlwLnNpemUpKTtcclxuICAgICAgICAgIGxldCBhbGxFbXB0eSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gc2hpcC5zaXplOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudENlbGwgPSB0aGlzLmNvbXB1dGVyQm9hcmQuYm9hcmRbcm93XVtmaXJzdENvbHVtbiArIGldO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjdXJyZW50Q2VsbCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICBhbGxFbXB0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGFsbEVtcHR5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuc2l6ZTsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChbcm93LCBmaXJzdENvbHVtbiArIGldKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jb21wdXRlckJvYXJkLnBsYWNlU2hpcChzaGlwLm5hbWUsIGNvb3JkaW5hdGVzKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBrZWVwR29pbmcgPSAhYWxsRW1wdHk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IGZpcnN0Um93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwIC0gc2hpcC5zaXplKSk7XHJcbiAgICAgICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgICBsZXQgYWxsRW1wdHkgPSB0cnVlOztcclxuXHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBzaGlwLnNpemU7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Q2VsbCA9IHRoaXMuY29tcHV0ZXJCb2FyZC5ib2FyZFtmaXJzdFJvdyArIGldW2NvbHVtbl07XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGN1cnJlbnRDZWxsID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgIGFsbEVtcHR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoYWxsRW1wdHkpIHtcclxuICAgICAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5zaXplOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKFtmaXJzdFJvdyArIGksIGNvbHVtbl0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKHNoaXAubmFtZSwgY29vcmRpbmF0ZXMpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGtlZXBHb2luZyA9ICFhbGxFbXB0eTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xyXG4iLCJjbGFzcyBTaGlwIHtcclxuICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgpIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWVcclxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgdGhpcy50aW1lc0hpdCA9IDA7XHJcbiAgfVxyXG5cclxuICBoaXQoKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNTdW5rKCkpIHtcclxuICAgICAgdGhpcy50aW1lc0hpdCArPSAxO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNTdW5rKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGltZXNIaXQgPT09IHRoaXMubGVuZ3RoO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcclxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vZm9udHMvSVRDIE1hY2hpbmUgUmVndWxhci5vdGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuL2ltZy9hbHBoYS14LnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYEBmb250LWZhY2Uge1xyXG4gIGZvbnQtZmFtaWx5OiAnSVRDIE1hY2hpbmUgUmVndWxhcic7XHJcbiAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSk7XHJcbn1cclxuXHJcbjpyb290IHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBuYXZ5O1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcclxufVxyXG5cclxuYm9keSB7XHJcbiAgaGVpZ2h0OiAxMDB2aDtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtcm93czogbWF4LWNvbnRlbnQgbWF4LWNvbnRlbnQgMjAwcHg7XHJcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogMzBweDtcclxufVxyXG5cclxuaDEge1xyXG4gIGZvbnQtZmFtaWx5OiAnSVRDIE1hY2hpbmUgUmVndWxhcicsIEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XHJcbiAgZm9udC1zaXplOiA0cmVtO1xyXG59XHJcblxyXG4uZW50ZXItbmFtZSB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgzLCBtYXgtY29udGVudCk7XHJcbiAgZ2FwOiAxMHB4O1xyXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuYnV0dG9uIHtcclxuICB3aWR0aDogbWF4LWNvbnRlbnQ7XHJcbiAgcGFkZGluZzogNXB4IDEwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLm1lc3NhZ2UtYm94IHtcclxuICBmb250LXNpemU6IDEuNXJlbTtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IG1heC1jb250ZW50O1xyXG59XHJcblxyXG4uYWxsLXNoaXBzIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWF4LWNvbnRlbnQgbWF4LWNvbnRlbnQ7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgY29sdW1uLWdhcDogMzBweDtcclxuICBtYXJnaW46IDIwcHggMDtcclxufVxyXG5cclxuLnNoaXAtZGl2IHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIG1hcmdpbjogMTBweCAwO1xyXG4gIGdyaWQtYXV0by1mbG93OiBjb2x1bW47XHJcbiAgZ3JpZC1hdXRvLWNvbHVtbnM6IDMwcHg7XHJcbiAgZ2FwOiAxcHg7XHJcbiAgaGVpZ2h0OiAzMHB4O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBqdXN0aWZ5LXNlbGY6IHN0YXJ0O1xyXG59XHJcblxyXG4udmVydGljYWwge1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDUsIG1heC1jb250ZW50KTtcclxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IG1heC1jb250ZW50O1xyXG59XHJcblxyXG4uYWxsLXNoaXBzIHAge1xyXG4gIG1hcmdpbjogMDtcclxufVxyXG5cclxuLmdhbWUtY29udGVudCB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtYXgtY29udGVudCBtYXgtY29udGVudDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcclxuICBmb250LWZhbWlseTogJ0lUQyBNYWNoaW5lIFJlZ3VsYXInLCBzYW5zLXNlcmlmO1xyXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gIGxldHRlci1zcGFjaW5nOiAycHg7XHJcbn1cclxuXHJcbi5ib2FyZCB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDMwcHgpO1xyXG4gIGdhcDogMXB4O1xyXG59XHJcblxyXG4uY2VsbCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbi5zaGlwIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xyXG59XHJcblxyXG4uYXR0YWNrZWQge1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX199KTtcclxufVxyXG5cclxuLmhpdCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNjE2MTtcclxufVxyXG5cclxuLmNsaWNrYWJsZSB7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGtDQUFrQztFQUNsQyw0Q0FBNkM7QUFDL0M7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLGFBQWE7RUFDYixhQUFhO0VBQ2IsaURBQWlEO0VBQ2pELHFCQUFxQjtFQUNyQixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxnRUFBZ0U7RUFDaEUsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7RUFDYiwwQ0FBMEM7RUFDMUMsU0FBUztFQUNULHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsYUFBYTtFQUNiLHFCQUFxQjtFQUNyQiwyQ0FBMkM7QUFDN0M7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOENBQThDO0VBQzlDLG1CQUFtQjtFQUNuQixxQkFBcUI7RUFDckIsZ0JBQWdCO0VBQ2hCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsY0FBYztFQUNkLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsUUFBUTtFQUNSLFlBQVk7RUFDWixlQUFlO0VBQ2YsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsNkNBQTZDO0VBQzdDLDJDQUEyQztBQUM3Qzs7QUFFQTtFQUNFLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLDhDQUE4QztFQUM5Qyw2QkFBNkI7RUFDN0IsOENBQThDO0VBQzlDLGlCQUFpQjtFQUNqQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUNBQXVDO0VBQ3ZDLG9DQUFvQztFQUNwQyxRQUFRO0FBQ1Y7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSx5REFBd0M7QUFDMUM7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcclxcbiAgZm9udC1mYW1pbHk6ICdJVEMgTWFjaGluZSBSZWd1bGFyJztcXHJcXG4gIHNyYzogdXJsKCcuL2ZvbnRzL0lUQ1xcXFwgTWFjaGluZVxcXFwgUmVndWxhci5vdGYnKTtcXHJcXG59XFxyXFxuXFxyXFxuOnJvb3Qge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogbmF2eTtcXHJcXG4gIGNvbG9yOiB3aGl0ZTtcXHJcXG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGhlaWdodDogMTAwdmg7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtYXgtY29udGVudCBtYXgtY29udGVudCAyMDBweDtcXHJcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXHJcXG4gIGdhcDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuaDEge1xcclxcbiAgZm9udC1mYW1pbHk6ICdJVEMgTWFjaGluZSBSZWd1bGFyJywgQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXHJcXG4gIGZvbnQtc2l6ZTogNHJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmVudGVyLW5hbWUge1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDMsIG1heC1jb250ZW50KTtcXHJcXG4gIGdhcDogMTBweDtcXHJcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuYnV0dG9uIHtcXHJcXG4gIHdpZHRoOiBtYXgtY29udGVudDtcXHJcXG4gIHBhZGRpbmc6IDVweCAxMHB4O1xcclxcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4ubWVzc2FnZS1ib3gge1xcclxcbiAgZm9udC1zaXplOiAxLjVyZW07XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtYXgtY29udGVudCBtYXgtY29udGVudDtcXHJcXG59XFxyXFxuXFxyXFxuLmFsbC1zaGlwcyB7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtYXgtY29udGVudCBtYXgtY29udGVudDtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBjb2x1bW4tZ2FwOiAzMHB4O1xcclxcbiAgbWFyZ2luOiAyMHB4IDA7XFxyXFxufVxcclxcblxcclxcbi5zaGlwLWRpdiB7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgbWFyZ2luOiAxMHB4IDA7XFxyXFxuICBncmlkLWF1dG8tZmxvdzogY29sdW1uO1xcclxcbiAgZ3JpZC1hdXRvLWNvbHVtbnM6IDMwcHg7XFxyXFxuICBnYXA6IDFweDtcXHJcXG4gIGhlaWdodDogMzBweDtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIGp1c3RpZnktc2VsZjogc3RhcnQ7XFxyXFxufVxcclxcblxcclxcbi52ZXJ0aWNhbCB7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCBtYXgtY29udGVudCk7XFxyXFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IG1heC1jb250ZW50O1xcclxcbn1cXHJcXG5cXHJcXG4uYWxsLXNoaXBzIHAge1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1jb250ZW50IHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWF4LWNvbnRlbnQgbWF4LWNvbnRlbnQ7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnSVRDIE1hY2hpbmUgUmVndWxhcicsIHNhbnMtc2VyaWY7XFxyXFxuICBmb250LXNpemU6IDEuNXJlbTtcXHJcXG4gIGxldHRlci1zcGFjaW5nOiAycHg7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZCB7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDMwcHgpO1xcclxcbiAgZ2FwOiAxcHg7XFxyXFxufVxcclxcblxcclxcbi5jZWxsIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcCB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xcclxcbn1cXHJcXG5cXHJcXG4uYXR0YWNrZWQge1xcclxcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaW1nL2FscGhhLXguc3ZnKTtcXHJcXG59XFxyXFxuXFxyXFxuLmhpdCB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY2MTYxO1xcclxcbn1cXHJcXG5cXHJcXG4uY2xpY2thYmxlIHtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi4vc3R5bGUuY3NzJztcclxuaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcic7XHJcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xyXG5cclxubGV0IHBsYXllcjtcclxuXHJcbmZ1bmN0aW9uIHBsYXlSb3VuZChlKSB7XHJcbiAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgaWYgKFxyXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxsJykgJiZcclxuICAgICFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2F0dGFja2VkJylcclxuICApIHtcclxuICAgIGNvbnN0IHsgY2VsbCB9ID0gZS50YXJnZXQuZGF0YXNldDtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBwbGF5ZXIucGxheWVyTW92ZShbTWF0aC5mbG9vcihjZWxsIC8gMTApLCBjZWxsICUgMTBdKTtcclxuICAgIGRvbS5uZXdNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgcGxheWVyLmNvbXB1dGVyTW92ZSgpO1xyXG4gICAgZG9tLmFwcGVuZEJvYXJkcyhwbGF5ZXIucGxheWVyQm9hcmQsIHBsYXllci5jb21wdXRlckJvYXJkLCAnbm9ybWFsIHBsYXknKTtcclxuICB9XHJcbiAgaWYgKHBsYXllci5wbGF5ZXJCb2FyZC5hbGxTdW5rKCkgfHwgcGxheWVyLmNvbXB1dGVyQm9hcmQuYWxsU3VuaygpKSB7XHJcbiAgICBlbmRHYW1lKCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBlbmRHYW1lKCkge1xyXG4gIGlmIChwbGF5ZXIuY29tcHV0ZXJCb2FyZC5hbGxTdW5rKCkpIHtcclxuICAgIGRvbS5uZXdNZXNzYWdlKCdFbmVteSBmbGVldCBzdW5rISBZb3Ugd2luIScpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBkb20ubmV3TWVzc2FnZSgnWW91ciBmbGVldCB3YXMgc3VuayEgR2FtZSBvdmVyIScpO1xyXG4gIH1cclxuXHJcbiAgZG9tLmFwcGVuZEJvYXJkcyhwbGF5ZXIucGxheWVyQm9hcmQsIHBsYXllci5jb21wdXRlckJvYXJkLCAnZ2FtZSBvdmVyJyk7XHJcbiAgZG9tLmVuZEdhbWUoKTtcclxuICBjb25zdCBuZXdHYW1lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy1nYW1lJyk7XHJcbiAgY29uc3QgZW5lbXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5lbXknKTtcclxuICBuZXdHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZG9tLm9wZW5Gb3JtKTtcclxuICBlbmVteS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYXlSb3VuZCk7XHJcbn1cclxuXHJcbi8vIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XHJcbmNvbnN0IGUgPSB7IHByZXZlbnREZWZhdWx0KCkge30sIHRhcmdldDogeyByZXNldCgpIHt9IH0gfTtcclxuLy8gZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xyXG5wbGF5ZXIgPSBuZXcgUGxheWVyKCk7XHJcbmRvbS5zdGFydEdhbWUoZSk7XHJcbmRvbS5wbGF5ZXJQbGFjZVNoaXBzKHBsYXllcik7XHJcbnBsYXllci5jb21wdXRlclBsYWNlU2hpcHMoKTtcclxuLy8gY29uc3QgZW5lbXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5lbXknKTtcclxuLy8gZW5lbXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGF5Um91bmQpO1xyXG4vLyB9KTtcclxuIl0sIm5hbWVzIjpbImRvbSIsInN0YXJ0R2FtZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIm5hbWVJbnB1dCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIm5hbWUiLCJ2YWx1ZSIsInRhcmdldCIsInJlc2V0IiwiZm9ybSIsInN0eWxlIiwiZGlzcGxheSIsIm1lc3NhZ2VCb3giLCJjcmVhdGVFbGVtZW50IiwibWVzc2FnZVAiLCJnYW1lQ29udGVudCIsInBsYXllckNvbnRlbnQiLCJlbmVteUNvbnRlbnQiLCJwbGF5ZXJDYXB0aW9uIiwiZW5lbXlDYXB0aW9uIiwicGxheWVyQm9hcmRDb250YWluZXIiLCJlbmVteUJvYXJkQ29udGFpbmVyIiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0QXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJhcHBlbmRDaGlsZCIsImJvZHkiLCJpbnNlcnRCZWZvcmUiLCJlbmRHYW1lIiwibmV3R2FtZUJ1dHRvbiIsIm9wZW5Gb3JtIiwicmVtb3ZlIiwiYnVpbGRCb2FyZCIsImdhbWVib2FyZCIsInR5cGUiLCJjb25kaXRpb24iLCJib2FyZCIsImkiLCJjZWxsIiwiZGF0YXNldCIsIk1hdGgiLCJmbG9vciIsImoiLCJwcmV2aW91c0F0dGFja3MiLCJsZW5ndGgiLCJjb250YWlucyIsImFwcGVuZEJvYXJkcyIsInBsYXllckJvYXJkIiwiY29tcHV0ZXJCb2FyZCIsInBsYXllckJvYXJkTm9kZSIsImNvbXB1dGVyQm9hcmROb2RlIiwiYm9hcmRDb250YWluZXJzIiwicXVlcnlTZWxlY3RvckFsbCIsIm5ld01lc3NhZ2UiLCJtZXNzYWdlIiwiY3JlYXRlU2hpcHMiLCJpc1ZlcnRpY2FsIiwiYWxsU2hpcHMiLCJzaGlwcyIsInNpemUiLCJmb3JFYWNoIiwic2hpcCIsInNoaXBOYW1lIiwiYXBwZW5kIiwic2hpcERpdiIsImlkTmFtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwiaWQiLCJwbGF5ZXJQbGFjZVNoaXBzIiwicGxheWVyIiwicm90YXRlQnV0dG9uIiwiU2hpcCIsIkdhbWVib2FyZCIsImNvbnN0cnVjdG9yIiwidGVtcCIsInB1c2giLCJwbGFjZVNoaXAiLCJjb29yZGluYXRlcyIsImN1cnJlbnRTaGlwIiwiY29vcmRQYWlyIiwicmVjZWl2ZUF0dGFjayIsImhpdCIsImFsbFN1bmsiLCJpc1N1bmsiLCJpblByZXZpb3VzQXR0YWNrcyIsIlBsYXllciIsInBsYXllck1vdmUiLCJjb21wdXRlck1vdmUiLCJyb3ciLCJyYW5kb20iLCJjb2x1bW4iLCJjb21wdXRlclBsYWNlU2hpcHMiLCJrZWVwR29pbmciLCJmaXJzdENvbHVtbiIsImFsbEVtcHR5IiwiY3VycmVudENlbGwiLCJmaXJzdFJvdyIsInRpbWVzSGl0IiwicGxheVJvdW5kIiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwiZW5lbXkiLCJyZW1vdmVFdmVudExpc3RlbmVyIl0sInNvdXJjZVJvb3QiOiIifQ==