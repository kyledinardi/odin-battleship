/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/computerPlaceShips.js":
/*!**************************************!*\
  !*** ./src/js/computerPlaceShips.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function computerPlaceShips(computerBoard) {
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
          const currentCell = computerBoard.board[row][firstColumn + i];
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
          computerBoard.placeShip(ship.name, coordinates);
        }
        keepGoing = !allEmpty;
      } else {
        const firstRow = Math.floor(Math.random() * (10 - ship.size));
        const column = Math.floor(Math.random() * 10);
        let allEmpty = true;
        for (let i = 0; i <= ship.size; i += 1) {
          const currentCell = computerBoard.board[firstRow + i][column];
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
          computerBoard.placeShip(ship.name, coordinates);
        }
        keepGoing = !allEmpty;
      }
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (computerPlaceShips);

/***/ }),

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
      if (type === 'computer' && condition === 'normal play' && !cell.classList.contains('attacked')) {
        cell.classList.add('clickable');
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
    const cell = this.computerBoard.board[coordPair[0]][coordPair[1]];
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
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/js/playerPlaceShips.js":
/*!************************************!*\
  !*** ./src/js/playerPlaceShips.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/js/dom.js");

const playerPlaceShips = {
  isVertical: false,
  ships: [{
    name: 'Carrier',
    size: 5,
    inFleet: false
  }, {
    name: 'Battleship',
    size: 4,
    inFleet: false
  }, {
    name: 'Destroyer',
    size: 3,
    inFleet: false
  }, {
    name: 'Submarine',
    size: 3,
    inFleet: false
  }, {
    name: 'Patrol Boat',
    size: 2,
    inFleet: false
  }],
  dropHandler(e, player) {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');
    const shipDiv = document.querySelector(`#${data}`);
    const size = shipDiv.childElementCount;
    const list = e.target.classList;
    const {
      cell
    } = e.target.dataset;
    if (!this.isVertical && cell % 10 + size > 10 || this.isVertical && Math.floor(cell / 10) + size > 10 || !list.contains('cell') || list.contains('ship')) {
      list.remove('temp-ship');
      return;
    }
    const coordinates = [];
    for (let i = 0; i < size; i += 1) {
      if (!this.isVertical) {
        coordinates.push([Math.floor(cell / 10), cell % 10 + i]);
      } else {
        coordinates.push([Math.floor(cell / 10) + i, cell % 10]);
      }
    }
    player.playerBoard.placeShip(data, coordinates);
    shipDiv.textContent = '';
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].appendBoards(player.playerBoard, player.computerBoard, 'ship placing');
    const shipName = data === 'Patrol-Boat' ? 'Patrol Boat' : data;
    const currentShip = this.ships.find(ship => ship.name === shipName);
    currentShip.inFleet = true;
  },
  createShips() {
    const allShips = document.querySelector('.all-ships');
    if (this.isVertical) {
      allShips.classList.add('vertical');
    } else {
      allShips.classList.remove('vertical');
    }
    if (this.isVertical) {
      this.ships.forEach(ship => {
        const shipName = document.createElement('p');
        shipName.textContent = ship.name;
        allShips.append(shipName);
      });
    }
    this.ships.forEach(ship => {
      const shipDiv = document.createElement('div');
      shipDiv.classList.add('ship-div');
      const idName = ship.name === 'Patrol Boat' ? 'Patrol-Boat' : ship.name;
      shipDiv.setAttribute('id', idName);
      shipDiv.setAttribute('draggable', 'true');
      if (!ship.inFleet) {
        for (let i = 0; i < ship.size; i += 1) {
          const cell = document.createElement('div');
          cell.classList.add('ship');
          cell.dataset.cell = i;
          shipDiv.appendChild(cell);
        }
      }
      if (!this.isVertical) {
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
  place(player) {
    const messageBox = document.querySelector('.message-box');
    const playerBoardContainer = document.querySelector('#player');
    const rotateButton = document.createElement('button');
    const allShips = document.createElement('div');
    allShips.classList.add('all-ships');
    rotateButton.textContent = 'Rotate';
    messageBox.appendChild(rotateButton);
    messageBox.append(allShips);
    rotateButton.addEventListener('click', () => {
      this.isVertical = !this.isVertical;
      allShips.textContent = '';
      this.createShips();
    });
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].appendBoards(player.playerBoard, player.computerBoard, 'ship placing');
    this.createShips();
    playerBoardContainer.addEventListener('dragover', e => {
      e.preventDefault();
      e.target.classList.add('temp-ship');
    });
    playerBoardContainer.addEventListener('dragleave', e => {
      e.preventDefault();
      e.target.classList.remove('temp-ship');
    });
    playerBoardContainer.addEventListener('drop', e => {
      this.dropHandler(e, player);
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (playerPlaceShips);

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
  grid-template-columns: max-content 200px;
  grid-template-rows: repeat(5, 50px);
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
  cursor: pointer;
  justify-self: start;
}

.vertical {
  grid-template-columns: repeat(5, max-content);
}

.vertical .ship-div {
  grid-auto-flow: row;
  justify-self: center;
  align-self: flex-start;
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

.ship, .temp-ship {
  background-color: gray;
  height: 30px;
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
`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,kCAAkC;EAClC,4CAA6C;AAC/C;;AAEA;EACE,sBAAsB;EACtB,YAAY;EACZ,yCAAyC;AAC3C;;AAEA;EACE,aAAa;EACb,aAAa;EACb,iDAAiD;EACjD,qBAAqB;EACrB,SAAS;AACX;;AAEA;EACE,gEAAgE;EAChE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,0CAA0C;EAC1C,SAAS;EACT,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,iBAAiB;EACjB,aAAa;EACb,qBAAqB;EACrB,2CAA2C;AAC7C;;AAEA;EACE,aAAa;EACb,wCAAwC;EACxC,mCAAmC;EACnC,mBAAmB;EACnB,qBAAqB;EACrB,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,cAAc;EACd,sBAAsB;EACtB,uBAAuB;EACvB,QAAQ;EACR,eAAe;EACf,mBAAmB;AACrB;;AAEA;EACE,6CAA6C;AAC/C;;AAEA;EACE,mBAAmB;EACnB,oBAAoB;EACpB,sBAAsB;AACxB;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,aAAa;EACb,8CAA8C;EAC9C,6BAA6B;EAC7B,8CAA8C;EAC9C,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,uCAAuC;EACvC,oCAAoC;EACpC,QAAQ;AACV;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,sBAAsB;EACtB,YAAY;AACd;;AAEA;EACE,yDAAwC;AAC1C;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,eAAe;AACjB","sourcesContent":["@font-face {\r\n  font-family: 'ITC Machine Regular';\r\n  src: url('./fonts/ITC\\ Machine\\ Regular.otf');\r\n}\r\n\r\n:root {\r\n  background-color: navy;\r\n  color: white;\r\n  font-family: Arial, Helvetica, sans-serif;\r\n}\r\n\r\nbody {\r\n  height: 100vh;\r\n  display: grid;\r\n  grid-template-rows: max-content max-content 200px;\r\n  justify-items: center;\r\n  gap: 30px;\r\n}\r\n\r\nh1 {\r\n  font-family: 'ITC Machine Regular', Arial, Helvetica, sans-serif;\r\n  font-size: 4rem;\r\n}\r\n\r\n.enter-name {\r\n  display: grid;\r\n  grid-template-rows: repeat(3, max-content);\r\n  gap: 10px;\r\n  justify-items: center;\r\n}\r\n\r\nbutton {\r\n  width: max-content;\r\n  padding: 5px 10px;\r\n  border-radius: 5px;\r\n  cursor: pointer;\r\n}\r\n\r\n.message-box {\r\n  font-size: 1.5rem;\r\n  display: grid;\r\n  justify-items: center;\r\n  grid-template-rows: max-content max-content;\r\n}\r\n\r\n.all-ships {\r\n  display: grid;\r\n  grid-template-columns: max-content 200px;\r\n  grid-template-rows: repeat(5, 50px);\r\n  align-items: center;\r\n  justify-items: center;\r\n  column-gap: 30px;\r\n  margin: 20px 0;\r\n}\r\n\r\n.ship-div {\r\n  display: grid;\r\n  margin: 10px 0;\r\n  grid-auto-flow: column;\r\n  grid-auto-columns: 30px;\r\n  gap: 1px;\r\n  cursor: pointer;\r\n  justify-self: start;\r\n}\r\n\r\n.vertical {\r\n  grid-template-columns: repeat(5, max-content);\r\n}\r\n\r\n.vertical .ship-div {\r\n  grid-auto-flow: row;\r\n  justify-self: center;\r\n  align-self: flex-start;\r\n}\r\n\r\n.all-ships p {\r\n  margin: 0;\r\n}\r\n\r\n.game-content {\r\n  width: 100%;\r\n  text-align: center;\r\n  display: grid;\r\n  grid-template-columns: max-content max-content;\r\n  justify-content: space-evenly;\r\n  font-family: 'ITC Machine Regular', sans-serif;\r\n  font-size: 1.5rem;\r\n  letter-spacing: 2px;\r\n}\r\n\r\n.board {\r\n  display: grid;\r\n  grid-template-columns: repeat(10, 30px);\r\n  grid-template-rows: repeat(10, 30px);\r\n  gap: 1px;\r\n}\r\n\r\n.cell {\r\n  background-color: white;\r\n}\r\n\r\n.ship, .temp-ship {\r\n  background-color: gray;\r\n  height: 30px;\r\n}\r\n\r\n.attacked {\r\n  background-image: url(./img/alpha-x.svg);\r\n}\r\n\r\n.hit {\r\n  background-color: #ff6161;\r\n}\r\n\r\n.clickable {\r\n  cursor: pointer;\r\n}\r\n"],"sourceRoot":""}]);
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
/* harmony import */ var _playerPlaceShips__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./playerPlaceShips */ "./src/js/playerPlaceShips.js");
/* harmony import */ var _computerPlaceShips__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./computerPlaceShips */ "./src/js/computerPlaceShips.js");





let player;
let isGameOver = false;
function endGame() {
  if (isGameOver) {
    return;
  }
  if (player.computerBoard.allSunk()) {
    _dom__WEBPACK_IMPORTED_MODULE_2__["default"].newMessage('Enemy fleet sunk! You win!');
  } else {
    _dom__WEBPACK_IMPORTED_MODULE_2__["default"].newMessage('Your fleet was sunk! Game over!');
  }
  _dom__WEBPACK_IMPORTED_MODULE_2__["default"].appendBoards(player.playerBoard, player.computerBoard, 'game over');
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
    const message = player.playerMove([Math.floor(cell / 10), cell % 10]);
    _dom__WEBPACK_IMPORTED_MODULE_2__["default"].newMessage(message);
    player.computerMove();
    _dom__WEBPACK_IMPORTED_MODULE_2__["default"].appendBoards(player.playerBoard, player.computerBoard, 'normal play');
  }
  if (player.playerBoard.allSunk() || player.computerBoard.allSunk()) {
    endGame();
    isGameOver = true;
  }
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
_playerPlaceShips__WEBPACK_IMPORTED_MODULE_3__["default"].place(player);
(0,_computerPlaceShips__WEBPACK_IMPORTED_MODULE_4__["default"])(player.computerBoard);
_dom__WEBPACK_IMPORTED_MODULE_2__["default"].appendBoards(player.playerBoard, player.computerBoard, 'normal play');
const enemy = document.querySelector('#enemy');
enemy.addEventListener('click', playRound);
// });
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLGtCQUFrQkEsQ0FBQ0MsYUFBYSxFQUFFO0VBQ3pDLE1BQU1DLEtBQUssR0FBRyxDQUNaO0lBQUVDLElBQUksRUFBRSxTQUFTO0lBQUVDLElBQUksRUFBRTtFQUFFLENBQUMsRUFDNUI7SUFBRUQsSUFBSSxFQUFFLFlBQVk7SUFBRUMsSUFBSSxFQUFFO0VBQUUsQ0FBQyxFQUMvQjtJQUFFRCxJQUFJLEVBQUUsV0FBVztJQUFFQyxJQUFJLEVBQUU7RUFBRSxDQUFDLEVBQzlCO0lBQUVELElBQUksRUFBRSxXQUFXO0lBQUVDLElBQUksRUFBRTtFQUFFLENBQUMsRUFDOUI7SUFBRUQsSUFBSSxFQUFFLGFBQWE7SUFBRUMsSUFBSSxFQUFFO0VBQUUsQ0FBQyxDQUNqQztFQUVERixLQUFLLENBQUNHLE9BQU8sQ0FBRUMsSUFBSSxJQUFLO0lBQ3RCLElBQUlDLFNBQVMsR0FBRyxJQUFJO0lBRXBCLE9BQU9BLFNBQVMsRUFBRTtNQUNoQixNQUFNQyxVQUFVLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO01BRWhELElBQUlILFVBQVUsS0FBSyxDQUFDLEVBQUU7UUFDcEIsTUFBTUksR0FBRyxHQUFHSCxJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFDRSxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMxQyxNQUFNRSxXQUFXLEdBQUdKLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHTCxJQUFJLENBQUNGLElBQUksQ0FBQyxDQUFDO1FBQ2hFLElBQUlVLFFBQVEsR0FBRyxJQUFJO1FBRW5CLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxJQUFJVCxJQUFJLENBQUNGLElBQUksRUFBRVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtVQUN0QyxNQUFNQyxXQUFXLEdBQUdmLGFBQWEsQ0FBQ2dCLEtBQUssQ0FBQ0wsR0FBRyxDQUFDLENBQUNDLFdBQVcsR0FBR0UsQ0FBQyxDQUFDO1VBRTdELElBQUksT0FBT0MsV0FBVyxLQUFLLFFBQVEsRUFBRTtZQUNuQ0YsUUFBUSxHQUFHLEtBQUs7WUFDaEI7VUFDRjtRQUNGO1FBRUEsSUFBSUEsUUFBUSxFQUFFO1VBQ1osTUFBTUksV0FBVyxHQUFHLEVBQUU7VUFFdEIsS0FBSyxJQUFJSCxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdULElBQUksQ0FBQ0YsSUFBSSxFQUFFVyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3JDRyxXQUFXLENBQUNDLElBQUksQ0FBQyxDQUFDUCxHQUFHLEVBQUVDLFdBQVcsR0FBR0UsQ0FBQyxDQUFDLENBQUM7VUFDMUM7VUFFQWQsYUFBYSxDQUFDbUIsU0FBUyxDQUFDZCxJQUFJLENBQUNILElBQUksRUFBRWUsV0FBVyxDQUFDO1FBQ2pEO1FBRUFYLFNBQVMsR0FBRyxDQUFDTyxRQUFRO01BQ3ZCLENBQUMsTUFBTTtRQUNMLE1BQU1PLFFBQVEsR0FBR1osSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUdMLElBQUksQ0FBQ0YsSUFBSSxDQUFDLENBQUM7UUFDN0QsTUFBTWtCLE1BQU0sR0FBR2IsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDN0MsSUFBSUcsUUFBUSxHQUFHLElBQUk7UUFFbkIsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLElBQUlULElBQUksQ0FBQ0YsSUFBSSxFQUFFVyxDQUFDLElBQUksQ0FBQyxFQUFFO1VBQ3RDLE1BQU1DLFdBQVcsR0FBR2YsYUFBYSxDQUFDZ0IsS0FBSyxDQUFDSSxRQUFRLEdBQUdOLENBQUMsQ0FBQyxDQUFDTyxNQUFNLENBQUM7VUFFN0QsSUFBSSxPQUFPTixXQUFXLEtBQUssUUFBUSxFQUFFO1lBQ25DRixRQUFRLEdBQUcsS0FBSztZQUNoQjtVQUNGO1FBQ0Y7UUFFQSxJQUFJQSxRQUFRLEVBQUU7VUFDWixNQUFNSSxXQUFXLEdBQUcsRUFBRTtVQUV0QixLQUFLLElBQUlILENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR1QsSUFBSSxDQUFDRixJQUFJLEVBQUVXLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDckNHLFdBQVcsQ0FBQ0MsSUFBSSxDQUFDLENBQUNFLFFBQVEsR0FBR04sQ0FBQyxFQUFFTyxNQUFNLENBQUMsQ0FBQztVQUMxQztVQUVBckIsYUFBYSxDQUFDbUIsU0FBUyxDQUFDZCxJQUFJLENBQUNILElBQUksRUFBRWUsV0FBVyxDQUFDO1FBQ2pEO1FBRUFYLFNBQVMsR0FBRyxDQUFDTyxRQUFRO01BQ3ZCO0lBQ0Y7RUFDRixDQUFDLENBQUM7QUFDSjtBQUVBLGlFQUFlZCxrQkFBa0I7Ozs7Ozs7Ozs7Ozs7O0FDdEVqQyxNQUFNdUIsR0FBRyxHQUFHO0VBQ1ZDLFNBQVNBLENBQUNDLENBQUMsRUFBRTtJQUNYQSxDQUFDLENBQUNDLGNBQWMsQ0FBQyxDQUFDO0lBQ2xCLE1BQU1DLFNBQVMsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsT0FBTyxDQUFDO0lBQ2pELE1BQU0xQixJQUFJLEdBQUd3QixTQUFTLENBQUNHLEtBQUs7SUFDNUJMLENBQUMsQ0FBQ00sTUFBTSxDQUFDQyxLQUFLLENBQUMsQ0FBQztJQUVoQixNQUFNQyxJQUFJLEdBQUdMLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLE1BQU0sQ0FBQztJQUMzQ0ksSUFBSSxDQUFDQyxLQUFLLENBQUNDLE9BQU8sR0FBRyxNQUFNO0lBRTNCLE1BQU1DLFVBQVUsR0FBR1IsUUFBUSxDQUFDUyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ2hELE1BQU1DLFFBQVEsR0FBR1YsUUFBUSxDQUFDUyxhQUFhLENBQUMsR0FBRyxDQUFDO0lBQzVDLE1BQU1FLFdBQVcsR0FBR1gsUUFBUSxDQUFDUyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ2pELE1BQU1HLGFBQWEsR0FBR1osUUFBUSxDQUFDUyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ25ELE1BQU1JLFlBQVksR0FBR2IsUUFBUSxDQUFDUyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ2xELE1BQU1LLGFBQWEsR0FBR2QsUUFBUSxDQUFDUyxhQUFhLENBQUMsSUFBSSxDQUFDO0lBQ2xELE1BQU1NLFlBQVksR0FBR2YsUUFBUSxDQUFDUyxhQUFhLENBQUMsSUFBSSxDQUFDO0lBQ2pELE1BQU1PLG9CQUFvQixHQUFHaEIsUUFBUSxDQUFDUyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQzFELE1BQU1RLG1CQUFtQixHQUFHakIsUUFBUSxDQUFDUyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBRXpERCxVQUFVLENBQUNVLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGFBQWEsQ0FBQztJQUN2Q1IsV0FBVyxDQUFDTyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxjQUFjLENBQUM7SUFDekNQLGFBQWEsQ0FBQ00sU0FBUyxDQUFDQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7SUFDN0NOLFlBQVksQ0FBQ0ssU0FBUyxDQUFDQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7SUFDNUNMLGFBQWEsQ0FBQ0ksU0FBUyxDQUFDQyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBQ3RDSixZQUFZLENBQUNHLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUNyQ0gsb0JBQW9CLENBQUNJLFlBQVksQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUM7SUFDN0RKLG9CQUFvQixDQUFDSSxZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQztJQUNqREgsbUJBQW1CLENBQUNHLFlBQVksQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUM7SUFDNURILG1CQUFtQixDQUFDRyxZQUFZLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQztJQUUvQ04sYUFBYSxDQUFDTyxXQUFXLEdBQUc5QyxJQUFJLEdBQUksR0FBRUEsSUFBSyxVQUFTLEdBQUcsZ0JBQWdCO0lBQ3ZFd0MsWUFBWSxDQUFDTSxXQUFXLEdBQUksYUFBWTtJQUV4Q2IsVUFBVSxDQUFDYyxXQUFXLENBQUNaLFFBQVEsQ0FBQztJQUNoQ0UsYUFBYSxDQUFDVSxXQUFXLENBQUNSLGFBQWEsQ0FBQztJQUN4Q0YsYUFBYSxDQUFDVSxXQUFXLENBQUNOLG9CQUFvQixDQUFDO0lBQy9DSCxZQUFZLENBQUNTLFdBQVcsQ0FBQ1AsWUFBWSxDQUFDO0lBQ3RDRixZQUFZLENBQUNTLFdBQVcsQ0FBQ0wsbUJBQW1CLENBQUM7SUFDN0NOLFdBQVcsQ0FBQ1csV0FBVyxDQUFDVixhQUFhLENBQUM7SUFDdENELFdBQVcsQ0FBQ1csV0FBVyxDQUFDVCxZQUFZLENBQUM7SUFDckNiLFFBQVEsQ0FBQ3VCLElBQUksQ0FBQ0MsWUFBWSxDQUFDaEIsVUFBVSxFQUFFSCxJQUFJLENBQUM7SUFDNUNMLFFBQVEsQ0FBQ3VCLElBQUksQ0FBQ0MsWUFBWSxDQUFDYixXQUFXLEVBQUVILFVBQVUsQ0FBQztFQUNyRCxDQUFDO0VBRURpQixPQUFPQSxDQUFBLEVBQUc7SUFDUixNQUFNakIsVUFBVSxHQUFHUixRQUFRLENBQUNDLGFBQWEsQ0FBQyxjQUFjLENBQUM7SUFDekQsTUFBTXlCLGFBQWEsR0FBRzFCLFFBQVEsQ0FBQ1MsYUFBYSxDQUFDLFFBQVEsQ0FBQztJQUN0RGlCLGFBQWEsQ0FBQ1IsU0FBUyxDQUFDQyxHQUFHLENBQUMsVUFBVSxDQUFDO0lBQ3ZDTyxhQUFhLENBQUNMLFdBQVcsR0FBRyxVQUFVO0lBQ3RDYixVQUFVLENBQUNjLFdBQVcsQ0FBQ0ksYUFBYSxDQUFDO0VBQ3ZDLENBQUM7RUFFREMsUUFBUUEsQ0FBQSxFQUFHO0lBQ1QsTUFBTW5CLFVBQVUsR0FBR1IsUUFBUSxDQUFDQyxhQUFhLENBQUMsY0FBYyxDQUFDO0lBQ3pELE1BQU1VLFdBQVcsR0FBR1gsUUFBUSxDQUFDQyxhQUFhLENBQUMsZUFBZSxDQUFDO0lBQzNELE1BQU1JLElBQUksR0FBR0wsUUFBUSxDQUFDQyxhQUFhLENBQUMsTUFBTSxDQUFDO0lBQzNDTyxVQUFVLENBQUNvQixNQUFNLENBQUMsQ0FBQztJQUNuQmpCLFdBQVcsQ0FBQ2lCLE1BQU0sQ0FBQyxDQUFDO0lBQ3BCdkIsSUFBSSxDQUFDQyxLQUFLLENBQUNDLE9BQU8sR0FBRyxPQUFPO0VBQzlCLENBQUM7RUFFRHNCLFVBQVVBLENBQUNDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxTQUFTLEVBQUU7SUFDckMsTUFBTTNDLEtBQUssR0FBR1csUUFBUSxDQUFDUyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQzNDcEIsS0FBSyxDQUFDNkIsU0FBUyxDQUFDQyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBRTVCLEtBQUssSUFBSWhDLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxHQUFHLEVBQUVBLENBQUMsSUFBSSxDQUFDLEVBQUU7TUFDL0IsTUFBTThDLElBQUksR0FBR2pDLFFBQVEsQ0FBQ1MsYUFBYSxDQUFDLEtBQUssQ0FBQztNQUMxQ3dCLElBQUksQ0FBQ2YsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO01BQzFCYyxJQUFJLENBQUNDLE9BQU8sQ0FBQ0QsSUFBSSxHQUFHOUMsQ0FBQztNQUVyQixJQUNFLE9BQU8yQyxTQUFTLENBQUN6QyxLQUFLLENBQUNSLElBQUksQ0FBQ0MsS0FBSyxDQUFDSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQ0EsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLFFBQVEsS0FDOUQ0QyxJQUFJLEtBQUssUUFBUSxJQUFJQyxTQUFTLEtBQUssV0FBVyxDQUFDLEVBQ2hEO1FBQ0FDLElBQUksQ0FBQ2YsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO01BQzVCO01BQ0EsSUFDRVksSUFBSSxLQUFLLFVBQVUsSUFDbkJDLFNBQVMsS0FBSyxhQUFhLElBQzNCLENBQUNDLElBQUksQ0FBQ2YsU0FBUyxDQUFDaUIsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUNwQztRQUNBRixJQUFJLENBQUNmLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFdBQVcsQ0FBQztNQUNqQztNQUVBLEtBQUssSUFBSWlCLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR04sU0FBUyxDQUFDTyxlQUFlLENBQUNDLE1BQU0sRUFBRUYsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUM1RCxJQUNFTixTQUFTLENBQUNPLGVBQWUsQ0FBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUt2RCxJQUFJLENBQUNDLEtBQUssQ0FBQ0ssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUN0RDJDLFNBQVMsQ0FBQ08sZUFBZSxDQUFDRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBS2pELENBQUMsR0FBRyxFQUFFLEVBQzFDO1VBQ0E4QyxJQUFJLENBQUNmLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztVQUU5QixJQUFJLE9BQU9XLFNBQVMsQ0FBQ3pDLEtBQUssQ0FBQ1IsSUFBSSxDQUFDQyxLQUFLLENBQUNLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDQSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQ25FOEMsSUFBSSxDQUFDZixTQUFTLENBQUNDLEdBQUcsQ0FBQyxLQUFLLENBQUM7VUFDM0I7UUFDRjtNQUNGO01BRUE5QixLQUFLLENBQUNpQyxXQUFXLENBQUNXLElBQUksQ0FBQztJQUN6QjtJQUVBLE9BQU81QyxLQUFLO0VBQ2QsQ0FBQztFQUVEa0QsWUFBWUEsQ0FBQ0MsV0FBVyxFQUFFbkUsYUFBYSxFQUFFMkQsU0FBUyxFQUFFO0lBQ2xELE1BQU1TLGVBQWUsR0FBRzlDLEdBQUcsQ0FBQ2tDLFVBQVUsQ0FBQ1csV0FBVyxFQUFFLFFBQVEsRUFBRVIsU0FBUyxDQUFDO0lBQ3hFLE1BQU1VLGlCQUFpQixHQUFHL0MsR0FBRyxDQUFDa0MsVUFBVSxDQUN0Q3hELGFBQWEsRUFDYixVQUFVLEVBQ1YyRCxTQUNGLENBQUM7SUFFRCxNQUFNVyxlQUFlLEdBQUczQyxRQUFRLENBQUM0QyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQztJQUNyRUQsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDdEIsV0FBVyxHQUFHLEVBQUU7SUFDbkNzQixlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUN0QixXQUFXLEdBQUcsRUFBRTtJQUNuQ3NCLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQ3JCLFdBQVcsQ0FBQ21CLGVBQWUsQ0FBQztJQUMvQ0UsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDckIsV0FBVyxDQUFDb0IsaUJBQWlCLENBQUM7RUFDbkQsQ0FBQztFQUVERyxVQUFVQSxDQUFDQyxPQUFPLEVBQUU7SUFDbEIsTUFBTXBDLFFBQVEsR0FBR1YsUUFBUSxDQUFDQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7SUFDekRTLFFBQVEsQ0FBQ1csV0FBVyxHQUFHeUIsT0FBTztFQUNoQztBQUNGLENBQUM7QUFFRCxpRUFBZW5ELEdBQUc7Ozs7Ozs7Ozs7Ozs7OztBQzdIUTtBQUUxQixNQUFNcUQsU0FBUyxDQUFDO0VBQ2RDLFdBQVdBLENBQUEsRUFBRztJQUNaLElBQUksQ0FBQzVELEtBQUssR0FBRyxFQUFFO0lBQ2YsSUFBSSxDQUFDZ0QsZUFBZSxHQUFHLEVBQUU7SUFFekIsS0FBSyxJQUFJbEQsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLEVBQUUsRUFBRUEsQ0FBQyxJQUFJLENBQUMsRUFBRTtNQUM5QixNQUFNK0QsSUFBSSxHQUFHLEVBQUU7TUFFZixLQUFLLElBQUlkLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDOUJjLElBQUksQ0FBQzNELElBQUksQ0FBQyxPQUFPLENBQUM7TUFDcEI7TUFFQSxJQUFJLENBQUNGLEtBQUssQ0FBQ0UsSUFBSSxDQUFDMkQsSUFBSSxDQUFDO0lBQ3ZCO0VBQ0Y7RUFFQTFELFNBQVNBLENBQUNqQixJQUFJLEVBQUVlLFdBQVcsRUFBRTtJQUMzQixNQUFNNkQsV0FBVyxHQUFHLElBQUlKLDZDQUFJLENBQUN4RSxJQUFJLEVBQUVlLFdBQVcsQ0FBQ2dELE1BQU0sQ0FBQztJQUV0RGhELFdBQVcsQ0FBQ2IsT0FBTyxDQUFFMkUsU0FBUyxJQUFLO01BQ2pDLElBQUksQ0FBQy9ELEtBQUssQ0FBQytELFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0QsV0FBVztJQUN0RCxDQUFDLENBQUM7RUFDSjtFQUVBRSxhQUFhQSxDQUFDRCxTQUFTLEVBQUU7SUFDdkIsSUFBSSxDQUFDZixlQUFlLENBQUM5QyxJQUFJLENBQUM2RCxTQUFTLENBQUM7SUFDcEMsTUFBTW5CLElBQUksR0FBRyxJQUFJLENBQUM1QyxLQUFLLENBQUMrRCxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRW5ELElBQUksT0FBT25CLElBQUksS0FBSyxRQUFRLEVBQUU7TUFDNUJBLElBQUksQ0FBQ3FCLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQyxNQUFNO01BQ0wsSUFBSSxDQUFDakUsS0FBSyxDQUFDK0QsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNBLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU07SUFDakQ7RUFDRjtFQUVBRyxPQUFPQSxDQUFBLEVBQUc7SUFDUixLQUFLLElBQUlwRSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsRUFBRSxFQUFFQSxDQUFDLElBQUksQ0FBQyxFQUFFO01BQzlCLEtBQUssSUFBSWlELENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDOUIsSUFDRSxPQUFPLElBQUksQ0FBQy9DLEtBQUssQ0FBQ0YsQ0FBQyxDQUFDLENBQUNpRCxDQUFDLENBQUMsS0FBSyxRQUFRLElBQ3BDLENBQUMsSUFBSSxDQUFDL0MsS0FBSyxDQUFDRixDQUFDLENBQUMsQ0FBQ2lELENBQUMsQ0FBQyxDQUFDb0IsTUFBTSxDQUFDLENBQUMsRUFDMUI7VUFDQSxPQUFPLEtBQUs7UUFDZDtNQUNGO0lBQ0Y7SUFFQSxPQUFPLElBQUk7RUFDYjtFQUVBQyxpQkFBaUJBLENBQUNMLFNBQVMsRUFBRTtJQUMzQixLQUFLLElBQUlqRSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsSUFBSSxDQUFDa0QsZUFBZSxDQUFDQyxNQUFNLEVBQUVuRCxDQUFDLElBQUksQ0FBQyxFQUFFO01BQ3ZELElBQ0UsSUFBSSxDQUFDa0QsZUFBZSxDQUFDbEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUtpRSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQzNDLElBQUksQ0FBQ2YsZUFBZSxDQUFDbEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUtpRSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQzNDO1FBQ0EsT0FBTyxJQUFJO01BQ2I7SUFDRjtJQUVBLE9BQU8sS0FBSztFQUNkO0FBQ0Y7QUFFQSxpRUFBZUosU0FBUzs7Ozs7Ozs7Ozs7Ozs7O0FDbEVZO0FBRXBDLE1BQU1VLE1BQU0sQ0FBQztFQUNYVCxXQUFXQSxDQUFBLEVBQUc7SUFDWixJQUFJLENBQUNULFdBQVcsR0FBRyxJQUFJUSxrREFBUyxDQUFDLENBQUM7SUFDbEMsSUFBSSxDQUFDM0UsYUFBYSxHQUFHLElBQUkyRSxrREFBUyxDQUFDLENBQUM7RUFDdEM7RUFFQVcsVUFBVUEsQ0FBQ1AsU0FBUyxFQUFFO0lBQ3BCLElBQUksQ0FBQy9FLGFBQWEsQ0FBQ2dGLGFBQWEsQ0FBQ0QsU0FBUyxDQUFDO0lBQzNDLE1BQU1uQixJQUFJLEdBQUcsSUFBSSxDQUFDNUQsYUFBYSxDQUFDZ0IsS0FBSyxDQUFDK0QsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNBLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRSxJQUFJTixPQUFPLEdBQUcsc0JBQXNCO0lBRXBDLElBQUksT0FBT2IsSUFBSSxLQUFLLFFBQVEsRUFBRTtNQUM1QmEsT0FBTyxHQUFHLG9CQUFvQjtNQUU5QixJQUFJYixJQUFJLENBQUN1QixNQUFNLEVBQUU7UUFDZlYsT0FBTyxHQUFJLEdBQUVBLE9BQVEseUJBQXdCYixJQUFJLENBQUMxRCxJQUFLLEdBQUU7TUFDM0Q7SUFDRjtJQUVBLE9BQU91RSxPQUFPO0VBQ2hCO0VBRUFjLFlBQVlBLENBQUEsRUFBRztJQUNiLElBQUk1RSxHQUFHLEdBQUdILElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3hDLElBQUlXLE1BQU0sR0FBR2IsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFM0MsT0FBTyxJQUFJLENBQUN5RCxXQUFXLENBQUNpQixpQkFBaUIsQ0FBQyxDQUFDekUsR0FBRyxFQUFFVSxNQUFNLENBQUMsQ0FBQyxFQUFFO01BQ3hEVixHQUFHLEdBQUdILElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO01BQ3BDVyxNQUFNLEdBQUdiLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3pDO0lBRUEsSUFBSSxDQUFDeUQsV0FBVyxDQUFDYSxhQUFhLENBQUMsQ0FBQ3JFLEdBQUcsRUFBRVUsTUFBTSxDQUFDLENBQUM7RUFDL0M7QUFDRjtBQUVBLGlFQUFlZ0UsTUFBTTs7Ozs7Ozs7Ozs7Ozs7O0FDckNHO0FBRXhCLE1BQU1HLGdCQUFnQixHQUFHO0VBQ3ZCakYsVUFBVSxFQUFFLEtBQUs7RUFFakJOLEtBQUssRUFBRSxDQUNMO0lBQUVDLElBQUksRUFBRSxTQUFTO0lBQUVDLElBQUksRUFBRSxDQUFDO0lBQUVzRixPQUFPLEVBQUU7RUFBTSxDQUFDLEVBQzVDO0lBQUV2RixJQUFJLEVBQUUsWUFBWTtJQUFFQyxJQUFJLEVBQUUsQ0FBQztJQUFFc0YsT0FBTyxFQUFFO0VBQU0sQ0FBQyxFQUMvQztJQUFFdkYsSUFBSSxFQUFFLFdBQVc7SUFBRUMsSUFBSSxFQUFFLENBQUM7SUFBRXNGLE9BQU8sRUFBRTtFQUFNLENBQUMsRUFDOUM7SUFBRXZGLElBQUksRUFBRSxXQUFXO0lBQUVDLElBQUksRUFBRSxDQUFDO0lBQUVzRixPQUFPLEVBQUU7RUFBTSxDQUFDLEVBQzlDO0lBQUV2RixJQUFJLEVBQUUsYUFBYTtJQUFFQyxJQUFJLEVBQUUsQ0FBQztJQUFFc0YsT0FBTyxFQUFFO0VBQU0sQ0FBQyxDQUNqRDtFQUVEQyxXQUFXQSxDQUFDbEUsQ0FBQyxFQUFFbUUsTUFBTSxFQUFFO0lBQ3JCbkUsQ0FBQyxDQUFDQyxjQUFjLENBQUMsQ0FBQztJQUNsQixNQUFNbUUsSUFBSSxHQUFHcEUsQ0FBQyxDQUFDcUUsWUFBWSxDQUFDQyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQzNDLE1BQU1DLE9BQU8sR0FBR3BFLFFBQVEsQ0FBQ0MsYUFBYSxDQUFFLElBQUdnRSxJQUFLLEVBQUMsQ0FBQztJQUNsRCxNQUFNekYsSUFBSSxHQUFHNEYsT0FBTyxDQUFDQyxpQkFBaUI7SUFDdEMsTUFBTUMsSUFBSSxHQUFHekUsQ0FBQyxDQUFDTSxNQUFNLENBQUNlLFNBQVM7SUFDL0IsTUFBTTtNQUFFZTtJQUFLLENBQUMsR0FBR3BDLENBQUMsQ0FBQ00sTUFBTSxDQUFDK0IsT0FBTztJQUVqQyxJQUNHLENBQUMsSUFBSSxDQUFDdEQsVUFBVSxJQUFLcUQsSUFBSSxHQUFHLEVBQUUsR0FBSXpELElBQUksR0FBRyxFQUFFLElBQzNDLElBQUksQ0FBQ0ksVUFBVSxJQUFJQyxJQUFJLENBQUNDLEtBQUssQ0FBQ21ELElBQUksR0FBRyxFQUFFLENBQUMsR0FBR3pELElBQUksR0FBRyxFQUFHLElBQ3RELENBQUM4RixJQUFJLENBQUNuQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQ3RCbUMsSUFBSSxDQUFDbkMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUNyQjtNQUNBbUMsSUFBSSxDQUFDMUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztNQUN4QjtJQUNGO0lBRUEsTUFBTXRDLFdBQVcsR0FBRyxFQUFFO0lBRXRCLEtBQUssSUFBSUgsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHWCxJQUFJLEVBQUVXLENBQUMsSUFBSSxDQUFDLEVBQUU7TUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQ1AsVUFBVSxFQUFFO1FBQ3BCVSxXQUFXLENBQUNDLElBQUksQ0FBQyxDQUFDVixJQUFJLENBQUNDLEtBQUssQ0FBQ21ELElBQUksR0FBRyxFQUFFLENBQUMsRUFBR0EsSUFBSSxHQUFHLEVBQUUsR0FBSTlDLENBQUMsQ0FBQyxDQUFDO01BQzVELENBQUMsTUFBTTtRQUNMRyxXQUFXLENBQUNDLElBQUksQ0FBQyxDQUFDVixJQUFJLENBQUNDLEtBQUssQ0FBQ21ELElBQUksR0FBRyxFQUFFLENBQUMsR0FBRzlDLENBQUMsRUFBRThDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztNQUMxRDtJQUNGO0lBRUErQixNQUFNLENBQUN4QixXQUFXLENBQUNoRCxTQUFTLENBQUN5RSxJQUFJLEVBQUUzRSxXQUFXLENBQUM7SUFDL0M4RSxPQUFPLENBQUMvQyxXQUFXLEdBQUcsRUFBRTtJQUN4QjFCLDRDQUFHLENBQUM0QyxZQUFZLENBQUN5QixNQUFNLENBQUN4QixXQUFXLEVBQUV3QixNQUFNLENBQUMzRixhQUFhLEVBQUUsY0FBYyxDQUFDO0lBRTFFLE1BQU1rRyxRQUFRLEdBQUdOLElBQUksS0FBSyxhQUFhLEdBQUcsYUFBYSxHQUFHQSxJQUFJO0lBQzlELE1BQU1kLFdBQVcsR0FBRyxJQUFJLENBQUM3RSxLQUFLLENBQUNrRyxJQUFJLENBQUU5RixJQUFJLElBQUtBLElBQUksQ0FBQ0gsSUFBSSxLQUFLZ0csUUFBUSxDQUFDO0lBQ3JFcEIsV0FBVyxDQUFDVyxPQUFPLEdBQUcsSUFBSTtFQUM1QixDQUFDO0VBRURXLFdBQVdBLENBQUEsRUFBRztJQUNaLE1BQU1DLFFBQVEsR0FBRzFFLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFlBQVksQ0FBQztJQUVyRCxJQUFJLElBQUksQ0FBQ3JCLFVBQVUsRUFBRTtNQUNuQjhGLFFBQVEsQ0FBQ3hELFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQUNwQyxDQUFDLE1BQU07TUFDTHVELFFBQVEsQ0FBQ3hELFNBQVMsQ0FBQ1UsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUN2QztJQUVBLElBQUksSUFBSSxDQUFDaEQsVUFBVSxFQUFFO01BQ25CLElBQUksQ0FBQ04sS0FBSyxDQUFDRyxPQUFPLENBQUVDLElBQUksSUFBSztRQUMzQixNQUFNNkYsUUFBUSxHQUFHdkUsUUFBUSxDQUFDUyxhQUFhLENBQUMsR0FBRyxDQUFDO1FBQzVDOEQsUUFBUSxDQUFDbEQsV0FBVyxHQUFHM0MsSUFBSSxDQUFDSCxJQUFJO1FBQ2hDbUcsUUFBUSxDQUFDQyxNQUFNLENBQUNKLFFBQVEsQ0FBQztNQUMzQixDQUFDLENBQUM7SUFDSjtJQUVBLElBQUksQ0FBQ2pHLEtBQUssQ0FBQ0csT0FBTyxDQUFFQyxJQUFJLElBQUs7TUFDM0IsTUFBTTBGLE9BQU8sR0FBR3BFLFFBQVEsQ0FBQ1MsYUFBYSxDQUFDLEtBQUssQ0FBQztNQUM3QzJELE9BQU8sQ0FBQ2xELFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztNQUNqQyxNQUFNeUQsTUFBTSxHQUFHbEcsSUFBSSxDQUFDSCxJQUFJLEtBQUssYUFBYSxHQUFHLGFBQWEsR0FBR0csSUFBSSxDQUFDSCxJQUFJO01BQ3RFNkYsT0FBTyxDQUFDaEQsWUFBWSxDQUFDLElBQUksRUFBRXdELE1BQU0sQ0FBQztNQUNsQ1IsT0FBTyxDQUFDaEQsWUFBWSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUM7TUFFekMsSUFBSSxDQUFDMUMsSUFBSSxDQUFDb0YsT0FBTyxFQUFFO1FBQ2pCLEtBQUssSUFBSTNFLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR1QsSUFBSSxDQUFDRixJQUFJLEVBQUVXLENBQUMsSUFBSSxDQUFDLEVBQUU7VUFDckMsTUFBTThDLElBQUksR0FBR2pDLFFBQVEsQ0FBQ1MsYUFBYSxDQUFDLEtBQUssQ0FBQztVQUMxQ3dCLElBQUksQ0FBQ2YsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO1VBQzFCYyxJQUFJLENBQUNDLE9BQU8sQ0FBQ0QsSUFBSSxHQUFHOUMsQ0FBQztVQUNyQmlGLE9BQU8sQ0FBQzlDLFdBQVcsQ0FBQ1csSUFBSSxDQUFDO1FBQzNCO01BQ0Y7TUFFQSxJQUFJLENBQUMsSUFBSSxDQUFDckQsVUFBVSxFQUFFO1FBQ3BCLE1BQU0yRixRQUFRLEdBQUd2RSxRQUFRLENBQUNTLGFBQWEsQ0FBQyxHQUFHLENBQUM7UUFDNUM4RCxRQUFRLENBQUNsRCxXQUFXLEdBQUczQyxJQUFJLENBQUNILElBQUk7UUFDaENtRyxRQUFRLENBQUNDLE1BQU0sQ0FBQ0osUUFBUSxDQUFDO01BQzNCO01BRUFHLFFBQVEsQ0FBQ0MsTUFBTSxDQUFDUCxPQUFPLENBQUM7TUFFeEJBLE9BQU8sQ0FBQ1MsZ0JBQWdCLENBQUMsV0FBVyxFQUFHaEYsQ0FBQyxJQUFLO1FBQzNDQSxDQUFDLENBQUNxRSxZQUFZLENBQUNZLE9BQU8sQ0FBQyxNQUFNLEVBQUVqRixDQUFDLENBQUNNLE1BQU0sQ0FBQzRFLEVBQUUsQ0FBQztNQUM3QyxDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7RUFDSixDQUFDO0VBRURDLEtBQUtBLENBQUNoQixNQUFNLEVBQUU7SUFDWixNQUFNeEQsVUFBVSxHQUFHUixRQUFRLENBQUNDLGFBQWEsQ0FBQyxjQUFjLENBQUM7SUFDekQsTUFBTWUsb0JBQW9CLEdBQUdoQixRQUFRLENBQUNDLGFBQWEsQ0FBQyxTQUFTLENBQUM7SUFDOUQsTUFBTWdGLFlBQVksR0FBR2pGLFFBQVEsQ0FBQ1MsYUFBYSxDQUFDLFFBQVEsQ0FBQztJQUNyRCxNQUFNaUUsUUFBUSxHQUFHMUUsUUFBUSxDQUFDUyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBRTlDaUUsUUFBUSxDQUFDeEQsU0FBUyxDQUFDQyxHQUFHLENBQUMsV0FBVyxDQUFDO0lBQ25DOEQsWUFBWSxDQUFDNUQsV0FBVyxHQUFHLFFBQVE7SUFDbkNiLFVBQVUsQ0FBQ2MsV0FBVyxDQUFDMkQsWUFBWSxDQUFDO0lBQ3BDekUsVUFBVSxDQUFDbUUsTUFBTSxDQUFDRCxRQUFRLENBQUM7SUFFM0JPLFlBQVksQ0FBQ0osZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU07TUFDM0MsSUFBSSxDQUFDakcsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDQSxVQUFVO01BQ2xDOEYsUUFBUSxDQUFDckQsV0FBVyxHQUFHLEVBQUU7TUFDekIsSUFBSSxDQUFDb0QsV0FBVyxDQUFDLENBQUM7SUFDcEIsQ0FBQyxDQUFDO0lBRUY5RSw0Q0FBRyxDQUFDNEMsWUFBWSxDQUFDeUIsTUFBTSxDQUFDeEIsV0FBVyxFQUFFd0IsTUFBTSxDQUFDM0YsYUFBYSxFQUFFLGNBQWMsQ0FBQztJQUMxRSxJQUFJLENBQUNvRyxXQUFXLENBQUMsQ0FBQztJQUVsQnpELG9CQUFvQixDQUFDNkQsZ0JBQWdCLENBQUMsVUFBVSxFQUFHaEYsQ0FBQyxJQUFLO01BQ3ZEQSxDQUFDLENBQUNDLGNBQWMsQ0FBQyxDQUFDO01BQ2xCRCxDQUFDLENBQUNNLE1BQU0sQ0FBQ2UsU0FBUyxDQUFDQyxHQUFHLENBQUMsV0FBVyxDQUFDO0lBQ3JDLENBQUMsQ0FBQztJQUVGSCxvQkFBb0IsQ0FBQzZELGdCQUFnQixDQUFDLFdBQVcsRUFBR2hGLENBQUMsSUFBSztNQUN4REEsQ0FBQyxDQUFDQyxjQUFjLENBQUMsQ0FBQztNQUNsQkQsQ0FBQyxDQUFDTSxNQUFNLENBQUNlLFNBQVMsQ0FBQ1UsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUN4QyxDQUFDLENBQUM7SUFFRlosb0JBQW9CLENBQUM2RCxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUdoRixDQUFDLElBQUs7TUFDbkQsSUFBSSxDQUFDa0UsV0FBVyxDQUFDbEUsQ0FBQyxFQUFFbUUsTUFBTSxDQUFDO0lBQzdCLENBQUMsQ0FBQztFQUNKO0FBQ0YsQ0FBQztBQUVELGlFQUFlSCxnQkFBZ0I7Ozs7Ozs7Ozs7Ozs7O0FDckkvQixNQUFNZCxJQUFJLENBQUM7RUFDVEUsV0FBV0EsQ0FBQzFFLElBQUksRUFBRStELE1BQU0sRUFBRTtJQUN4QixJQUFJLENBQUMvRCxJQUFJLEdBQUdBLElBQUk7SUFDaEIsSUFBSSxDQUFDK0QsTUFBTSxHQUFHQSxNQUFNO0lBQ3BCLElBQUksQ0FBQzRDLFFBQVEsR0FBRyxDQUFDO0VBQ25CO0VBRUE1QixHQUFHQSxDQUFBLEVBQUc7SUFDSixJQUFJLENBQUMsSUFBSSxDQUFDRSxNQUFNLENBQUMsQ0FBQyxFQUFFO01BQ2xCLElBQUksQ0FBQzBCLFFBQVEsSUFBSSxDQUFDO0lBQ3BCO0VBQ0Y7RUFFQTFCLE1BQU1BLENBQUEsRUFBRztJQUNQLE9BQU8sSUFBSSxDQUFDMEIsUUFBUSxLQUFLLElBQUksQ0FBQzVDLE1BQU07RUFDdEM7QUFDRjtBQUVBLGlFQUFlUyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCbkI7QUFDMEc7QUFDakI7QUFDTztBQUNoRyw0Q0FBNEMsMklBQWtEO0FBQzlGLDRDQUE0QywrR0FBb0M7QUFDaEYsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRix5Q0FBeUMsc0ZBQStCO0FBQ3hFLHlDQUF5QyxzRkFBK0I7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsYUFBYSxtQ0FBbUM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixtQ0FBbUM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxnRkFBZ0YsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxzQ0FBc0MseUNBQXlDLHNEQUFzRCxLQUFLLGVBQWUsNkJBQTZCLG1CQUFtQixnREFBZ0QsS0FBSyxjQUFjLG9CQUFvQixvQkFBb0Isd0RBQXdELDRCQUE0QixnQkFBZ0IsS0FBSyxZQUFZLHVFQUF1RSxzQkFBc0IsS0FBSyxxQkFBcUIsb0JBQW9CLGlEQUFpRCxnQkFBZ0IsNEJBQTRCLEtBQUssZ0JBQWdCLHlCQUF5Qix3QkFBd0IseUJBQXlCLHNCQUFzQixLQUFLLHNCQUFzQix3QkFBd0Isb0JBQW9CLDRCQUE0QixrREFBa0QsS0FBSyxvQkFBb0Isb0JBQW9CLCtDQUErQywwQ0FBMEMsMEJBQTBCLDRCQUE0Qix1QkFBdUIscUJBQXFCLEtBQUssbUJBQW1CLG9CQUFvQixxQkFBcUIsNkJBQTZCLDhCQUE4QixlQUFlLHNCQUFzQiwwQkFBMEIsS0FBSyxtQkFBbUIsb0RBQW9ELEtBQUssNkJBQTZCLDBCQUEwQiwyQkFBMkIsNkJBQTZCLEtBQUssc0JBQXNCLGdCQUFnQixLQUFLLHVCQUF1QixrQkFBa0IseUJBQXlCLG9CQUFvQixxREFBcUQsb0NBQW9DLHFEQUFxRCx3QkFBd0IsMEJBQTBCLEtBQUssZ0JBQWdCLG9CQUFvQiw4Q0FBOEMsMkNBQTJDLGVBQWUsS0FBSyxlQUFlLDhCQUE4QixLQUFLLDJCQUEyQiw2QkFBNkIsbUJBQW1CLEtBQUssbUJBQW1CLCtDQUErQyxLQUFLLGNBQWMsZ0NBQWdDLEtBQUssb0JBQW9CLHNCQUFzQixLQUFLLHVCQUF1QjtBQUNueEc7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7QUNqSTFCOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0EscUZBQXFGO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpQkFBaUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFCQUFxQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzRkFBc0YscUJBQXFCO0FBQzNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzREFBc0QscUJBQXFCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNwRmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3pCYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGNBQWM7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RBLE1BQStGO0FBQy9GLE1BQXFGO0FBQ3JGLE1BQTRGO0FBQzVGLE1BQStHO0FBQy9HLE1BQXdHO0FBQ3hHLE1BQXdHO0FBQ3hHLE1BQW1HO0FBQ25HO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsc0ZBQU87Ozs7QUFJNkM7QUFDckUsT0FBTyxpRUFBZSxzRkFBTyxJQUFJLHNGQUFPLFVBQVUsc0ZBQU8sbUJBQW1CLEVBQUM7Ozs7Ozs7Ozs7O0FDMUJoRTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isd0JBQXdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDZCQUE2QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ25GYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNqQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDYkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NsQkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOzs7OztXQ3JCQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0FzQjtBQUNRO0FBQ047QUFDMEI7QUFDSTtBQUV0RCxJQUFJaUIsTUFBTTtBQUNWLElBQUltQixVQUFVLEdBQUcsS0FBSztBQUV0QixTQUFTMUQsT0FBT0EsQ0FBQSxFQUFHO0VBQ2pCLElBQUkwRCxVQUFVLEVBQUU7SUFDZDtFQUNGO0VBQ0EsSUFBSW5CLE1BQU0sQ0FBQzNGLGFBQWEsQ0FBQ2tGLE9BQU8sQ0FBQyxDQUFDLEVBQUU7SUFDbEM1RCw0Q0FBRyxDQUFDa0QsVUFBVSxDQUFDLDRCQUE0QixDQUFDO0VBQzlDLENBQUMsTUFBTTtJQUNMbEQsNENBQUcsQ0FBQ2tELFVBQVUsQ0FBQyxpQ0FBaUMsQ0FBQztFQUNuRDtFQUVBbEQsNENBQUcsQ0FBQzRDLFlBQVksQ0FBQ3lCLE1BQU0sQ0FBQ3hCLFdBQVcsRUFBRXdCLE1BQU0sQ0FBQzNGLGFBQWEsRUFBRSxXQUFXLENBQUM7RUFDdkVzQiw0Q0FBRyxDQUFDOEIsT0FBTyxDQUFDLENBQUM7RUFFYixNQUFNQyxhQUFhLEdBQUcxQixRQUFRLENBQUNDLGFBQWEsQ0FBQyxXQUFXLENBQUM7RUFDekR5QixhQUFhLENBQUNtRCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUVsRiw0Q0FBRyxDQUFDZ0MsUUFBUSxDQUFDO0FBQ3ZEO0FBRUEsU0FBU3lELFNBQVNBLENBQUN2RixDQUFDLEVBQUU7RUFDcEJBLENBQUMsQ0FBQ3dGLHdCQUF3QixDQUFDLENBQUM7RUFFNUIsSUFDRXhGLENBQUMsQ0FBQ00sTUFBTSxDQUFDZSxTQUFTLENBQUNpQixRQUFRLENBQUMsTUFBTSxDQUFDLElBQ25DLENBQUN0QyxDQUFDLENBQUNNLE1BQU0sQ0FBQ2UsU0FBUyxDQUFDaUIsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUN4QztJQUNBLE1BQU07TUFBRUY7SUFBSyxDQUFDLEdBQUdwQyxDQUFDLENBQUNNLE1BQU0sQ0FBQytCLE9BQU87SUFDakMsTUFBTVksT0FBTyxHQUFHa0IsTUFBTSxDQUFDTCxVQUFVLENBQUMsQ0FBQzlFLElBQUksQ0FBQ0MsS0FBSyxDQUFDbUQsSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFFQSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDckV0Qyw0Q0FBRyxDQUFDa0QsVUFBVSxDQUFDQyxPQUFPLENBQUM7SUFDdkJrQixNQUFNLENBQUNKLFlBQVksQ0FBQyxDQUFDO0lBQ3JCakUsNENBQUcsQ0FBQzRDLFlBQVksQ0FBQ3lCLE1BQU0sQ0FBQ3hCLFdBQVcsRUFBRXdCLE1BQU0sQ0FBQzNGLGFBQWEsRUFBRSxhQUFhLENBQUM7RUFDM0U7RUFDQSxJQUFJMkYsTUFBTSxDQUFDeEIsV0FBVyxDQUFDZSxPQUFPLENBQUMsQ0FBQyxJQUFJUyxNQUFNLENBQUMzRixhQUFhLENBQUNrRixPQUFPLENBQUMsQ0FBQyxFQUFFO0lBQ2xFOUIsT0FBTyxDQUFDLENBQUM7SUFDVDBELFVBQVUsR0FBRyxJQUFJO0VBQ25CO0FBQ0Y7O0FBRUE7QUFDQSxNQUFNdEYsQ0FBQyxHQUFHO0VBQUVDLGNBQWNBLENBQUEsRUFBRyxDQUFDLENBQUM7RUFBRUssTUFBTSxFQUFFO0lBQUVDLEtBQUtBLENBQUEsRUFBRyxDQUFDO0VBQUU7QUFBRSxDQUFDO0FBQ3pEO0FBQ0E0RCxNQUFNLEdBQUcsSUFBSU4sK0NBQU0sQ0FBQyxDQUFDO0FBQ3JCL0QsNENBQUcsQ0FBQ0MsU0FBUyxDQUFDQyxDQUFDLENBQUM7QUFDaEJnRSx5REFBZ0IsQ0FBQ21CLEtBQUssQ0FBQ2hCLE1BQU0sQ0FBQztBQUM5QjVGLCtEQUFrQixDQUFDNEYsTUFBTSxDQUFDM0YsYUFBYSxDQUFDO0FBQ3hDc0IsNENBQUcsQ0FBQzRDLFlBQVksQ0FBQ3lCLE1BQU0sQ0FBQ3hCLFdBQVcsRUFBRXdCLE1BQU0sQ0FBQzNGLGFBQWEsRUFBRSxhQUFhLENBQUM7QUFDekUsTUFBTWlILEtBQUssR0FBR3RGLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFFBQVEsQ0FBQztBQUM5Q3FGLEtBQUssQ0FBQ1QsZ0JBQWdCLENBQUMsT0FBTyxFQUFFTyxTQUFTLENBQUM7QUFDMUMsTSIsInNvdXJjZXMiOlsid2VicGFjazovL25ldy8uL3NyYy9qcy9jb21wdXRlclBsYWNlU2hpcHMuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vc3JjL2pzL2RvbS5qcyIsIndlYnBhY2s6Ly9uZXcvLi9zcmMvanMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL25ldy8uL3NyYy9qcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vc3JjL2pzL3BsYXllclBsYWNlU2hpcHMuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vc3JjL2pzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9uZXcvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL25ldy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL25ldy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9uZXcvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL25ldy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9uZXcvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vbmV3L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9uZXcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL25ldy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9uZXcvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbmV3L3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9uZXcvLi9zcmMvanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gY29tcHV0ZXJQbGFjZVNoaXBzKGNvbXB1dGVyQm9hcmQpIHtcclxuICBjb25zdCBzaGlwcyA9IFtcclxuICAgIHsgbmFtZTogJ0NhcnJpZXInLCBzaXplOiA1IH0sXHJcbiAgICB7IG5hbWU6ICdCYXR0bGVzaGlwJywgc2l6ZTogNCB9LFxyXG4gICAgeyBuYW1lOiAnRGVzdHJveWVyJywgc2l6ZTogMyB9LFxyXG4gICAgeyBuYW1lOiAnU3VibWFyaW5lJywgc2l6ZTogMyB9LFxyXG4gICAgeyBuYW1lOiAnUGF0cm9sIEJvYXQnLCBzaXplOiAyIH0sXHJcbiAgXTtcclxuXHJcbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgbGV0IGtlZXBHb2luZyA9IHRydWU7XHJcblxyXG4gICAgd2hpbGUgKGtlZXBHb2luZykge1xyXG4gICAgICBjb25zdCBpc1ZlcnRpY2FsID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XHJcblxyXG4gICAgICBpZiAoaXNWZXJ0aWNhbCA9PT0gMCkge1xyXG4gICAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgICBjb25zdCBmaXJzdENvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMCAtIHNoaXAuc2l6ZSkpO1xyXG4gICAgICAgIGxldCBhbGxFbXB0eSA9IHRydWU7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHNoaXAuc2l6ZTsgaSArPSAxKSB7XHJcbiAgICAgICAgICBjb25zdCBjdXJyZW50Q2VsbCA9IGNvbXB1dGVyQm9hcmQuYm9hcmRbcm93XVtmaXJzdENvbHVtbiArIGldO1xyXG5cclxuICAgICAgICAgIGlmICh0eXBlb2YgY3VycmVudENlbGwgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGFsbEVtcHR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFsbEVtcHR5KSB7XHJcbiAgICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IFtdO1xyXG5cclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5zaXplOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChbcm93LCBmaXJzdENvbHVtbiArIGldKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChzaGlwLm5hbWUsIGNvb3JkaW5hdGVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGtlZXBHb2luZyA9ICFhbGxFbXB0eTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBmaXJzdFJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMCAtIHNoaXAuc2l6ZSkpO1xyXG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgICBsZXQgYWxsRW1wdHkgPSB0cnVlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBzaGlwLnNpemU7IGkgKz0gMSkge1xyXG4gICAgICAgICAgY29uc3QgY3VycmVudENlbGwgPSBjb21wdXRlckJvYXJkLmJvYXJkW2ZpcnN0Um93ICsgaV1bY29sdW1uXTtcclxuXHJcbiAgICAgICAgICBpZiAodHlwZW9mIGN1cnJlbnRDZWxsID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBhbGxFbXB0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhbGxFbXB0eSkge1xyXG4gICAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuc2l6ZTsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2goW2ZpcnN0Um93ICsgaSwgY29sdW1uXSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoc2hpcC5uYW1lLCBjb29yZGluYXRlcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBrZWVwR29pbmcgPSAhYWxsRW1wdHk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tcHV0ZXJQbGFjZVNoaXBzO1xyXG4iLCJjb25zdCBkb20gPSB7XHJcbiAgc3RhcnRHYW1lKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuYW1lJyk7XHJcbiAgICBjb25zdCBuYW1lID0gbmFtZUlucHV0LnZhbHVlO1xyXG4gICAgZS50YXJnZXQucmVzZXQoKTtcclxuXHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpO1xyXG4gICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgIGNvbnN0IG1lc3NhZ2VCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IG1lc3NhZ2VQID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgY29uc3QgZ2FtZUNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IHBsYXllckNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IGVuZW15Q29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgcGxheWVyQ2FwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XHJcbiAgICBjb25zdCBlbmVteUNhcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xyXG4gICAgY29uc3QgcGxheWVyQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IGVuZW15Qm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICBtZXNzYWdlQm94LmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2UtYm94Jyk7XHJcbiAgICBnYW1lQ29udGVudC5jbGFzc0xpc3QuYWRkKCdnYW1lLWNvbnRlbnQnKTtcclxuICAgIHBsYXllckNvbnRlbnQuY2xhc3NMaXN0LmFkZCgncGxheWVyLWNvbnRlbnQnKTtcclxuICAgIGVuZW15Q29udGVudC5jbGFzc0xpc3QuYWRkKCdwbGF5ZXItY29udGVudCcpO1xyXG4gICAgcGxheWVyQ2FwdGlvbi5jbGFzc0xpc3QuYWRkKCdjYXB0aW9uJyk7XHJcbiAgICBlbmVteUNhcHRpb24uY2xhc3NMaXN0LmFkZCgnY2FwdGlvbicpO1xyXG4gICAgcGxheWVyQm9hcmRDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdib2FyZC1jb250YWluZXInKTtcclxuICAgIHBsYXllckJvYXJkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAncGxheWVyJyk7XHJcbiAgICBlbmVteUJvYXJkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYm9hcmQtY29udGFpbmVyJyk7XHJcbiAgICBlbmVteUJvYXJkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnZW5lbXknKTtcclxuXHJcbiAgICBwbGF5ZXJDYXB0aW9uLnRleHRDb250ZW50ID0gbmFtZSA/IGAke25hbWV9J3MgRmxlZXRgIDogXCJQbGF5ZXIncyBGbGVldFwiO1xyXG4gICAgZW5lbXlDYXB0aW9uLnRleHRDb250ZW50ID0gYEVuZW15IEZsZWV0YDtcclxuXHJcbiAgICBtZXNzYWdlQm94LmFwcGVuZENoaWxkKG1lc3NhZ2VQKTtcclxuICAgIHBsYXllckNvbnRlbnQuYXBwZW5kQ2hpbGQocGxheWVyQ2FwdGlvbik7XHJcbiAgICBwbGF5ZXJDb250ZW50LmFwcGVuZENoaWxkKHBsYXllckJvYXJkQ29udGFpbmVyKTtcclxuICAgIGVuZW15Q29udGVudC5hcHBlbmRDaGlsZChlbmVteUNhcHRpb24pO1xyXG4gICAgZW5lbXlDb250ZW50LmFwcGVuZENoaWxkKGVuZW15Qm9hcmRDb250YWluZXIpO1xyXG4gICAgZ2FtZUNvbnRlbnQuYXBwZW5kQ2hpbGQocGxheWVyQ29udGVudCk7XHJcbiAgICBnYW1lQ29udGVudC5hcHBlbmRDaGlsZChlbmVteUNvbnRlbnQpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUobWVzc2FnZUJveCwgZm9ybSk7XHJcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShnYW1lQ29udGVudCwgbWVzc2FnZUJveCk7XHJcbiAgfSxcclxuXHJcbiAgZW5kR2FtZSgpIHtcclxuICAgIGNvbnN0IG1lc3NhZ2VCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZS1ib3gnKTtcclxuICAgIGNvbnN0IG5ld0dhbWVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIG5ld0dhbWVCdXR0b24uY2xhc3NMaXN0LmFkZCgnbmV3LWdhbWUnKTtcclxuICAgIG5ld0dhbWVCdXR0b24udGV4dENvbnRlbnQgPSAnTmV3IEdhbWUnO1xyXG4gICAgbWVzc2FnZUJveC5hcHBlbmRDaGlsZChuZXdHYW1lQnV0dG9uKTtcclxuICB9LFxyXG5cclxuICBvcGVuRm9ybSgpIHtcclxuICAgIGNvbnN0IG1lc3NhZ2VCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZS1ib3gnKTtcclxuICAgIGNvbnN0IGdhbWVDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtY29udGVudCcpO1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcclxuICAgIG1lc3NhZ2VCb3gucmVtb3ZlKCk7XHJcbiAgICBnYW1lQ29udGVudC5yZW1vdmUoKTtcclxuICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgfSxcclxuXHJcbiAgYnVpbGRCb2FyZChnYW1lYm9hcmQsIHR5cGUsIGNvbmRpdGlvbikge1xyXG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGJvYXJkLmNsYXNzTGlzdC5hZGQoJ2JvYXJkJyk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkgKz0gMSkge1xyXG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xyXG4gICAgICBjZWxsLmRhdGFzZXQuY2VsbCA9IGk7XHJcblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdHlwZW9mIGdhbWVib2FyZC5ib2FyZFtNYXRoLmZsb29yKGkgLyAxMCldW2kgJSAxMF0gPT09ICdvYmplY3QnICYmXHJcbiAgICAgICAgKHR5cGUgPT09ICdwbGF5ZXInIHx8IGNvbmRpdGlvbiA9PT0gJ2dhbWUgb3ZlcicpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChcclxuICAgICAgICB0eXBlID09PSAnY29tcHV0ZXInICYmXHJcbiAgICAgICAgY29uZGl0aW9uID09PSAnbm9ybWFsIHBsYXknICYmXHJcbiAgICAgICAgIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdhdHRhY2tlZCcpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2xpY2thYmxlJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ2FtZWJvYXJkLnByZXZpb3VzQXR0YWNrcy5sZW5ndGg7IGogKz0gMSkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIGdhbWVib2FyZC5wcmV2aW91c0F0dGFja3Nbal1bMF0gPT09IE1hdGguZmxvb3IoaSAvIDEwKSAmJlxyXG4gICAgICAgICAgZ2FtZWJvYXJkLnByZXZpb3VzQXR0YWNrc1tqXVsxXSA9PT0gaSAlIDEwXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2F0dGFja2VkJyk7XHJcblxyXG4gICAgICAgICAgaWYgKHR5cGVvZiBnYW1lYm9hcmQuYm9hcmRbTWF0aC5mbG9vcihpIC8gMTApXVtpICUgMTBdID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoY2VsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGJvYXJkO1xyXG4gIH0sXHJcblxyXG4gIGFwcGVuZEJvYXJkcyhwbGF5ZXJCb2FyZCwgY29tcHV0ZXJCb2FyZCwgY29uZGl0aW9uKSB7XHJcbiAgICBjb25zdCBwbGF5ZXJCb2FyZE5vZGUgPSBkb20uYnVpbGRCb2FyZChwbGF5ZXJCb2FyZCwgJ3BsYXllcicsIGNvbmRpdGlvbik7XHJcbiAgICBjb25zdCBjb21wdXRlckJvYXJkTm9kZSA9IGRvbS5idWlsZEJvYXJkKFxyXG4gICAgICBjb21wdXRlckJvYXJkLFxyXG4gICAgICAnY29tcHV0ZXInLFxyXG4gICAgICBjb25kaXRpb24sXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGJvYXJkQ29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib2FyZC1jb250YWluZXInKTtcclxuICAgIGJvYXJkQ29udGFpbmVyc1swXS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgYm9hcmRDb250YWluZXJzWzFdLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICBib2FyZENvbnRhaW5lcnNbMF0uYXBwZW5kQ2hpbGQocGxheWVyQm9hcmROb2RlKTtcclxuICAgIGJvYXJkQ29udGFpbmVyc1sxXS5hcHBlbmRDaGlsZChjb21wdXRlckJvYXJkTm9kZSk7XHJcbiAgfSxcclxuXHJcbiAgbmV3TWVzc2FnZShtZXNzYWdlKSB7XHJcbiAgICBjb25zdCBtZXNzYWdlUCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlLWJveCBwJyk7XHJcbiAgICBtZXNzYWdlUC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRvbTtcclxuIiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcclxuXHJcbmNsYXNzIEdhbWVib2FyZCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmJvYXJkID0gW107XHJcbiAgICB0aGlzLnByZXZpb3VzQXR0YWNrcyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xyXG4gICAgICBjb25zdCB0ZW1wID0gW107XHJcblxyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcclxuICAgICAgICB0ZW1wLnB1c2goJ2VtcHR5Jyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuYm9hcmQucHVzaCh0ZW1wKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBsYWNlU2hpcChuYW1lLCBjb29yZGluYXRlcykge1xyXG4gICAgY29uc3QgY3VycmVudFNoaXAgPSBuZXcgU2hpcChuYW1lLCBjb29yZGluYXRlcy5sZW5ndGgpO1xyXG5cclxuICAgIGNvb3JkaW5hdGVzLmZvckVhY2goKGNvb3JkUGFpcikgPT4ge1xyXG4gICAgICB0aGlzLmJvYXJkW2Nvb3JkUGFpclswXV1bY29vcmRQYWlyWzFdXSA9IGN1cnJlbnRTaGlwO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZWNlaXZlQXR0YWNrKGNvb3JkUGFpcikge1xyXG4gICAgdGhpcy5wcmV2aW91c0F0dGFja3MucHVzaChjb29yZFBhaXIpO1xyXG4gICAgY29uc3QgY2VsbCA9IHRoaXMuYm9hcmRbY29vcmRQYWlyWzBdXVtjb29yZFBhaXJbMV1dO1xyXG5cclxuICAgIGlmICh0eXBlb2YgY2VsbCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgY2VsbC5oaXQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYm9hcmRbY29vcmRQYWlyWzBdXVtjb29yZFBhaXJbMV1dID0gJ21pc3MnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWxsU3VuaygpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB0eXBlb2YgdGhpcy5ib2FyZFtpXVtqXSA9PT0gJ29iamVjdCcgJiZcclxuICAgICAgICAgICF0aGlzLmJvYXJkW2ldW2pdLmlzU3VuaygpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBpblByZXZpb3VzQXR0YWNrcyhjb29yZFBhaXIpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcmV2aW91c0F0dGFja3MubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMucHJldmlvdXNBdHRhY2tzW2ldWzBdID09PSBjb29yZFBhaXJbMF0gJiZcclxuICAgICAgICB0aGlzLnByZXZpb3VzQXR0YWNrc1tpXVsxXSA9PT0gY29vcmRQYWlyWzFdXHJcbiAgICAgICkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xyXG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkJztcclxuXHJcbmNsYXNzIFBsYXllciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnBsYXllckJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xyXG4gICAgdGhpcy5jb21wdXRlckJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xyXG4gIH1cclxuXHJcbiAgcGxheWVyTW92ZShjb29yZFBhaXIpIHtcclxuICAgIHRoaXMuY29tcHV0ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkUGFpcik7XHJcbiAgICBjb25zdCBjZWxsID0gdGhpcy5jb21wdXRlckJvYXJkLmJvYXJkW2Nvb3JkUGFpclswXV1bY29vcmRQYWlyWzFdXTtcclxuICAgIGxldCBtZXNzYWdlID0gJ1lvdSBtaXNzZWQgdGhlIGVuZW15JztcclxuXHJcbiAgICBpZiAodHlwZW9mIGNlbGwgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIG1lc3NhZ2UgPSAnWW91IGhpdCB0aGUgZW5lbXkhJztcclxuXHJcbiAgICAgIGlmIChjZWxsLmlzU3Vuaykge1xyXG4gICAgICAgIG1lc3NhZ2UgPSBgJHttZXNzYWdlfSBZb3Ugc3VuayB0aGUgZW5lbXkncyAke2NlbGwubmFtZX0hYDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtZXNzYWdlO1xyXG4gIH1cclxuXHJcbiAgY29tcHV0ZXJNb3ZlKCkge1xyXG4gICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgIGxldCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcblxyXG4gICAgd2hpbGUgKHRoaXMucGxheWVyQm9hcmQuaW5QcmV2aW91c0F0dGFja3MoW3JvdywgY29sdW1uXSkpIHtcclxuICAgICAgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wbGF5ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKFtyb3csIGNvbHVtbl0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xyXG4iLCJpbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcclxuXHJcbmNvbnN0IHBsYXllclBsYWNlU2hpcHMgPSB7XHJcbiAgaXNWZXJ0aWNhbDogZmFsc2UsXHJcblxyXG4gIHNoaXBzOiBbXHJcbiAgICB7IG5hbWU6ICdDYXJyaWVyJywgc2l6ZTogNSwgaW5GbGVldDogZmFsc2UgfSxcclxuICAgIHsgbmFtZTogJ0JhdHRsZXNoaXAnLCBzaXplOiA0LCBpbkZsZWV0OiBmYWxzZSB9LFxyXG4gICAgeyBuYW1lOiAnRGVzdHJveWVyJywgc2l6ZTogMywgaW5GbGVldDogZmFsc2UgfSxcclxuICAgIHsgbmFtZTogJ1N1Ym1hcmluZScsIHNpemU6IDMsIGluRmxlZXQ6IGZhbHNlIH0sXHJcbiAgICB7IG5hbWU6ICdQYXRyb2wgQm9hdCcsIHNpemU6IDIsIGluRmxlZXQ6IGZhbHNlIH0sXHJcbiAgXSxcclxuXHJcbiAgZHJvcEhhbmRsZXIoZSwgcGxheWVyKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBkYXRhID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dCcpO1xyXG4gICAgY29uc3Qgc2hpcERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2RhdGF9YCk7XHJcbiAgICBjb25zdCBzaXplID0gc2hpcERpdi5jaGlsZEVsZW1lbnRDb3VudDtcclxuICAgIGNvbnN0IGxpc3QgPSBlLnRhcmdldC5jbGFzc0xpc3Q7XHJcbiAgICBjb25zdCB7IGNlbGwgfSA9IGUudGFyZ2V0LmRhdGFzZXQ7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAoIXRoaXMuaXNWZXJ0aWNhbCAmJiAoY2VsbCAlIDEwKSArIHNpemUgPiAxMCkgfHxcclxuICAgICAgKHRoaXMuaXNWZXJ0aWNhbCAmJiBNYXRoLmZsb29yKGNlbGwgLyAxMCkgKyBzaXplID4gMTApIHx8XHJcbiAgICAgICFsaXN0LmNvbnRhaW5zKCdjZWxsJykgfHxcclxuICAgICAgbGlzdC5jb250YWlucygnc2hpcCcpXHJcbiAgICApIHtcclxuICAgICAgbGlzdC5yZW1vdmUoJ3RlbXAtc2hpcCcpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkgKz0gMSkge1xyXG4gICAgICBpZiAoIXRoaXMuaXNWZXJ0aWNhbCkge1xyXG4gICAgICAgIGNvb3JkaW5hdGVzLnB1c2goW01hdGguZmxvb3IoY2VsbCAvIDEwKSwgKGNlbGwgJSAxMCkgKyBpXSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaChbTWF0aC5mbG9vcihjZWxsIC8gMTApICsgaSwgY2VsbCAlIDEwXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5ZXIucGxheWVyQm9hcmQucGxhY2VTaGlwKGRhdGEsIGNvb3JkaW5hdGVzKTtcclxuICAgIHNoaXBEaXYudGV4dENvbnRlbnQgPSAnJztcclxuICAgIGRvbS5hcHBlbmRCb2FyZHMocGxheWVyLnBsYXllckJvYXJkLCBwbGF5ZXIuY29tcHV0ZXJCb2FyZCwgJ3NoaXAgcGxhY2luZycpO1xyXG5cclxuICAgIGNvbnN0IHNoaXBOYW1lID0gZGF0YSA9PT0gJ1BhdHJvbC1Cb2F0JyA/ICdQYXRyb2wgQm9hdCcgOiBkYXRhO1xyXG4gICAgY29uc3QgY3VycmVudFNoaXAgPSB0aGlzLnNoaXBzLmZpbmQoKHNoaXApID0+IHNoaXAubmFtZSA9PT0gc2hpcE5hbWUpO1xyXG4gICAgY3VycmVudFNoaXAuaW5GbGVldCA9IHRydWU7XHJcbiAgfSxcclxuXHJcbiAgY3JlYXRlU2hpcHMoKSB7XHJcbiAgICBjb25zdCBhbGxTaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGwtc2hpcHMnKTtcclxuXHJcbiAgICBpZiAodGhpcy5pc1ZlcnRpY2FsKSB7XHJcbiAgICAgIGFsbFNoaXBzLmNsYXNzTGlzdC5hZGQoJ3ZlcnRpY2FsJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGxTaGlwcy5jbGFzc0xpc3QucmVtb3ZlKCd2ZXJ0aWNhbCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmlzVmVydGljYWwpIHtcclxuICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2hpcE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgc2hpcE5hbWUudGV4dENvbnRlbnQgPSBzaGlwLm5hbWU7XHJcbiAgICAgICAgYWxsU2hpcHMuYXBwZW5kKHNoaXBOYW1lKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNoaXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgc2hpcERpdi5jbGFzc0xpc3QuYWRkKCdzaGlwLWRpdicpO1xyXG4gICAgICBjb25zdCBpZE5hbWUgPSBzaGlwLm5hbWUgPT09ICdQYXRyb2wgQm9hdCcgPyAnUGF0cm9sLUJvYXQnIDogc2hpcC5uYW1lO1xyXG4gICAgICBzaGlwRGl2LnNldEF0dHJpYnV0ZSgnaWQnLCBpZE5hbWUpO1xyXG4gICAgICBzaGlwRGl2LnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ3RydWUnKTtcclxuXHJcbiAgICAgIGlmICghc2hpcC5pbkZsZWV0KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNpemU7IGkgKz0gMSkge1xyXG4gICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XHJcbiAgICAgICAgICBjZWxsLmRhdGFzZXQuY2VsbCA9IGk7XHJcbiAgICAgICAgICBzaGlwRGl2LmFwcGVuZENoaWxkKGNlbGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCF0aGlzLmlzVmVydGljYWwpIHtcclxuICAgICAgICBjb25zdCBzaGlwTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBzaGlwTmFtZS50ZXh0Q29udGVudCA9IHNoaXAubmFtZTtcclxuICAgICAgICBhbGxTaGlwcy5hcHBlbmQoc2hpcE5hbWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBhbGxTaGlwcy5hcHBlbmQoc2hpcERpdik7XHJcblxyXG4gICAgICBzaGlwRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIChlKSA9PiB7XHJcbiAgICAgICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dCcsIGUudGFyZ2V0LmlkKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9LFxyXG5cclxuICBwbGFjZShwbGF5ZXIpIHtcclxuICAgIGNvbnN0IG1lc3NhZ2VCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZS1ib3gnKTtcclxuICAgIGNvbnN0IHBsYXllckJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllcicpO1xyXG4gICAgY29uc3Qgcm90YXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBjb25zdCBhbGxTaGlwcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgIGFsbFNoaXBzLmNsYXNzTGlzdC5hZGQoJ2FsbC1zaGlwcycpO1xyXG4gICAgcm90YXRlQnV0dG9uLnRleHRDb250ZW50ID0gJ1JvdGF0ZSc7XHJcbiAgICBtZXNzYWdlQm94LmFwcGVuZENoaWxkKHJvdGF0ZUJ1dHRvbik7XHJcbiAgICBtZXNzYWdlQm94LmFwcGVuZChhbGxTaGlwcyk7XHJcblxyXG4gICAgcm90YXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmlzVmVydGljYWwgPSAhdGhpcy5pc1ZlcnRpY2FsO1xyXG4gICAgICBhbGxTaGlwcy50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgICB0aGlzLmNyZWF0ZVNoaXBzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb20uYXBwZW5kQm9hcmRzKHBsYXllci5wbGF5ZXJCb2FyZCwgcGxheWVyLmNvbXB1dGVyQm9hcmQsICdzaGlwIHBsYWNpbmcnKTtcclxuICAgIHRoaXMuY3JlYXRlU2hpcHMoKTtcclxuXHJcbiAgICBwbGF5ZXJCb2FyZENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChlKSA9PiB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgndGVtcC1zaGlwJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBwbGF5ZXJCb2FyZENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCAoZSkgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ3RlbXAtc2hpcCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcGxheWVyQm9hcmRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIChlKSA9PiB7XHJcbiAgICAgIHRoaXMuZHJvcEhhbmRsZXIoZSwgcGxheWVyKTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwbGF5ZXJQbGFjZVNoaXBzO1xyXG4iLCJjbGFzcyBTaGlwIHtcclxuICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgpIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWVcclxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgdGhpcy50aW1lc0hpdCA9IDA7XHJcbiAgfVxyXG5cclxuICBoaXQoKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNTdW5rKCkpIHtcclxuICAgICAgdGhpcy50aW1lc0hpdCArPSAxO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNTdW5rKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGltZXNIaXQgPT09IHRoaXMubGVuZ3RoO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcclxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vZm9udHMvSVRDIE1hY2hpbmUgUmVndWxhci5vdGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuL2ltZy9hbHBoYS14LnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYEBmb250LWZhY2Uge1xyXG4gIGZvbnQtZmFtaWx5OiAnSVRDIE1hY2hpbmUgUmVndWxhcic7XHJcbiAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSk7XHJcbn1cclxuXHJcbjpyb290IHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBuYXZ5O1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcclxufVxyXG5cclxuYm9keSB7XHJcbiAgaGVpZ2h0OiAxMDB2aDtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtcm93czogbWF4LWNvbnRlbnQgbWF4LWNvbnRlbnQgMjAwcHg7XHJcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogMzBweDtcclxufVxyXG5cclxuaDEge1xyXG4gIGZvbnQtZmFtaWx5OiAnSVRDIE1hY2hpbmUgUmVndWxhcicsIEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XHJcbiAgZm9udC1zaXplOiA0cmVtO1xyXG59XHJcblxyXG4uZW50ZXItbmFtZSB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgzLCBtYXgtY29udGVudCk7XHJcbiAgZ2FwOiAxMHB4O1xyXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuYnV0dG9uIHtcclxuICB3aWR0aDogbWF4LWNvbnRlbnQ7XHJcbiAgcGFkZGluZzogNXB4IDEwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLm1lc3NhZ2UtYm94IHtcclxuICBmb250LXNpemU6IDEuNXJlbTtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IG1heC1jb250ZW50O1xyXG59XHJcblxyXG4uYWxsLXNoaXBzIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWF4LWNvbnRlbnQgMjAwcHg7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNSwgNTBweCk7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgY29sdW1uLWdhcDogMzBweDtcclxuICBtYXJnaW46IDIwcHggMDtcclxufVxyXG5cclxuLnNoaXAtZGl2IHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIG1hcmdpbjogMTBweCAwO1xyXG4gIGdyaWQtYXV0by1mbG93OiBjb2x1bW47XHJcbiAgZ3JpZC1hdXRvLWNvbHVtbnM6IDMwcHg7XHJcbiAgZ2FwOiAxcHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIGp1c3RpZnktc2VsZjogc3RhcnQ7XHJcbn1cclxuXHJcbi52ZXJ0aWNhbCB7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgbWF4LWNvbnRlbnQpO1xyXG59XHJcblxyXG4udmVydGljYWwgLnNoaXAtZGl2IHtcclxuICBncmlkLWF1dG8tZmxvdzogcm93O1xyXG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xyXG4gIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XHJcbn1cclxuXHJcbi5hbGwtc2hpcHMgcCB7XHJcbiAgbWFyZ2luOiAwO1xyXG59XHJcblxyXG4uZ2FtZS1jb250ZW50IHtcclxuICB3aWR0aDogMTAwJTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1heC1jb250ZW50IG1heC1jb250ZW50O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xyXG4gIGZvbnQtZmFtaWx5OiAnSVRDIE1hY2hpbmUgUmVndWxhcicsIHNhbnMtc2VyaWY7XHJcbiAgZm9udC1zaXplOiAxLjVyZW07XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDJweDtcclxufVxyXG5cclxuLmJvYXJkIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAzMHB4KTtcclxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMzBweCk7XHJcbiAgZ2FwOiAxcHg7XHJcbn1cclxuXHJcbi5jZWxsIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuLnNoaXAsIC50ZW1wLXNoaXAge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XHJcbiAgaGVpZ2h0OiAzMHB4O1xyXG59XHJcblxyXG4uYXR0YWNrZWQge1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX199KTtcclxufVxyXG5cclxuLmhpdCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNjE2MTtcclxufVxyXG5cclxuLmNsaWNrYWJsZSB7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGtDQUFrQztFQUNsQyw0Q0FBNkM7QUFDL0M7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLGFBQWE7RUFDYixhQUFhO0VBQ2IsaURBQWlEO0VBQ2pELHFCQUFxQjtFQUNyQixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxnRUFBZ0U7RUFDaEUsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7RUFDYiwwQ0FBMEM7RUFDMUMsU0FBUztFQUNULHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsYUFBYTtFQUNiLHFCQUFxQjtFQUNyQiwyQ0FBMkM7QUFDN0M7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isd0NBQXdDO0VBQ3hDLG1DQUFtQztFQUNuQyxtQkFBbUI7RUFDbkIscUJBQXFCO0VBQ3JCLGdCQUFnQjtFQUNoQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGNBQWM7RUFDZCxzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLFFBQVE7RUFDUixlQUFlO0VBQ2YsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsNkNBQTZDO0FBQy9DOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLG9CQUFvQjtFQUNwQixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxTQUFTO0FBQ1g7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYiw4Q0FBOEM7RUFDOUMsNkJBQTZCO0VBQzdCLDhDQUE4QztFQUM5QyxpQkFBaUI7RUFDakIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHVDQUF1QztFQUN2QyxvQ0FBb0M7RUFDcEMsUUFBUTtBQUNWOztBQUVBO0VBQ0UsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLHlEQUF3QztBQUMxQzs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGVBQWU7QUFDakJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZSB7XFxyXFxuICBmb250LWZhbWlseTogJ0lUQyBNYWNoaW5lIFJlZ3VsYXInO1xcclxcbiAgc3JjOiB1cmwoJy4vZm9udHMvSVRDXFxcXCBNYWNoaW5lXFxcXCBSZWd1bGFyLm90ZicpO1xcclxcbn1cXHJcXG5cXHJcXG46cm9vdCB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBuYXZ5O1xcclxcbiAgY29sb3I6IHdoaXRlO1xcclxcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgaGVpZ2h0OiAxMDB2aDtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IG1heC1jb250ZW50IDIwMHB4O1xcclxcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcclxcbiAgZ2FwOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG5oMSB7XFxyXFxuICBmb250LWZhbWlseTogJ0lUQyBNYWNoaW5lIFJlZ3VsYXInLCBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcclxcbiAgZm9udC1zaXplOiA0cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4uZW50ZXItbmFtZSB7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMywgbWF4LWNvbnRlbnQpO1xcclxcbiAgZ2FwOiAxMHB4O1xcclxcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG5idXR0b24ge1xcclxcbiAgd2lkdGg6IG1heC1jb250ZW50O1xcclxcbiAgcGFkZGluZzogNXB4IDEwcHg7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5tZXNzYWdlLWJveCB7XFxyXFxuICBmb250LXNpemU6IDEuNXJlbTtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IG1heC1jb250ZW50O1xcclxcbn1cXHJcXG5cXHJcXG4uYWxsLXNoaXBzIHtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1heC1jb250ZW50IDIwMHB4O1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNSwgNTBweCk7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcclxcbiAgY29sdW1uLWdhcDogMzBweDtcXHJcXG4gIG1hcmdpbjogMjBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcC1kaXYge1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIG1hcmdpbjogMTBweCAwO1xcclxcbiAgZ3JpZC1hdXRvLWZsb3c6IGNvbHVtbjtcXHJcXG4gIGdyaWQtYXV0by1jb2x1bW5zOiAzMHB4O1xcclxcbiAgZ2FwOiAxcHg7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBqdXN0aWZ5LXNlbGY6IHN0YXJ0O1xcclxcbn1cXHJcXG5cXHJcXG4udmVydGljYWwge1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgbWF4LWNvbnRlbnQpO1xcclxcbn1cXHJcXG5cXHJcXG4udmVydGljYWwgLnNoaXAtZGl2IHtcXHJcXG4gIGdyaWQtYXV0by1mbG93OiByb3c7XFxyXFxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXHJcXG4gIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxyXFxufVxcclxcblxcclxcbi5hbGwtc2hpcHMgcCB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLWNvbnRlbnQge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtYXgtY29udGVudCBtYXgtY29udGVudDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcclxcbiAgZm9udC1mYW1pbHk6ICdJVEMgTWFjaGluZSBSZWd1bGFyJywgc2Fucy1zZXJpZjtcXHJcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcclxcbiAgbGV0dGVyLXNwYWNpbmc6IDJweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkIHtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxyXFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMzBweCk7XFxyXFxuICBnYXA6IDFweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNlbGwge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxyXFxufVxcclxcblxcclxcbi5zaGlwLCAudGVtcC1zaGlwIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XFxyXFxuICBoZWlnaHQ6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi5hdHRhY2tlZCB7XFxyXFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9pbWcvYWxwaGEteC5zdmcpO1xcclxcbn1cXHJcXG5cXHJcXG4uaGl0IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjYxNjE7XFxyXFxufVxcclxcblxcclxcbi5jbGlja2FibGUge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuLi9zdHlsZS5jc3MnO1xyXG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcclxuaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XHJcbmltcG9ydCBwbGF5ZXJQbGFjZVNoaXBzIGZyb20gJy4vcGxheWVyUGxhY2VTaGlwcyc7XHJcbmltcG9ydCBjb21wdXRlclBsYWNlU2hpcHMgZnJvbSAnLi9jb21wdXRlclBsYWNlU2hpcHMnO1xyXG5cclxubGV0IHBsYXllcjtcclxubGV0IGlzR2FtZU92ZXIgPSBmYWxzZTtcclxuXHJcbmZ1bmN0aW9uIGVuZEdhbWUoKSB7XHJcbiAgaWYgKGlzR2FtZU92ZXIpIHtcclxuICAgIHJldHVyblxyXG4gIH1cclxuICBpZiAocGxheWVyLmNvbXB1dGVyQm9hcmQuYWxsU3VuaygpKSB7XHJcbiAgICBkb20ubmV3TWVzc2FnZSgnRW5lbXkgZmxlZXQgc3VuayEgWW91IHdpbiEnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZG9tLm5ld01lc3NhZ2UoJ1lvdXIgZmxlZXQgd2FzIHN1bmshIEdhbWUgb3ZlciEnKTtcclxuICB9XHJcblxyXG4gIGRvbS5hcHBlbmRCb2FyZHMocGxheWVyLnBsYXllckJvYXJkLCBwbGF5ZXIuY29tcHV0ZXJCb2FyZCwgJ2dhbWUgb3ZlcicpO1xyXG4gIGRvbS5lbmRHYW1lKCk7XHJcblxyXG4gIGNvbnN0IG5ld0dhbWVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LWdhbWUnKTtcclxuICBuZXdHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZG9tLm9wZW5Gb3JtKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGxheVJvdW5kKGUpIHtcclxuICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG5cclxuICBpZiAoXHJcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbGwnKSAmJlxyXG4gICAgIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYXR0YWNrZWQnKVxyXG4gICkge1xyXG4gICAgY29uc3QgeyBjZWxsIH0gPSBlLnRhcmdldC5kYXRhc2V0O1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IHBsYXllci5wbGF5ZXJNb3ZlKFtNYXRoLmZsb29yKGNlbGwgLyAxMCksIGNlbGwgJSAxMF0pO1xyXG4gICAgZG9tLm5ld01lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICBwbGF5ZXIuY29tcHV0ZXJNb3ZlKCk7XHJcbiAgICBkb20uYXBwZW5kQm9hcmRzKHBsYXllci5wbGF5ZXJCb2FyZCwgcGxheWVyLmNvbXB1dGVyQm9hcmQsICdub3JtYWwgcGxheScpO1xyXG4gIH1cclxuICBpZiAocGxheWVyLnBsYXllckJvYXJkLmFsbFN1bmsoKSB8fCBwbGF5ZXIuY29tcHV0ZXJCb2FyZC5hbGxTdW5rKCkpIHtcclxuICAgIGVuZEdhbWUoKTtcclxuICAgIGlzR2FtZU92ZXIgPSB0cnVlO1xyXG4gIH1cclxufVxyXG5cclxuLy8gY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcclxuY29uc3QgZSA9IHsgcHJldmVudERlZmF1bHQoKSB7fSwgdGFyZ2V0OiB7IHJlc2V0KCkge30gfSB9O1xyXG4vLyBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XHJcbnBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxuZG9tLnN0YXJ0R2FtZShlKTtcclxucGxheWVyUGxhY2VTaGlwcy5wbGFjZShwbGF5ZXIpO1xyXG5jb21wdXRlclBsYWNlU2hpcHMocGxheWVyLmNvbXB1dGVyQm9hcmQpO1xyXG5kb20uYXBwZW5kQm9hcmRzKHBsYXllci5wbGF5ZXJCb2FyZCwgcGxheWVyLmNvbXB1dGVyQm9hcmQsICdub3JtYWwgcGxheScpO1xyXG5jb25zdCBlbmVteSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbmVteScpO1xyXG5lbmVteS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYXlSb3VuZCk7XHJcbi8vIH0pO1xyXG4iXSwibmFtZXMiOlsiY29tcHV0ZXJQbGFjZVNoaXBzIiwiY29tcHV0ZXJCb2FyZCIsInNoaXBzIiwibmFtZSIsInNpemUiLCJmb3JFYWNoIiwic2hpcCIsImtlZXBHb2luZyIsImlzVmVydGljYWwiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyb3ciLCJmaXJzdENvbHVtbiIsImFsbEVtcHR5IiwiaSIsImN1cnJlbnRDZWxsIiwiYm9hcmQiLCJjb29yZGluYXRlcyIsInB1c2giLCJwbGFjZVNoaXAiLCJmaXJzdFJvdyIsImNvbHVtbiIsImRvbSIsInN0YXJ0R2FtZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIm5hbWVJbnB1dCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInZhbHVlIiwidGFyZ2V0IiwicmVzZXQiLCJmb3JtIiwic3R5bGUiLCJkaXNwbGF5IiwibWVzc2FnZUJveCIsImNyZWF0ZUVsZW1lbnQiLCJtZXNzYWdlUCIsImdhbWVDb250ZW50IiwicGxheWVyQ29udGVudCIsImVuZW15Q29udGVudCIsInBsYXllckNhcHRpb24iLCJlbmVteUNhcHRpb24iLCJwbGF5ZXJCb2FyZENvbnRhaW5lciIsImVuZW15Qm9hcmRDb250YWluZXIiLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRBdHRyaWJ1dGUiLCJ0ZXh0Q29udGVudCIsImFwcGVuZENoaWxkIiwiYm9keSIsImluc2VydEJlZm9yZSIsImVuZEdhbWUiLCJuZXdHYW1lQnV0dG9uIiwib3BlbkZvcm0iLCJyZW1vdmUiLCJidWlsZEJvYXJkIiwiZ2FtZWJvYXJkIiwidHlwZSIsImNvbmRpdGlvbiIsImNlbGwiLCJkYXRhc2V0IiwiY29udGFpbnMiLCJqIiwicHJldmlvdXNBdHRhY2tzIiwibGVuZ3RoIiwiYXBwZW5kQm9hcmRzIiwicGxheWVyQm9hcmQiLCJwbGF5ZXJCb2FyZE5vZGUiLCJjb21wdXRlckJvYXJkTm9kZSIsImJvYXJkQ29udGFpbmVycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJuZXdNZXNzYWdlIiwibWVzc2FnZSIsIlNoaXAiLCJHYW1lYm9hcmQiLCJjb25zdHJ1Y3RvciIsInRlbXAiLCJjdXJyZW50U2hpcCIsImNvb3JkUGFpciIsInJlY2VpdmVBdHRhY2siLCJoaXQiLCJhbGxTdW5rIiwiaXNTdW5rIiwiaW5QcmV2aW91c0F0dGFja3MiLCJQbGF5ZXIiLCJwbGF5ZXJNb3ZlIiwiY29tcHV0ZXJNb3ZlIiwicGxheWVyUGxhY2VTaGlwcyIsImluRmxlZXQiLCJkcm9wSGFuZGxlciIsInBsYXllciIsImRhdGEiLCJkYXRhVHJhbnNmZXIiLCJnZXREYXRhIiwic2hpcERpdiIsImNoaWxkRWxlbWVudENvdW50IiwibGlzdCIsInNoaXBOYW1lIiwiZmluZCIsImNyZWF0ZVNoaXBzIiwiYWxsU2hpcHMiLCJhcHBlbmQiLCJpZE5hbWUiLCJhZGRFdmVudExpc3RlbmVyIiwic2V0RGF0YSIsImlkIiwicGxhY2UiLCJyb3RhdGVCdXR0b24iLCJ0aW1lc0hpdCIsImlzR2FtZU92ZXIiLCJwbGF5Um91bmQiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJlbmVteSJdLCJzb3VyY2VSb290IjoiIn0=