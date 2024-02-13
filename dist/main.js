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
    const messageP1 = document.createElement('p');
    const messageP2 = document.createElement('p');
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
    messageBox.appendChild(messageP1);
    messageBox.appendChild(messageP2);
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
  newMessage(message1, message2) {
    const messagePs = document.querySelectorAll('.message-box p');
    messagePs[0].textContent = message1;
    messagePs[1].textContent = message2;
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
      if (cell.isSunk()) {
        message = `${message} You sunk the enemy's ${cell.name}!`;
      }
    }
    return message;
  }
  computerMove() {
    let row = Math.floor(Math.random() * 10);
    let column = Math.floor(Math.random() * 10);
    let message = 'The enemy missed you';
    const cell = this.playerBoard.board[row][column];
    while (this.playerBoard.inPreviousAttacks([row, column])) {
      row = Math.floor(Math.random() * 10);
      column = Math.floor(Math.random() * 10);
    }
    this.playerBoard.receiveAttack([row, column]);
    if (typeof cell === 'object') {
      message = 'The enemy hit you!';
      if (cell.isSunk()) {
        message = `${message} The enemy sunk your ${cell.name}!`;
      }
    }
    return message;
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
  shipsPlaced() {
    const startButton = document.querySelector('.start');
    const rotateButton = document.querySelector('.rotate');
    const allShips = document.querySelector('.all-ships');
    rotateButton.remove();
    allShips.remove();
    startButton.style.display = 'inline';
  },
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
    for (let i = 0; i < this.ships.length; i += 1) {
      if (!this.ships[i].inFleet) {
        return;
      }
    }
    this.shipsPlaced();
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
    const startButton = document.createElement('button');
    const allShips = document.createElement('div');
    const rotateButton = document.createElement('button');
    startButton.textContent = 'Start';
    rotateButton.textContent = 'Rotate';
    startButton.classList.add('start');
    rotateButton.classList.add('rotate');
    allShips.classList.add('all-ships');
    startButton.style.display = 'none';
    messageBox.appendChild(startButton);
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
  align-self: center;
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

.ship,
.temp-ship {
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
`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,kCAAkC;EAClC,4CAA6C;AAC/C;;AAEA;EACE,sBAAsB;EACtB,YAAY;EACZ,yCAAyC;AAC3C;;AAEA;EACE,aAAa;EACb,aAAa;EACb,iDAAiD;EACjD,qBAAqB;EACrB,SAAS;AACX;;AAEA;EACE,gEAAgE;EAChE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,0CAA0C;EAC1C,SAAS;EACT,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,kBAAkB;EAClB,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,aAAa;EACb,qBAAqB;EACrB,2CAA2C;AAC7C;;AAEA;EACE,aAAa;EACb,wCAAwC;EACxC,mCAAmC;EACnC,mBAAmB;EACnB,qBAAqB;EACrB,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,cAAc;EACd,sBAAsB;EACtB,uBAAuB;EACvB,QAAQ;EACR,eAAe;EACf,mBAAmB;AACrB;;AAEA;EACE,6CAA6C;AAC/C;;AAEA;EACE,mBAAmB;EACnB,oBAAoB;EACpB,sBAAsB;AACxB;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,aAAa;EACb,8CAA8C;EAC9C,6BAA6B;EAC7B,8CAA8C;EAC9C,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,uCAAuC;EACvC,oCAAoC;EACpC,QAAQ;AACV;;AAEA;EACE,uBAAuB;AACzB;;AAEA;;EAEE,sBAAsB;EACtB,YAAY;AACd;;AAEA;EACE,yDAAwC;AAC1C;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,eAAe;AACjB","sourcesContent":["@font-face {\r\n  font-family: 'ITC Machine Regular';\r\n  src: url('./fonts/ITC\\ Machine\\ Regular.otf');\r\n}\r\n\r\n:root {\r\n  background-color: navy;\r\n  color: white;\r\n  font-family: Arial, Helvetica, sans-serif;\r\n}\r\n\r\nbody {\r\n  height: 100vh;\r\n  display: grid;\r\n  grid-template-rows: max-content max-content 200px;\r\n  justify-items: center;\r\n  gap: 30px;\r\n}\r\n\r\nh1 {\r\n  font-family: 'ITC Machine Regular', Arial, Helvetica, sans-serif;\r\n  font-size: 4rem;\r\n}\r\n\r\n.enter-name {\r\n  display: grid;\r\n  grid-template-rows: repeat(3, max-content);\r\n  gap: 10px;\r\n  justify-items: center;\r\n}\r\n\r\nbutton {\r\n  width: max-content;\r\n  padding: 5px 10px;\r\n  border-radius: 5px;\r\n  cursor: pointer;\r\n  align-self: center;\r\n}\r\n\r\n.message-box {\r\n  font-size: 1.5rem;\r\n  display: grid;\r\n  justify-items: center;\r\n  grid-template-rows: max-content max-content;\r\n}\r\n\r\n.all-ships {\r\n  display: grid;\r\n  grid-template-columns: max-content 200px;\r\n  grid-template-rows: repeat(5, 50px);\r\n  align-items: center;\r\n  justify-items: center;\r\n  column-gap: 30px;\r\n  margin: 20px 0;\r\n}\r\n\r\n.ship-div {\r\n  display: grid;\r\n  margin: 10px 0;\r\n  grid-auto-flow: column;\r\n  grid-auto-columns: 30px;\r\n  gap: 1px;\r\n  cursor: pointer;\r\n  justify-self: start;\r\n}\r\n\r\n.vertical {\r\n  grid-template-columns: repeat(5, max-content);\r\n}\r\n\r\n.vertical .ship-div {\r\n  grid-auto-flow: row;\r\n  justify-self: center;\r\n  align-self: flex-start;\r\n}\r\n\r\n.all-ships p {\r\n  margin: 0;\r\n}\r\n\r\n.game-content {\r\n  width: 100%;\r\n  text-align: center;\r\n  display: grid;\r\n  grid-template-columns: max-content max-content;\r\n  justify-content: space-evenly;\r\n  font-family: 'ITC Machine Regular', sans-serif;\r\n  font-size: 1.5rem;\r\n  letter-spacing: 2px;\r\n}\r\n\r\n.board {\r\n  display: grid;\r\n  grid-template-columns: repeat(10, 30px);\r\n  grid-template-rows: repeat(10, 30px);\r\n  gap: 1px;\r\n}\r\n\r\n.cell {\r\n  background-color: white;\r\n}\r\n\r\n.ship,\r\n.temp-ship {\r\n  background-color: gray;\r\n  height: 30px;\r\n}\r\n\r\n.attacked {\r\n  background-image: url(./img/alpha-x.svg);\r\n}\r\n\r\n.hit {\r\n  background-color: #ff6161;\r\n}\r\n\r\n.clickable {\r\n  cursor: pointer;\r\n}\r\n"],"sourceRoot":""}]);
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
    const message1 = player.playerMove([Math.floor(cell / 10), cell % 10]);
    const message2 = player.computerMove();
    _dom__WEBPACK_IMPORTED_MODULE_2__["default"].newMessage(message1, message2);
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
// playerPlaceShips.place(player);
// });

// const startButton = document.querySelector('.start');

// startButton.addEventListener('click', () => {
(0,_computerPlaceShips__WEBPACK_IMPORTED_MODULE_4__["default"])(player.playerBoard);
(0,_computerPlaceShips__WEBPACK_IMPORTED_MODULE_4__["default"])(player.computerBoard);
_dom__WEBPACK_IMPORTED_MODULE_2__["default"].appendBoards(player.playerBoard, player.computerBoard, 'normal play');
_dom__WEBPACK_IMPORTED_MODULE_2__["default"].newMessage('Fire when ready!');
const enemy = document.querySelector('#enemy');
enemy.addEventListener('click', playRound);
// startButton.remove();
// });
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLGtCQUFrQkEsQ0FBQ0MsYUFBYSxFQUFFO0VBQ3pDLE1BQU1DLEtBQUssR0FBRyxDQUNaO0lBQUVDLElBQUksRUFBRSxTQUFTO0lBQUVDLElBQUksRUFBRTtFQUFFLENBQUMsRUFDNUI7SUFBRUQsSUFBSSxFQUFFLFlBQVk7SUFBRUMsSUFBSSxFQUFFO0VBQUUsQ0FBQyxFQUMvQjtJQUFFRCxJQUFJLEVBQUUsV0FBVztJQUFFQyxJQUFJLEVBQUU7RUFBRSxDQUFDLEVBQzlCO0lBQUVELElBQUksRUFBRSxXQUFXO0lBQUVDLElBQUksRUFBRTtFQUFFLENBQUMsRUFDOUI7SUFBRUQsSUFBSSxFQUFFLGFBQWE7SUFBRUMsSUFBSSxFQUFFO0VBQUUsQ0FBQyxDQUNqQztFQUVERixLQUFLLENBQUNHLE9BQU8sQ0FBRUMsSUFBSSxJQUFLO0lBQ3RCLElBQUlDLFNBQVMsR0FBRyxJQUFJO0lBRXBCLE9BQU9BLFNBQVMsRUFBRTtNQUNoQixNQUFNQyxVQUFVLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO01BRWhELElBQUlILFVBQVUsS0FBSyxDQUFDLEVBQUU7UUFDcEIsTUFBTUksR0FBRyxHQUFHSCxJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFDRSxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMxQyxNQUFNRSxXQUFXLEdBQUdKLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHTCxJQUFJLENBQUNGLElBQUksQ0FBQyxDQUFDO1FBQ2hFLElBQUlVLFFBQVEsR0FBRyxJQUFJO1FBRW5CLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxJQUFJVCxJQUFJLENBQUNGLElBQUksRUFBRVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtVQUN0QyxNQUFNQyxXQUFXLEdBQUdmLGFBQWEsQ0FBQ2dCLEtBQUssQ0FBQ0wsR0FBRyxDQUFDLENBQUNDLFdBQVcsR0FBR0UsQ0FBQyxDQUFDO1VBRTdELElBQUksT0FBT0MsV0FBVyxLQUFLLFFBQVEsRUFBRTtZQUNuQ0YsUUFBUSxHQUFHLEtBQUs7WUFDaEI7VUFDRjtRQUNGO1FBRUEsSUFBSUEsUUFBUSxFQUFFO1VBQ1osTUFBTUksV0FBVyxHQUFHLEVBQUU7VUFFdEIsS0FBSyxJQUFJSCxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdULElBQUksQ0FBQ0YsSUFBSSxFQUFFVyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3JDRyxXQUFXLENBQUNDLElBQUksQ0FBQyxDQUFDUCxHQUFHLEVBQUVDLFdBQVcsR0FBR0UsQ0FBQyxDQUFDLENBQUM7VUFDMUM7VUFFQWQsYUFBYSxDQUFDbUIsU0FBUyxDQUFDZCxJQUFJLENBQUNILElBQUksRUFBRWUsV0FBVyxDQUFDO1FBQ2pEO1FBRUFYLFNBQVMsR0FBRyxDQUFDTyxRQUFRO01BQ3ZCLENBQUMsTUFBTTtRQUNMLE1BQU1PLFFBQVEsR0FBR1osSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUdMLElBQUksQ0FBQ0YsSUFBSSxDQUFDLENBQUM7UUFDN0QsTUFBTWtCLE1BQU0sR0FBR2IsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDN0MsSUFBSUcsUUFBUSxHQUFHLElBQUk7UUFFbkIsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLElBQUlULElBQUksQ0FBQ0YsSUFBSSxFQUFFVyxDQUFDLElBQUksQ0FBQyxFQUFFO1VBQ3RDLE1BQU1DLFdBQVcsR0FBR2YsYUFBYSxDQUFDZ0IsS0FBSyxDQUFDSSxRQUFRLEdBQUdOLENBQUMsQ0FBQyxDQUFDTyxNQUFNLENBQUM7VUFFN0QsSUFBSSxPQUFPTixXQUFXLEtBQUssUUFBUSxFQUFFO1lBQ25DRixRQUFRLEdBQUcsS0FBSztZQUNoQjtVQUNGO1FBQ0Y7UUFFQSxJQUFJQSxRQUFRLEVBQUU7VUFDWixNQUFNSSxXQUFXLEdBQUcsRUFBRTtVQUV0QixLQUFLLElBQUlILENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR1QsSUFBSSxDQUFDRixJQUFJLEVBQUVXLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDckNHLFdBQVcsQ0FBQ0MsSUFBSSxDQUFDLENBQUNFLFFBQVEsR0FBR04sQ0FBQyxFQUFFTyxNQUFNLENBQUMsQ0FBQztVQUMxQztVQUVBckIsYUFBYSxDQUFDbUIsU0FBUyxDQUFDZCxJQUFJLENBQUNILElBQUksRUFBRWUsV0FBVyxDQUFDO1FBQ2pEO1FBRUFYLFNBQVMsR0FBRyxDQUFDTyxRQUFRO01BQ3ZCO0lBQ0Y7RUFDRixDQUFDLENBQUM7QUFDSjtBQUVBLGlFQUFlZCxrQkFBa0I7Ozs7Ozs7Ozs7Ozs7O0FDdEVqQyxNQUFNdUIsR0FBRyxHQUFHO0VBQ1ZDLFNBQVNBLENBQUNDLENBQUMsRUFBRTtJQUNYQSxDQUFDLENBQUNDLGNBQWMsQ0FBQyxDQUFDO0lBQ2xCLE1BQU1DLFNBQVMsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsT0FBTyxDQUFDO0lBQ2pELE1BQU0xQixJQUFJLEdBQUd3QixTQUFTLENBQUNHLEtBQUs7SUFDNUJMLENBQUMsQ0FBQ00sTUFBTSxDQUFDQyxLQUFLLENBQUMsQ0FBQztJQUVoQixNQUFNQyxJQUFJLEdBQUdMLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLE1BQU0sQ0FBQztJQUMzQ0ksSUFBSSxDQUFDQyxLQUFLLENBQUNDLE9BQU8sR0FBRyxNQUFNO0lBRTNCLE1BQU1DLFVBQVUsR0FBR1IsUUFBUSxDQUFDUyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ2hELE1BQU1DLFNBQVMsR0FBR1YsUUFBUSxDQUFDUyxhQUFhLENBQUMsR0FBRyxDQUFDO0lBQzdDLE1BQU1FLFNBQVMsR0FBR1gsUUFBUSxDQUFDUyxhQUFhLENBQUMsR0FBRyxDQUFDO0lBQzdDLE1BQU1HLFdBQVcsR0FBR1osUUFBUSxDQUFDUyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ2pELE1BQU1JLGFBQWEsR0FBR2IsUUFBUSxDQUFDUyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ25ELE1BQU1LLFlBQVksR0FBR2QsUUFBUSxDQUFDUyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ2xELE1BQU1NLGFBQWEsR0FBR2YsUUFBUSxDQUFDUyxhQUFhLENBQUMsSUFBSSxDQUFDO0lBQ2xELE1BQU1PLFlBQVksR0FBR2hCLFFBQVEsQ0FBQ1MsYUFBYSxDQUFDLElBQUksQ0FBQztJQUNqRCxNQUFNUSxvQkFBb0IsR0FBR2pCLFFBQVEsQ0FBQ1MsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUMxRCxNQUFNUyxtQkFBbUIsR0FBR2xCLFFBQVEsQ0FBQ1MsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUV6REQsVUFBVSxDQUFDVyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxhQUFhLENBQUM7SUFDdkNSLFdBQVcsQ0FBQ08sU0FBUyxDQUFDQyxHQUFHLENBQUMsY0FBYyxDQUFDO0lBQ3pDUCxhQUFhLENBQUNNLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGdCQUFnQixDQUFDO0lBQzdDTixZQUFZLENBQUNLLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGdCQUFnQixDQUFDO0lBQzVDTCxhQUFhLENBQUNJLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUN0Q0osWUFBWSxDQUFDRyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFDckNILG9CQUFvQixDQUFDSSxZQUFZLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDO0lBQzdESixvQkFBb0IsQ0FBQ0ksWUFBWSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUM7SUFDakRILG1CQUFtQixDQUFDRyxZQUFZLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDO0lBQzVESCxtQkFBbUIsQ0FBQ0csWUFBWSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUM7SUFFL0NOLGFBQWEsQ0FBQ08sV0FBVyxHQUFHL0MsSUFBSSxHQUFJLEdBQUVBLElBQUssVUFBUyxHQUFHLGdCQUFnQjtJQUN2RXlDLFlBQVksQ0FBQ00sV0FBVyxHQUFJLGFBQVk7SUFFeENkLFVBQVUsQ0FBQ2UsV0FBVyxDQUFDYixTQUFTLENBQUM7SUFDakNGLFVBQVUsQ0FBQ2UsV0FBVyxDQUFDWixTQUFTLENBQUM7SUFDakNFLGFBQWEsQ0FBQ1UsV0FBVyxDQUFDUixhQUFhLENBQUM7SUFDeENGLGFBQWEsQ0FBQ1UsV0FBVyxDQUFDTixvQkFBb0IsQ0FBQztJQUMvQ0gsWUFBWSxDQUFDUyxXQUFXLENBQUNQLFlBQVksQ0FBQztJQUN0Q0YsWUFBWSxDQUFDUyxXQUFXLENBQUNMLG1CQUFtQixDQUFDO0lBQzdDTixXQUFXLENBQUNXLFdBQVcsQ0FBQ1YsYUFBYSxDQUFDO0lBQ3RDRCxXQUFXLENBQUNXLFdBQVcsQ0FBQ1QsWUFBWSxDQUFDO0lBQ3JDZCxRQUFRLENBQUN3QixJQUFJLENBQUNDLFlBQVksQ0FBQ2pCLFVBQVUsRUFBRUgsSUFBSSxDQUFDO0lBQzVDTCxRQUFRLENBQUN3QixJQUFJLENBQUNDLFlBQVksQ0FBQ2IsV0FBVyxFQUFFSixVQUFVLENBQUM7RUFDckQsQ0FBQztFQUVEa0IsT0FBT0EsQ0FBQSxFQUFHO0lBQ1IsTUFBTWxCLFVBQVUsR0FBR1IsUUFBUSxDQUFDQyxhQUFhLENBQUMsY0FBYyxDQUFDO0lBQ3pELE1BQU0wQixhQUFhLEdBQUczQixRQUFRLENBQUNTLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFDdERrQixhQUFhLENBQUNSLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQUN2Q08sYUFBYSxDQUFDTCxXQUFXLEdBQUcsVUFBVTtJQUN0Q2QsVUFBVSxDQUFDZSxXQUFXLENBQUNJLGFBQWEsQ0FBQztFQUN2QyxDQUFDO0VBRURDLFFBQVFBLENBQUEsRUFBRztJQUNULE1BQU1wQixVQUFVLEdBQUdSLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGNBQWMsQ0FBQztJQUN6RCxNQUFNVyxXQUFXLEdBQUdaLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGVBQWUsQ0FBQztJQUMzRCxNQUFNSSxJQUFJLEdBQUdMLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLE1BQU0sQ0FBQztJQUMzQ08sVUFBVSxDQUFDcUIsTUFBTSxDQUFDLENBQUM7SUFDbkJqQixXQUFXLENBQUNpQixNQUFNLENBQUMsQ0FBQztJQUNwQnhCLElBQUksQ0FBQ0MsS0FBSyxDQUFDQyxPQUFPLEdBQUcsT0FBTztFQUM5QixDQUFDO0VBRUR1QixVQUFVQSxDQUFDQyxTQUFTLEVBQUVDLElBQUksRUFBRUMsU0FBUyxFQUFFO0lBQ3JDLE1BQU01QyxLQUFLLEdBQUdXLFFBQVEsQ0FBQ1MsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUMzQ3BCLEtBQUssQ0FBQzhCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUU1QixLQUFLLElBQUlqQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsR0FBRyxFQUFFQSxDQUFDLElBQUksQ0FBQyxFQUFFO01BQy9CLE1BQU0rQyxJQUFJLEdBQUdsQyxRQUFRLENBQUNTLGFBQWEsQ0FBQyxLQUFLLENBQUM7TUFDMUN5QixJQUFJLENBQUNmLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztNQUMxQmMsSUFBSSxDQUFDQyxPQUFPLENBQUNELElBQUksR0FBRy9DLENBQUM7TUFFckIsSUFDRSxPQUFPNEMsU0FBUyxDQUFDMUMsS0FBSyxDQUFDUixJQUFJLENBQUNDLEtBQUssQ0FBQ0ssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUNBLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxRQUFRLEtBQzlENkMsSUFBSSxLQUFLLFFBQVEsSUFBSUMsU0FBUyxLQUFLLFdBQVcsQ0FBQyxFQUNoRDtRQUNBQyxJQUFJLENBQUNmLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztNQUM1QjtNQUNBLElBQ0VZLElBQUksS0FBSyxVQUFVLElBQ25CQyxTQUFTLEtBQUssYUFBYSxJQUMzQixDQUFDQyxJQUFJLENBQUNmLFNBQVMsQ0FBQ2lCLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFDcEM7UUFDQUYsSUFBSSxDQUFDZixTQUFTLENBQUNDLEdBQUcsQ0FBQyxXQUFXLENBQUM7TUFDakM7TUFFQSxLQUFLLElBQUlpQixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdOLFNBQVMsQ0FBQ08sZUFBZSxDQUFDQyxNQUFNLEVBQUVGLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDNUQsSUFDRU4sU0FBUyxDQUFDTyxlQUFlLENBQUNELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLeEQsSUFBSSxDQUFDQyxLQUFLLENBQUNLLENBQUMsR0FBRyxFQUFFLENBQUMsSUFDdEQ0QyxTQUFTLENBQUNPLGVBQWUsQ0FBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUtsRCxDQUFDLEdBQUcsRUFBRSxFQUMxQztVQUNBK0MsSUFBSSxDQUFDZixTQUFTLENBQUNDLEdBQUcsQ0FBQyxVQUFVLENBQUM7VUFFOUIsSUFBSSxPQUFPVyxTQUFTLENBQUMxQyxLQUFLLENBQUNSLElBQUksQ0FBQ0MsS0FBSyxDQUFDSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQ0EsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLFFBQVEsRUFBRTtZQUNuRStDLElBQUksQ0FBQ2YsU0FBUyxDQUFDQyxHQUFHLENBQUMsS0FBSyxDQUFDO1VBQzNCO1FBQ0Y7TUFDRjtNQUVBL0IsS0FBSyxDQUFDa0MsV0FBVyxDQUFDVyxJQUFJLENBQUM7SUFDekI7SUFFQSxPQUFPN0MsS0FBSztFQUNkLENBQUM7RUFFRG1ELFlBQVlBLENBQUNDLFdBQVcsRUFBRXBFLGFBQWEsRUFBRTRELFNBQVMsRUFBRTtJQUNsRCxNQUFNUyxlQUFlLEdBQUcvQyxHQUFHLENBQUNtQyxVQUFVLENBQUNXLFdBQVcsRUFBRSxRQUFRLEVBQUVSLFNBQVMsQ0FBQztJQUN4RSxNQUFNVSxpQkFBaUIsR0FBR2hELEdBQUcsQ0FBQ21DLFVBQVUsQ0FDdEN6RCxhQUFhLEVBQ2IsVUFBVSxFQUNWNEQsU0FDRixDQUFDO0lBRUQsTUFBTVcsZUFBZSxHQUFHNUMsUUFBUSxDQUFDNkMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUM7SUFDckVELGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQ3RCLFdBQVcsR0FBRyxFQUFFO0lBQ25Dc0IsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDdEIsV0FBVyxHQUFHLEVBQUU7SUFDbkNzQixlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUNyQixXQUFXLENBQUNtQixlQUFlLENBQUM7SUFDL0NFLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQ3JCLFdBQVcsQ0FBQ29CLGlCQUFpQixDQUFDO0VBQ25ELENBQUM7RUFFREcsVUFBVUEsQ0FBQ0MsUUFBUSxFQUFFQyxRQUFRLEVBQUU7SUFDN0IsTUFBTUMsU0FBUyxHQUFHakQsUUFBUSxDQUFDNkMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUM7SUFDN0RJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzNCLFdBQVcsR0FBR3lCLFFBQVE7SUFDbkNFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzNCLFdBQVcsR0FBRzBCLFFBQVE7RUFDckM7QUFDRixDQUFDO0FBRUQsaUVBQWVyRCxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7QUNoSVE7QUFFMUIsTUFBTXdELFNBQVMsQ0FBQztFQUNkQyxXQUFXQSxDQUFBLEVBQUc7SUFDWixJQUFJLENBQUMvRCxLQUFLLEdBQUcsRUFBRTtJQUNmLElBQUksQ0FBQ2lELGVBQWUsR0FBRyxFQUFFO0lBRXpCLEtBQUssSUFBSW5ELENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsSUFBSSxDQUFDLEVBQUU7TUFDOUIsTUFBTWtFLElBQUksR0FBRyxFQUFFO01BRWYsS0FBSyxJQUFJaEIsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLEVBQUUsRUFBRUEsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUM5QmdCLElBQUksQ0FBQzlELElBQUksQ0FBQyxPQUFPLENBQUM7TUFDcEI7TUFFQSxJQUFJLENBQUNGLEtBQUssQ0FBQ0UsSUFBSSxDQUFDOEQsSUFBSSxDQUFDO0lBQ3ZCO0VBQ0Y7RUFFQTdELFNBQVNBLENBQUNqQixJQUFJLEVBQUVlLFdBQVcsRUFBRTtJQUMzQixNQUFNZ0UsV0FBVyxHQUFHLElBQUlKLDZDQUFJLENBQUMzRSxJQUFJLEVBQUVlLFdBQVcsQ0FBQ2lELE1BQU0sQ0FBQztJQUV0RGpELFdBQVcsQ0FBQ2IsT0FBTyxDQUFFOEUsU0FBUyxJQUFLO01BQ2pDLElBQUksQ0FBQ2xFLEtBQUssQ0FBQ2tFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0QsV0FBVztJQUN0RCxDQUFDLENBQUM7RUFDSjtFQUVBRSxhQUFhQSxDQUFDRCxTQUFTLEVBQUU7SUFDdkIsSUFBSSxDQUFDakIsZUFBZSxDQUFDL0MsSUFBSSxDQUFDZ0UsU0FBUyxDQUFDO0lBQ3BDLE1BQU1yQixJQUFJLEdBQUcsSUFBSSxDQUFDN0MsS0FBSyxDQUFDa0UsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNBLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVuRCxJQUFJLE9BQU9yQixJQUFJLEtBQUssUUFBUSxFQUFFO01BQzVCQSxJQUFJLENBQUN1QixHQUFHLENBQUMsQ0FBQztJQUNaLENBQUMsTUFBTTtNQUNMLElBQUksQ0FBQ3BFLEtBQUssQ0FBQ2tFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNO0lBQ2pEO0VBQ0Y7RUFFQUcsT0FBT0EsQ0FBQSxFQUFHO0lBQ1IsS0FBSyxJQUFJdkUsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLEVBQUUsRUFBRUEsQ0FBQyxJQUFJLENBQUMsRUFBRTtNQUM5QixLQUFLLElBQUlrRCxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsRUFBRSxFQUFFQSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzlCLElBQ0UsT0FBTyxJQUFJLENBQUNoRCxLQUFLLENBQUNGLENBQUMsQ0FBQyxDQUFDa0QsQ0FBQyxDQUFDLEtBQUssUUFBUSxJQUNwQyxDQUFDLElBQUksQ0FBQ2hELEtBQUssQ0FBQ0YsQ0FBQyxDQUFDLENBQUNrRCxDQUFDLENBQUMsQ0FBQ3NCLE1BQU0sQ0FBQyxDQUFDLEVBQzFCO1VBQ0EsT0FBTyxLQUFLO1FBQ2Q7TUFDRjtJQUNGO0lBRUEsT0FBTyxJQUFJO0VBQ2I7RUFFQUMsaUJBQWlCQSxDQUFDTCxTQUFTLEVBQUU7SUFDM0IsS0FBSyxJQUFJcEUsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLElBQUksQ0FBQ21ELGVBQWUsQ0FBQ0MsTUFBTSxFQUFFcEQsQ0FBQyxJQUFJLENBQUMsRUFBRTtNQUN2RCxJQUNFLElBQUksQ0FBQ21ELGVBQWUsQ0FBQ25ELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLb0UsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUMzQyxJQUFJLENBQUNqQixlQUFlLENBQUNuRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBS29FLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFDM0M7UUFDQSxPQUFPLElBQUk7TUFDYjtJQUNGO0lBRUEsT0FBTyxLQUFLO0VBQ2Q7QUFDRjtBQUVBLGlFQUFlSixTQUFTOzs7Ozs7Ozs7Ozs7Ozs7QUNsRVk7QUFFcEMsTUFBTVUsTUFBTSxDQUFDO0VBQ1hULFdBQVdBLENBQUEsRUFBRztJQUNaLElBQUksQ0FBQ1gsV0FBVyxHQUFHLElBQUlVLGtEQUFTLENBQUMsQ0FBQztJQUNsQyxJQUFJLENBQUM5RSxhQUFhLEdBQUcsSUFBSThFLGtEQUFTLENBQUMsQ0FBQztFQUN0QztFQUVBVyxVQUFVQSxDQUFDUCxTQUFTLEVBQUU7SUFDcEIsSUFBSSxDQUFDbEYsYUFBYSxDQUFDbUYsYUFBYSxDQUFDRCxTQUFTLENBQUM7SUFDM0MsTUFBTXJCLElBQUksR0FBRyxJQUFJLENBQUM3RCxhQUFhLENBQUNnQixLQUFLLENBQUNrRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLElBQUlRLE9BQU8sR0FBRyxzQkFBc0I7SUFFcEMsSUFBSSxPQUFPN0IsSUFBSSxLQUFLLFFBQVEsRUFBRTtNQUM1QjZCLE9BQU8sR0FBRyxvQkFBb0I7TUFFOUIsSUFBSTdCLElBQUksQ0FBQ3lCLE1BQU0sQ0FBQyxDQUFDLEVBQUU7UUFDakJJLE9BQU8sR0FBSSxHQUFFQSxPQUFRLHlCQUF3QjdCLElBQUksQ0FBQzNELElBQUssR0FBRTtNQUMzRDtJQUNGO0lBRUEsT0FBT3dGLE9BQU87RUFDaEI7RUFFQUMsWUFBWUEsQ0FBQSxFQUFHO0lBQ2IsSUFBSWhGLEdBQUcsR0FBR0gsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDeEMsSUFBSVcsTUFBTSxHQUFHYixJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFDRSxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQyxJQUFJZ0YsT0FBTyxHQUFHLHNCQUFzQjtJQUNwQyxNQUFNN0IsSUFBSSxHQUFHLElBQUksQ0FBQ08sV0FBVyxDQUFDcEQsS0FBSyxDQUFDTCxHQUFHLENBQUMsQ0FBQ1UsTUFBTSxDQUFDO0lBRWhELE9BQU8sSUFBSSxDQUFDK0MsV0FBVyxDQUFDbUIsaUJBQWlCLENBQUMsQ0FBQzVFLEdBQUcsRUFBRVUsTUFBTSxDQUFDLENBQUMsRUFBRTtNQUN4RFYsR0FBRyxHQUFHSCxJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFDRSxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztNQUNwQ1csTUFBTSxHQUFHYixJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFDRSxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN6QztJQUVBLElBQUksQ0FBQzBELFdBQVcsQ0FBQ2UsYUFBYSxDQUFDLENBQUN4RSxHQUFHLEVBQUVVLE1BQU0sQ0FBQyxDQUFDO0lBRTdDLElBQUksT0FBT3dDLElBQUksS0FBSyxRQUFRLEVBQUU7TUFDNUI2QixPQUFPLEdBQUcsb0JBQW9CO01BRTlCLElBQUk3QixJQUFJLENBQUN5QixNQUFNLENBQUMsQ0FBQyxFQUFFO1FBQ2pCSSxPQUFPLEdBQUksR0FBRUEsT0FBUSx3QkFBdUI3QixJQUFJLENBQUMzRCxJQUFLLEdBQUU7TUFDMUQ7SUFDRjtJQUVBLE9BQU93RixPQUFPO0VBQ2hCO0FBQ0Y7QUFFQSxpRUFBZUYsTUFBTTs7Ozs7Ozs7Ozs7Ozs7O0FDakRHO0FBRXhCLE1BQU1JLGdCQUFnQixHQUFHO0VBQ3ZCckYsVUFBVSxFQUFFLEtBQUs7RUFFakJOLEtBQUssRUFBRSxDQUNMO0lBQUVDLElBQUksRUFBRSxTQUFTO0lBQUVDLElBQUksRUFBRSxDQUFDO0lBQUUwRixPQUFPLEVBQUU7RUFBTSxDQUFDLEVBQzVDO0lBQUUzRixJQUFJLEVBQUUsWUFBWTtJQUFFQyxJQUFJLEVBQUUsQ0FBQztJQUFFMEYsT0FBTyxFQUFFO0VBQU0sQ0FBQyxFQUMvQztJQUFFM0YsSUFBSSxFQUFFLFdBQVc7SUFBRUMsSUFBSSxFQUFFLENBQUM7SUFBRTBGLE9BQU8sRUFBRTtFQUFNLENBQUMsRUFDOUM7SUFBRTNGLElBQUksRUFBRSxXQUFXO0lBQUVDLElBQUksRUFBRSxDQUFDO0lBQUUwRixPQUFPLEVBQUU7RUFBTSxDQUFDLEVBQzlDO0lBQUUzRixJQUFJLEVBQUUsYUFBYTtJQUFFQyxJQUFJLEVBQUUsQ0FBQztJQUFFMEYsT0FBTyxFQUFFO0VBQU0sQ0FBQyxDQUNqRDtFQUVEQyxXQUFXQSxDQUFBLEVBQUc7SUFDWixNQUFNQyxXQUFXLEdBQUdwRSxRQUFRLENBQUNDLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFDcEQsTUFBTW9FLFlBQVksR0FBR3JFLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFNBQVMsQ0FBQztJQUN0RCxNQUFNcUUsUUFBUSxHQUFHdEUsUUFBUSxDQUFDQyxhQUFhLENBQUMsWUFBWSxDQUFDO0lBQ3JEb0UsWUFBWSxDQUFDeEMsTUFBTSxDQUFDLENBQUM7SUFDckJ5QyxRQUFRLENBQUN6QyxNQUFNLENBQUMsQ0FBQztJQUNqQnVDLFdBQVcsQ0FBQzlELEtBQUssQ0FBQ0MsT0FBTyxHQUFHLFFBQVE7RUFDdEMsQ0FBQztFQUVEZ0UsV0FBV0EsQ0FBQzFFLENBQUMsRUFBRTJFLE1BQU0sRUFBRTtJQUNyQjNFLENBQUMsQ0FBQ0MsY0FBYyxDQUFDLENBQUM7SUFDbEIsTUFBTTJFLElBQUksR0FBRzVFLENBQUMsQ0FBQzZFLFlBQVksQ0FBQ0MsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUMzQyxNQUFNQyxPQUFPLEdBQUc1RSxRQUFRLENBQUNDLGFBQWEsQ0FBRSxJQUFHd0UsSUFBSyxFQUFDLENBQUM7SUFDbEQsTUFBTWpHLElBQUksR0FBR29HLE9BQU8sQ0FBQ0MsaUJBQWlCO0lBQ3RDLE1BQU1DLElBQUksR0FBR2pGLENBQUMsQ0FBQ00sTUFBTSxDQUFDZ0IsU0FBUztJQUMvQixNQUFNO01BQUVlO0lBQUssQ0FBQyxHQUFHckMsQ0FBQyxDQUFDTSxNQUFNLENBQUNnQyxPQUFPO0lBRWpDLElBQ0csQ0FBQyxJQUFJLENBQUN2RCxVQUFVLElBQUtzRCxJQUFJLEdBQUcsRUFBRSxHQUFJMUQsSUFBSSxHQUFHLEVBQUUsSUFDM0MsSUFBSSxDQUFDSSxVQUFVLElBQUlDLElBQUksQ0FBQ0MsS0FBSyxDQUFDb0QsSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHMUQsSUFBSSxHQUFHLEVBQUcsSUFDdEQsQ0FBQ3NHLElBQUksQ0FBQzFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFDdEIwQyxJQUFJLENBQUMxQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQ3JCO01BQ0EwQyxJQUFJLENBQUNqRCxNQUFNLENBQUMsV0FBVyxDQUFDO01BQ3hCO0lBQ0Y7SUFFQSxNQUFNdkMsV0FBVyxHQUFHLEVBQUU7SUFFdEIsS0FBSyxJQUFJSCxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdYLElBQUksRUFBRVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtNQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDUCxVQUFVLEVBQUU7UUFDcEJVLFdBQVcsQ0FBQ0MsSUFBSSxDQUFDLENBQUNWLElBQUksQ0FBQ0MsS0FBSyxDQUFDb0QsSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFHQSxJQUFJLEdBQUcsRUFBRSxHQUFJL0MsQ0FBQyxDQUFDLENBQUM7TUFDNUQsQ0FBQyxNQUFNO1FBQ0xHLFdBQVcsQ0FBQ0MsSUFBSSxDQUFDLENBQUNWLElBQUksQ0FBQ0MsS0FBSyxDQUFDb0QsSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHL0MsQ0FBQyxFQUFFK0MsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDO01BQzFEO0lBQ0Y7SUFFQXNDLE1BQU0sQ0FBQy9CLFdBQVcsQ0FBQ2pELFNBQVMsQ0FBQ2lGLElBQUksRUFBRW5GLFdBQVcsQ0FBQztJQUMvQ3NGLE9BQU8sQ0FBQ3RELFdBQVcsR0FBRyxFQUFFO0lBQ3hCM0IsNENBQUcsQ0FBQzZDLFlBQVksQ0FBQ2dDLE1BQU0sQ0FBQy9CLFdBQVcsRUFBRStCLE1BQU0sQ0FBQ25HLGFBQWEsRUFBRSxjQUFjLENBQUM7SUFFMUUsTUFBTTBHLFFBQVEsR0FBR04sSUFBSSxLQUFLLGFBQWEsR0FBRyxhQUFhLEdBQUdBLElBQUk7SUFDOUQsTUFBTW5CLFdBQVcsR0FBRyxJQUFJLENBQUNoRixLQUFLLENBQUMwRyxJQUFJLENBQUV0RyxJQUFJLElBQUtBLElBQUksQ0FBQ0gsSUFBSSxLQUFLd0csUUFBUSxDQUFDO0lBQ3JFekIsV0FBVyxDQUFDWSxPQUFPLEdBQUcsSUFBSTtJQUUxQixLQUFLLElBQUkvRSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsSUFBSSxDQUFDYixLQUFLLENBQUNpRSxNQUFNLEVBQUVwRCxDQUFDLElBQUksQ0FBQyxFQUFFO01BQzdDLElBQUksQ0FBQyxJQUFJLENBQUNiLEtBQUssQ0FBQ2EsQ0FBQyxDQUFDLENBQUMrRSxPQUFPLEVBQUU7UUFDMUI7TUFDRjtJQUNGO0lBRUEsSUFBSSxDQUFDQyxXQUFXLENBQUMsQ0FBQztFQUNwQixDQUFDO0VBRURjLFdBQVdBLENBQUEsRUFBRztJQUNaLE1BQU1YLFFBQVEsR0FBR3RFLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFlBQVksQ0FBQztJQUVyRCxJQUFJLElBQUksQ0FBQ3JCLFVBQVUsRUFBRTtNQUNuQjBGLFFBQVEsQ0FBQ25ELFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQUNwQyxDQUFDLE1BQU07TUFDTGtELFFBQVEsQ0FBQ25ELFNBQVMsQ0FBQ1UsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUN2QztJQUVBLElBQUksSUFBSSxDQUFDakQsVUFBVSxFQUFFO01BQ25CLElBQUksQ0FBQ04sS0FBSyxDQUFDRyxPQUFPLENBQUVDLElBQUksSUFBSztRQUMzQixNQUFNcUcsUUFBUSxHQUFHL0UsUUFBUSxDQUFDUyxhQUFhLENBQUMsR0FBRyxDQUFDO1FBQzVDc0UsUUFBUSxDQUFDekQsV0FBVyxHQUFHNUMsSUFBSSxDQUFDSCxJQUFJO1FBQ2hDK0YsUUFBUSxDQUFDWSxNQUFNLENBQUNILFFBQVEsQ0FBQztNQUMzQixDQUFDLENBQUM7SUFDSjtJQUVBLElBQUksQ0FBQ3pHLEtBQUssQ0FBQ0csT0FBTyxDQUFFQyxJQUFJLElBQUs7TUFDM0IsTUFBTWtHLE9BQU8sR0FBRzVFLFFBQVEsQ0FBQ1MsYUFBYSxDQUFDLEtBQUssQ0FBQztNQUM3Q21FLE9BQU8sQ0FBQ3pELFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztNQUNqQyxNQUFNK0QsTUFBTSxHQUFHekcsSUFBSSxDQUFDSCxJQUFJLEtBQUssYUFBYSxHQUFHLGFBQWEsR0FBR0csSUFBSSxDQUFDSCxJQUFJO01BQ3RFcUcsT0FBTyxDQUFDdkQsWUFBWSxDQUFDLElBQUksRUFBRThELE1BQU0sQ0FBQztNQUNsQ1AsT0FBTyxDQUFDdkQsWUFBWSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUM7TUFFekMsSUFBSSxDQUFDM0MsSUFBSSxDQUFDd0YsT0FBTyxFQUFFO1FBQ2pCLEtBQUssSUFBSS9FLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR1QsSUFBSSxDQUFDRixJQUFJLEVBQUVXLENBQUMsSUFBSSxDQUFDLEVBQUU7VUFDckMsTUFBTStDLElBQUksR0FBR2xDLFFBQVEsQ0FBQ1MsYUFBYSxDQUFDLEtBQUssQ0FBQztVQUMxQ3lCLElBQUksQ0FBQ2YsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO1VBQzFCYyxJQUFJLENBQUNDLE9BQU8sQ0FBQ0QsSUFBSSxHQUFHL0MsQ0FBQztVQUNyQnlGLE9BQU8sQ0FBQ3JELFdBQVcsQ0FBQ1csSUFBSSxDQUFDO1FBQzNCO01BQ0Y7TUFFQSxJQUFJLENBQUMsSUFBSSxDQUFDdEQsVUFBVSxFQUFFO1FBQ3BCLE1BQU1tRyxRQUFRLEdBQUcvRSxRQUFRLENBQUNTLGFBQWEsQ0FBQyxHQUFHLENBQUM7UUFDNUNzRSxRQUFRLENBQUN6RCxXQUFXLEdBQUc1QyxJQUFJLENBQUNILElBQUk7UUFDaEMrRixRQUFRLENBQUNZLE1BQU0sQ0FBQ0gsUUFBUSxDQUFDO01BQzNCO01BRUFULFFBQVEsQ0FBQ1ksTUFBTSxDQUFDTixPQUFPLENBQUM7TUFFeEJBLE9BQU8sQ0FBQ1EsZ0JBQWdCLENBQUMsV0FBVyxFQUFHdkYsQ0FBQyxJQUFLO1FBQzNDQSxDQUFDLENBQUM2RSxZQUFZLENBQUNXLE9BQU8sQ0FBQyxNQUFNLEVBQUV4RixDQUFDLENBQUNNLE1BQU0sQ0FBQ21GLEVBQUUsQ0FBQztNQUM3QyxDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7RUFDSixDQUFDO0VBRURDLEtBQUtBLENBQUNmLE1BQU0sRUFBRTtJQUNaLE1BQU1oRSxVQUFVLEdBQUdSLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGNBQWMsQ0FBQztJQUN6RCxNQUFNZ0Isb0JBQW9CLEdBQUdqQixRQUFRLENBQUNDLGFBQWEsQ0FBQyxTQUFTLENBQUM7SUFDOUQsTUFBTW1FLFdBQVcsR0FBR3BFLFFBQVEsQ0FBQ1MsYUFBYSxDQUFDLFFBQVEsQ0FBQztJQUNwRCxNQUFNNkQsUUFBUSxHQUFHdEUsUUFBUSxDQUFDUyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQzlDLE1BQU00RCxZQUFZLEdBQUdyRSxRQUFRLENBQUNTLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFFckQyRCxXQUFXLENBQUM5QyxXQUFXLEdBQUcsT0FBTztJQUNqQytDLFlBQVksQ0FBQy9DLFdBQVcsR0FBRyxRQUFRO0lBQ25DOEMsV0FBVyxDQUFDakQsU0FBUyxDQUFDQyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQ2xDaUQsWUFBWSxDQUFDbEQsU0FBUyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO0lBQ3BDa0QsUUFBUSxDQUFDbkQsU0FBUyxDQUFDQyxHQUFHLENBQUMsV0FBVyxDQUFDO0lBQ25DZ0QsV0FBVyxDQUFDOUQsS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtJQUVsQ0MsVUFBVSxDQUFDZSxXQUFXLENBQUM2QyxXQUFXLENBQUM7SUFDbkM1RCxVQUFVLENBQUNlLFdBQVcsQ0FBQzhDLFlBQVksQ0FBQztJQUNwQzdELFVBQVUsQ0FBQzBFLE1BQU0sQ0FBQ1osUUFBUSxDQUFDO0lBRTNCRCxZQUFZLENBQUNlLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO01BQzNDLElBQUksQ0FBQ3hHLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQ0EsVUFBVTtNQUNsQzBGLFFBQVEsQ0FBQ2hELFdBQVcsR0FBRyxFQUFFO01BQ3pCLElBQUksQ0FBQzJELFdBQVcsQ0FBQyxDQUFDO0lBQ3BCLENBQUMsQ0FBQztJQUVGdEYsNENBQUcsQ0FBQzZDLFlBQVksQ0FBQ2dDLE1BQU0sQ0FBQy9CLFdBQVcsRUFBRStCLE1BQU0sQ0FBQ25HLGFBQWEsRUFBRSxjQUFjLENBQUM7SUFDMUUsSUFBSSxDQUFDNEcsV0FBVyxDQUFDLENBQUM7SUFFbEJoRSxvQkFBb0IsQ0FBQ21FLGdCQUFnQixDQUFDLFVBQVUsRUFBR3ZGLENBQUMsSUFBSztNQUN2REEsQ0FBQyxDQUFDQyxjQUFjLENBQUMsQ0FBQztNQUNsQkQsQ0FBQyxDQUFDTSxNQUFNLENBQUNnQixTQUFTLENBQUNDLEdBQUcsQ0FBQyxXQUFXLENBQUM7SUFDckMsQ0FBQyxDQUFDO0lBRUZILG9CQUFvQixDQUFDbUUsZ0JBQWdCLENBQUMsV0FBVyxFQUFHdkYsQ0FBQyxJQUFLO01BQ3hEQSxDQUFDLENBQUNDLGNBQWMsQ0FBQyxDQUFDO01BQ2xCRCxDQUFDLENBQUNNLE1BQU0sQ0FBQ2dCLFNBQVMsQ0FBQ1UsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUN4QyxDQUFDLENBQUM7SUFFRlosb0JBQW9CLENBQUNtRSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUd2RixDQUFDLElBQUs7TUFDbkQsSUFBSSxDQUFDMEUsV0FBVyxDQUFDMUUsQ0FBQyxFQUFFMkUsTUFBTSxDQUFDO0lBQzdCLENBQUMsQ0FBQztFQUNKO0FBQ0YsQ0FBQztBQUVELGlFQUFlUCxnQkFBZ0I7Ozs7Ozs7Ozs7Ozs7O0FDN0ovQixNQUFNZixJQUFJLENBQUM7RUFDVEUsV0FBV0EsQ0FBQzdFLElBQUksRUFBRWdFLE1BQU0sRUFBRTtJQUN4QixJQUFJLENBQUNoRSxJQUFJLEdBQUdBLElBQUk7SUFDaEIsSUFBSSxDQUFDZ0UsTUFBTSxHQUFHQSxNQUFNO0lBQ3BCLElBQUksQ0FBQ2lELFFBQVEsR0FBRyxDQUFDO0VBQ25CO0VBRUEvQixHQUFHQSxDQUFBLEVBQUc7SUFDSixJQUFJLENBQUMsSUFBSSxDQUFDRSxNQUFNLENBQUMsQ0FBQyxFQUFFO01BQ2xCLElBQUksQ0FBQzZCLFFBQVEsSUFBSSxDQUFDO0lBQ3BCO0VBQ0Y7RUFFQTdCLE1BQU1BLENBQUEsRUFBRztJQUNQLE9BQU8sSUFBSSxDQUFDNkIsUUFBUSxLQUFLLElBQUksQ0FBQ2pELE1BQU07RUFDdEM7QUFDRjtBQUVBLGlFQUFlVyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCbkI7QUFDMEc7QUFDakI7QUFDTztBQUNoRyw0Q0FBNEMsMklBQWtEO0FBQzlGLDRDQUE0QywrR0FBb0M7QUFDaEYsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRix5Q0FBeUMsc0ZBQStCO0FBQ3hFLHlDQUF5QyxzRkFBK0I7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsYUFBYSxtQ0FBbUM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsbUNBQW1DO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sZ0ZBQWdGLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssWUFBWSxXQUFXLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksT0FBTyxNQUFNLFlBQVksV0FBVyxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxzQ0FBc0MseUNBQXlDLHNEQUFzRCxLQUFLLGVBQWUsNkJBQTZCLG1CQUFtQixnREFBZ0QsS0FBSyxjQUFjLG9CQUFvQixvQkFBb0Isd0RBQXdELDRCQUE0QixnQkFBZ0IsS0FBSyxZQUFZLHVFQUF1RSxzQkFBc0IsS0FBSyxxQkFBcUIsb0JBQW9CLGlEQUFpRCxnQkFBZ0IsNEJBQTRCLEtBQUssZ0JBQWdCLHlCQUF5Qix3QkFBd0IseUJBQXlCLHNCQUFzQix5QkFBeUIsS0FBSyxzQkFBc0Isd0JBQXdCLG9CQUFvQiw0QkFBNEIsa0RBQWtELEtBQUssb0JBQW9CLG9CQUFvQiwrQ0FBK0MsMENBQTBDLDBCQUEwQiw0QkFBNEIsdUJBQXVCLHFCQUFxQixLQUFLLG1CQUFtQixvQkFBb0IscUJBQXFCLDZCQUE2Qiw4QkFBOEIsZUFBZSxzQkFBc0IsMEJBQTBCLEtBQUssbUJBQW1CLG9EQUFvRCxLQUFLLDZCQUE2QiwwQkFBMEIsMkJBQTJCLDZCQUE2QixLQUFLLHNCQUFzQixnQkFBZ0IsS0FBSyx1QkFBdUIsa0JBQWtCLHlCQUF5QixvQkFBb0IscURBQXFELG9DQUFvQyxxREFBcUQsd0JBQXdCLDBCQUEwQixLQUFLLGdCQUFnQixvQkFBb0IsOENBQThDLDJDQUEyQyxlQUFlLEtBQUssZUFBZSw4QkFBOEIsS0FBSyw4QkFBOEIsNkJBQTZCLG1CQUFtQixLQUFLLG1CQUFtQiwrQ0FBK0MsS0FBSyxjQUFjLGdDQUFnQyxLQUFLLG9CQUFvQixzQkFBc0IsS0FBSyx1QkFBdUI7QUFDNXpHO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7O0FDbkkxQjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBLHFGQUFxRjtBQUNyRjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixxQkFBcUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0ZBQXNGLHFCQUFxQjtBQUMzRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsaURBQWlELHFCQUFxQjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0RBQXNELHFCQUFxQjtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDcEZhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN6QmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQSxNQUErRjtBQUMvRixNQUFxRjtBQUNyRixNQUE0RjtBQUM1RixNQUErRztBQUMvRyxNQUF3RztBQUN4RyxNQUF3RztBQUN4RyxNQUFtRztBQUNuRztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHNGQUFPOzs7O0FBSTZDO0FBQ3JFLE9BQU8saUVBQWUsc0ZBQU8sSUFBSSxzRkFBTyxVQUFVLHNGQUFPLG1CQUFtQixFQUFDOzs7Ozs7Ozs7OztBQzFCaEU7O0FBRWI7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw2QkFBNkI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNuRmE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDakNhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ2JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDbEJBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7Ozs7V0NyQkE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBc0I7QUFDUTtBQUNOO0FBQzBCO0FBQ0k7QUFFdEQsSUFBSXNCLE1BQU07QUFDVixJQUFJaUIsVUFBVSxHQUFHLEtBQUs7QUFFdEIsU0FBUy9ELE9BQU9BLENBQUEsRUFBRztFQUNqQixJQUFJK0QsVUFBVSxFQUFFO0lBQ2Q7RUFDRjtFQUNBLElBQUlqQixNQUFNLENBQUNuRyxhQUFhLENBQUNxRixPQUFPLENBQUMsQ0FBQyxFQUFFO0lBQ2xDL0QsNENBQUcsQ0FBQ21ELFVBQVUsQ0FBQyw0QkFBNEIsQ0FBQztFQUM5QyxDQUFDLE1BQU07SUFDTG5ELDRDQUFHLENBQUNtRCxVQUFVLENBQUMsaUNBQWlDLENBQUM7RUFDbkQ7RUFFQW5ELDRDQUFHLENBQUM2QyxZQUFZLENBQUNnQyxNQUFNLENBQUMvQixXQUFXLEVBQUUrQixNQUFNLENBQUNuRyxhQUFhLEVBQUUsV0FBVyxDQUFDO0VBQ3ZFc0IsNENBQUcsQ0FBQytCLE9BQU8sQ0FBQyxDQUFDO0VBRWIsTUFBTUMsYUFBYSxHQUFHM0IsUUFBUSxDQUFDQyxhQUFhLENBQUMsV0FBVyxDQUFDO0VBQ3pEMEIsYUFBYSxDQUFDeUQsZ0JBQWdCLENBQUMsT0FBTyxFQUFFekYsNENBQUcsQ0FBQ2lDLFFBQVEsQ0FBQztBQUN2RDtBQUVBLFNBQVM4RCxTQUFTQSxDQUFDN0YsQ0FBQyxFQUFFO0VBQ3BCQSxDQUFDLENBQUM4Rix3QkFBd0IsQ0FBQyxDQUFDO0VBRTVCLElBQ0U5RixDQUFDLENBQUNNLE1BQU0sQ0FBQ2dCLFNBQVMsQ0FBQ2lCLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFDbkMsQ0FBQ3ZDLENBQUMsQ0FBQ00sTUFBTSxDQUFDZ0IsU0FBUyxDQUFDaUIsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUN4QztJQUNBLE1BQU07TUFBRUY7SUFBSyxDQUFDLEdBQUdyQyxDQUFDLENBQUNNLE1BQU0sQ0FBQ2dDLE9BQU87SUFDakMsTUFBTVksUUFBUSxHQUFHeUIsTUFBTSxDQUFDVixVQUFVLENBQUMsQ0FBQ2pGLElBQUksQ0FBQ0MsS0FBSyxDQUFDb0QsSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFFQSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDdEUsTUFBTWMsUUFBUSxHQUFHd0IsTUFBTSxDQUFDUixZQUFZLENBQUMsQ0FBQztJQUN0Q3JFLDRDQUFHLENBQUNtRCxVQUFVLENBQUNDLFFBQVEsRUFBRUMsUUFBUSxDQUFDO0lBQ2xDckQsNENBQUcsQ0FBQzZDLFlBQVksQ0FBQ2dDLE1BQU0sQ0FBQy9CLFdBQVcsRUFBRStCLE1BQU0sQ0FBQ25HLGFBQWEsRUFBRSxhQUFhLENBQUM7RUFDM0U7RUFDQSxJQUFJbUcsTUFBTSxDQUFDL0IsV0FBVyxDQUFDaUIsT0FBTyxDQUFDLENBQUMsSUFBSWMsTUFBTSxDQUFDbkcsYUFBYSxDQUFDcUYsT0FBTyxDQUFDLENBQUMsRUFBRTtJQUNsRWhDLE9BQU8sQ0FBQyxDQUFDO0lBQ1QrRCxVQUFVLEdBQUcsSUFBSTtFQUNuQjtBQUNGOztBQUVBO0FBQ0EsTUFBTTVGLENBQUMsR0FBRztFQUFFQyxjQUFjQSxDQUFBLEVBQUcsQ0FBQyxDQUFDO0VBQUVLLE1BQU0sRUFBRTtJQUFFQyxLQUFLQSxDQUFBLEVBQUcsQ0FBQztFQUFFO0FBQUUsQ0FBQztBQUN6RDtBQUNBb0UsTUFBTSxHQUFHLElBQUlYLCtDQUFNLENBQUMsQ0FBQztBQUNyQmxFLDRDQUFHLENBQUNDLFNBQVMsQ0FBQ0MsQ0FBQyxDQUFDO0FBQ2hCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQXpCLCtEQUFrQixDQUFDb0csTUFBTSxDQUFDL0IsV0FBVyxDQUFDO0FBQ3RDckUsK0RBQWtCLENBQUNvRyxNQUFNLENBQUNuRyxhQUFhLENBQUM7QUFDeENzQiw0Q0FBRyxDQUFDNkMsWUFBWSxDQUFDZ0MsTUFBTSxDQUFDL0IsV0FBVyxFQUFFK0IsTUFBTSxDQUFDbkcsYUFBYSxFQUFFLGFBQWEsQ0FBQztBQUN6RXNCLDRDQUFHLENBQUNtRCxVQUFVLENBQUMsa0JBQWtCLENBQUM7QUFDbEMsTUFBTThDLEtBQUssR0FBRzVGLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFFBQVEsQ0FBQztBQUM5QzJGLEtBQUssQ0FBQ1IsZ0JBQWdCLENBQUMsT0FBTyxFQUFFTSxTQUFTLENBQUM7QUFDMUM7QUFDQSxNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3Ly4vc3JjL2pzL2NvbXB1dGVyUGxhY2VTaGlwcy5qcyIsIndlYnBhY2s6Ly9uZXcvLi9zcmMvanMvZG9tLmpzIiwid2VicGFjazovL25ldy8uL3NyYy9qcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vc3JjL2pzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9uZXcvLi9zcmMvanMvcGxheWVyUGxhY2VTaGlwcy5qcyIsIndlYnBhY2s6Ly9uZXcvLi9zcmMvanMvc2hpcC5qcyIsIndlYnBhY2s6Ly9uZXcvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL25ldy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9uZXcvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9uZXcvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vbmV3Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL25ldy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL25ldy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9uZXcvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9uZXcvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9uZXcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25ldy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmV3L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmV3L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmV3L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV3L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL25ldy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9uZXcvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL25ldy8uL3NyYy9qcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjb21wdXRlclBsYWNlU2hpcHMoY29tcHV0ZXJCb2FyZCkge1xyXG4gIGNvbnN0IHNoaXBzID0gW1xyXG4gICAgeyBuYW1lOiAnQ2FycmllcicsIHNpemU6IDUgfSxcclxuICAgIHsgbmFtZTogJ0JhdHRsZXNoaXAnLCBzaXplOiA0IH0sXHJcbiAgICB7IG5hbWU6ICdEZXN0cm95ZXInLCBzaXplOiAzIH0sXHJcbiAgICB7IG5hbWU6ICdTdWJtYXJpbmUnLCBzaXplOiAzIH0sXHJcbiAgICB7IG5hbWU6ICdQYXRyb2wgQm9hdCcsIHNpemU6IDIgfSxcclxuICBdO1xyXG5cclxuICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICBsZXQga2VlcEdvaW5nID0gdHJ1ZTtcclxuXHJcbiAgICB3aGlsZSAoa2VlcEdvaW5nKSB7XHJcbiAgICAgIGNvbnN0IGlzVmVydGljYWwgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcclxuXHJcbiAgICAgIGlmIChpc1ZlcnRpY2FsID09PSAwKSB7XHJcbiAgICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgIGNvbnN0IGZpcnN0Q29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwIC0gc2hpcC5zaXplKSk7XHJcbiAgICAgICAgbGV0IGFsbEVtcHR5ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gc2hpcC5zaXplOyBpICs9IDEpIHtcclxuICAgICAgICAgIGNvbnN0IGN1cnJlbnRDZWxsID0gY29tcHV0ZXJCb2FyZC5ib2FyZFtyb3ddW2ZpcnN0Q29sdW1uICsgaV07XHJcblxyXG4gICAgICAgICAgaWYgKHR5cGVvZiBjdXJyZW50Q2VsbCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgYWxsRW1wdHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWxsRW1wdHkpIHtcclxuICAgICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gW107XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNpemU7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKFtyb3csIGZpcnN0Q29sdW1uICsgaV0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKHNoaXAubmFtZSwgY29vcmRpbmF0ZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAga2VlcEdvaW5nID0gIWFsbEVtcHR5O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGZpcnN0Um93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwIC0gc2hpcC5zaXplKSk7XHJcbiAgICAgICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgIGxldCBhbGxFbXB0eSA9IHRydWU7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHNoaXAuc2l6ZTsgaSArPSAxKSB7XHJcbiAgICAgICAgICBjb25zdCBjdXJyZW50Q2VsbCA9IGNvbXB1dGVyQm9hcmQuYm9hcmRbZmlyc3RSb3cgKyBpXVtjb2x1bW5dO1xyXG5cclxuICAgICAgICAgIGlmICh0eXBlb2YgY3VycmVudENlbGwgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGFsbEVtcHR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFsbEVtcHR5KSB7XHJcbiAgICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IFtdO1xyXG5cclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5zaXplOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChbZmlyc3RSb3cgKyBpLCBjb2x1bW5dKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChzaGlwLm5hbWUsIGNvb3JkaW5hdGVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGtlZXBHb2luZyA9ICFhbGxFbXB0eTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21wdXRlclBsYWNlU2hpcHM7XHJcbiIsImNvbnN0IGRvbSA9IHtcclxuICBzdGFydEdhbWUoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25hbWUnKTtcclxuICAgIGNvbnN0IG5hbWUgPSBuYW1lSW5wdXQudmFsdWU7XHJcbiAgICBlLnRhcmdldC5yZXNldCgpO1xyXG5cclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XHJcbiAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG4gICAgY29uc3QgbWVzc2FnZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgbWVzc2FnZVAxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgY29uc3QgbWVzc2FnZVAyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgY29uc3QgZ2FtZUNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IHBsYXllckNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IGVuZW15Q29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgcGxheWVyQ2FwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XHJcbiAgICBjb25zdCBlbmVteUNhcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xyXG4gICAgY29uc3QgcGxheWVyQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IGVuZW15Qm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICBtZXNzYWdlQm94LmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2UtYm94Jyk7XHJcbiAgICBnYW1lQ29udGVudC5jbGFzc0xpc3QuYWRkKCdnYW1lLWNvbnRlbnQnKTtcclxuICAgIHBsYXllckNvbnRlbnQuY2xhc3NMaXN0LmFkZCgncGxheWVyLWNvbnRlbnQnKTtcclxuICAgIGVuZW15Q29udGVudC5jbGFzc0xpc3QuYWRkKCdwbGF5ZXItY29udGVudCcpO1xyXG4gICAgcGxheWVyQ2FwdGlvbi5jbGFzc0xpc3QuYWRkKCdjYXB0aW9uJyk7XHJcbiAgICBlbmVteUNhcHRpb24uY2xhc3NMaXN0LmFkZCgnY2FwdGlvbicpO1xyXG4gICAgcGxheWVyQm9hcmRDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdib2FyZC1jb250YWluZXInKTtcclxuICAgIHBsYXllckJvYXJkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAncGxheWVyJyk7XHJcbiAgICBlbmVteUJvYXJkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYm9hcmQtY29udGFpbmVyJyk7XHJcbiAgICBlbmVteUJvYXJkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnZW5lbXknKTtcclxuXHJcbiAgICBwbGF5ZXJDYXB0aW9uLnRleHRDb250ZW50ID0gbmFtZSA/IGAke25hbWV9J3MgRmxlZXRgIDogXCJQbGF5ZXIncyBGbGVldFwiO1xyXG4gICAgZW5lbXlDYXB0aW9uLnRleHRDb250ZW50ID0gYEVuZW15IEZsZWV0YDtcclxuXHJcbiAgICBtZXNzYWdlQm94LmFwcGVuZENoaWxkKG1lc3NhZ2VQMSk7XHJcbiAgICBtZXNzYWdlQm94LmFwcGVuZENoaWxkKG1lc3NhZ2VQMik7XHJcbiAgICBwbGF5ZXJDb250ZW50LmFwcGVuZENoaWxkKHBsYXllckNhcHRpb24pO1xyXG4gICAgcGxheWVyQ29udGVudC5hcHBlbmRDaGlsZChwbGF5ZXJCb2FyZENvbnRhaW5lcik7XHJcbiAgICBlbmVteUNvbnRlbnQuYXBwZW5kQ2hpbGQoZW5lbXlDYXB0aW9uKTtcclxuICAgIGVuZW15Q29udGVudC5hcHBlbmRDaGlsZChlbmVteUJvYXJkQ29udGFpbmVyKTtcclxuICAgIGdhbWVDb250ZW50LmFwcGVuZENoaWxkKHBsYXllckNvbnRlbnQpO1xyXG4gICAgZ2FtZUNvbnRlbnQuYXBwZW5kQ2hpbGQoZW5lbXlDb250ZW50KTtcclxuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKG1lc3NhZ2VCb3gsIGZvcm0pO1xyXG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUoZ2FtZUNvbnRlbnQsIG1lc3NhZ2VCb3gpO1xyXG4gIH0sXHJcblxyXG4gIGVuZEdhbWUoKSB7XHJcbiAgICBjb25zdCBtZXNzYWdlQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2UtYm94Jyk7XHJcbiAgICBjb25zdCBuZXdHYW1lQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBuZXdHYW1lQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ25ldy1nYW1lJyk7XHJcbiAgICBuZXdHYW1lQnV0dG9uLnRleHRDb250ZW50ID0gJ05ldyBHYW1lJztcclxuICAgIG1lc3NhZ2VCb3guYXBwZW5kQ2hpbGQobmV3R2FtZUJ1dHRvbik7XHJcbiAgfSxcclxuXHJcbiAgb3BlbkZvcm0oKSB7XHJcbiAgICBjb25zdCBtZXNzYWdlQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2UtYm94Jyk7XHJcbiAgICBjb25zdCBnYW1lQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLWNvbnRlbnQnKTtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XHJcbiAgICBtZXNzYWdlQm94LnJlbW92ZSgpO1xyXG4gICAgZ2FtZUNvbnRlbnQucmVtb3ZlKCk7XHJcbiAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gIH0sXHJcblxyXG4gIGJ1aWxkQm9hcmQoZ2FtZWJvYXJkLCB0eXBlLCBjb25kaXRpb24pIHtcclxuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBib2FyZC5jbGFzc0xpc3QuYWRkKCdib2FyZCcpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpICs9IDEpIHtcclxuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcclxuICAgICAgY2VsbC5kYXRhc2V0LmNlbGwgPSBpO1xyXG5cclxuICAgICAgaWYgKFxyXG4gICAgICAgIHR5cGVvZiBnYW1lYm9hcmQuYm9hcmRbTWF0aC5mbG9vcihpIC8gMTApXVtpICUgMTBdID09PSAnb2JqZWN0JyAmJlxyXG4gICAgICAgICh0eXBlID09PSAncGxheWVyJyB8fCBjb25kaXRpb24gPT09ICdnYW1lIG92ZXInKVxyXG4gICAgICApIHtcclxuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdHlwZSA9PT0gJ2NvbXB1dGVyJyAmJlxyXG4gICAgICAgIGNvbmRpdGlvbiA9PT0gJ25vcm1hbCBwbGF5JyAmJlxyXG4gICAgICAgICFjZWxsLmNsYXNzTGlzdC5jb250YWlucygnYXR0YWNrZWQnKVxyXG4gICAgICApIHtcclxuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NsaWNrYWJsZScpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdhbWVib2FyZC5wcmV2aW91c0F0dGFja3MubGVuZ3RoOyBqICs9IDEpIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBnYW1lYm9hcmQucHJldmlvdXNBdHRhY2tzW2pdWzBdID09PSBNYXRoLmZsb29yKGkgLyAxMCkgJiZcclxuICAgICAgICAgIGdhbWVib2FyZC5wcmV2aW91c0F0dGFja3Nbal1bMV0gPT09IGkgJSAxMFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdhdHRhY2tlZCcpO1xyXG5cclxuICAgICAgICAgIGlmICh0eXBlb2YgZ2FtZWJvYXJkLmJvYXJkW01hdGguZmxvb3IoaSAvIDEwKV1baSAlIDEwXSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGNlbGwpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBib2FyZDtcclxuICB9LFxyXG5cclxuICBhcHBlbmRCb2FyZHMocGxheWVyQm9hcmQsIGNvbXB1dGVyQm9hcmQsIGNvbmRpdGlvbikge1xyXG4gICAgY29uc3QgcGxheWVyQm9hcmROb2RlID0gZG9tLmJ1aWxkQm9hcmQocGxheWVyQm9hcmQsICdwbGF5ZXInLCBjb25kaXRpb24pO1xyXG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZE5vZGUgPSBkb20uYnVpbGRCb2FyZChcclxuICAgICAgY29tcHV0ZXJCb2FyZCxcclxuICAgICAgJ2NvbXB1dGVyJyxcclxuICAgICAgY29uZGl0aW9uLFxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBib2FyZENvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm9hcmQtY29udGFpbmVyJyk7XHJcbiAgICBib2FyZENvbnRhaW5lcnNbMF0udGV4dENvbnRlbnQgPSAnJztcclxuICAgIGJvYXJkQ29udGFpbmVyc1sxXS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgYm9hcmRDb250YWluZXJzWzBdLmFwcGVuZENoaWxkKHBsYXllckJvYXJkTm9kZSk7XHJcbiAgICBib2FyZENvbnRhaW5lcnNbMV0uYXBwZW5kQ2hpbGQoY29tcHV0ZXJCb2FyZE5vZGUpO1xyXG4gIH0sXHJcblxyXG4gIG5ld01lc3NhZ2UobWVzc2FnZTEsIG1lc3NhZ2UyKSB7XHJcbiAgICBjb25zdCBtZXNzYWdlUHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVzc2FnZS1ib3ggcCcpO1xyXG4gICAgbWVzc2FnZVBzWzBdLnRleHRDb250ZW50ID0gbWVzc2FnZTE7XHJcbiAgICBtZXNzYWdlUHNbMV0udGV4dENvbnRlbnQgPSBtZXNzYWdlMjtcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZG9tO1xyXG4iLCJpbXBvcnQgU2hpcCBmcm9tICcuL3NoaXAnO1xyXG5cclxuY2xhc3MgR2FtZWJvYXJkIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuYm9hcmQgPSBbXTtcclxuICAgIHRoaXMucHJldmlvdXNBdHRhY2tzID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XHJcbiAgICAgIGNvbnN0IHRlbXAgPSBbXTtcclxuXHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xyXG4gICAgICAgIHRlbXAucHVzaCgnZW1wdHknKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5ib2FyZC5wdXNoKHRlbXApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGxhY2VTaGlwKG5hbWUsIGNvb3JkaW5hdGVzKSB7XHJcbiAgICBjb25zdCBjdXJyZW50U2hpcCA9IG5ldyBTaGlwKG5hbWUsIGNvb3JkaW5hdGVzLmxlbmd0aCk7XHJcblxyXG4gICAgY29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmRQYWlyKSA9PiB7XHJcbiAgICAgIHRoaXMuYm9hcmRbY29vcmRQYWlyWzBdXVtjb29yZFBhaXJbMV1dID0gY3VycmVudFNoaXA7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlY2VpdmVBdHRhY2soY29vcmRQYWlyKSB7XHJcbiAgICB0aGlzLnByZXZpb3VzQXR0YWNrcy5wdXNoKGNvb3JkUGFpcik7XHJcbiAgICBjb25zdCBjZWxsID0gdGhpcy5ib2FyZFtjb29yZFBhaXJbMF1dW2Nvb3JkUGFpclsxXV07XHJcblxyXG4gICAgaWYgKHR5cGVvZiBjZWxsID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBjZWxsLmhpdCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5ib2FyZFtjb29yZFBhaXJbMF1dW2Nvb3JkUGFpclsxXV0gPSAnbWlzcyc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhbGxTdW5rKCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHR5cGVvZiB0aGlzLmJvYXJkW2ldW2pdID09PSAnb2JqZWN0JyAmJlxyXG4gICAgICAgICAgIXRoaXMuYm9hcmRbaV1bal0uaXNTdW5rKClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGluUHJldmlvdXNBdHRhY2tzKGNvb3JkUGFpcikge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByZXZpb3VzQXR0YWNrcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGhpcy5wcmV2aW91c0F0dGFja3NbaV1bMF0gPT09IGNvb3JkUGFpclswXSAmJlxyXG4gICAgICAgIHRoaXMucHJldmlvdXNBdHRhY2tzW2ldWzFdID09PSBjb29yZFBhaXJbMV1cclxuICAgICAgKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XHJcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnO1xyXG5cclxuY2xhc3MgUGxheWVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucGxheWVyQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XHJcbiAgICB0aGlzLmNvbXB1dGVyQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XHJcbiAgfVxyXG5cclxuICBwbGF5ZXJNb3ZlKGNvb3JkUGFpcikge1xyXG4gICAgdGhpcy5jb21wdXRlckJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRQYWlyKTtcclxuICAgIGNvbnN0IGNlbGwgPSB0aGlzLmNvbXB1dGVyQm9hcmQuYm9hcmRbY29vcmRQYWlyWzBdXVtjb29yZFBhaXJbMV1dO1xyXG4gICAgbGV0IG1lc3NhZ2UgPSAnWW91IG1pc3NlZCB0aGUgZW5lbXknO1xyXG5cclxuICAgIGlmICh0eXBlb2YgY2VsbCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgbWVzc2FnZSA9ICdZb3UgaGl0IHRoZSBlbmVteSEnO1xyXG5cclxuICAgICAgaWYgKGNlbGwuaXNTdW5rKCkpIHtcclxuICAgICAgICBtZXNzYWdlID0gYCR7bWVzc2FnZX0gWW91IHN1bmsgdGhlIGVuZW15J3MgJHtjZWxsLm5hbWV9IWA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWVzc2FnZTtcclxuICB9XHJcblxyXG4gIGNvbXB1dGVyTW92ZSgpIHtcclxuICAgIGxldCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICBsZXQgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgbGV0IG1lc3NhZ2UgPSAnVGhlIGVuZW15IG1pc3NlZCB5b3UnO1xyXG4gICAgY29uc3QgY2VsbCA9IHRoaXMucGxheWVyQm9hcmQuYm9hcmRbcm93XVtjb2x1bW5dO1xyXG5cclxuICAgIHdoaWxlICh0aGlzLnBsYXllckJvYXJkLmluUHJldmlvdXNBdHRhY2tzKFtyb3csIGNvbHVtbl0pKSB7XHJcbiAgICAgIHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucGxheWVyQm9hcmQucmVjZWl2ZUF0dGFjayhbcm93LCBjb2x1bW5dKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIGNlbGwgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIG1lc3NhZ2UgPSAnVGhlIGVuZW15IGhpdCB5b3UhJztcclxuXHJcbiAgICAgIGlmIChjZWxsLmlzU3VuaygpKSB7XHJcbiAgICAgICAgbWVzc2FnZSA9IGAke21lc3NhZ2V9IFRoZSBlbmVteSBzdW5rIHlvdXIgJHtjZWxsLm5hbWV9IWA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWVzc2FnZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcclxuIiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XHJcblxyXG5jb25zdCBwbGF5ZXJQbGFjZVNoaXBzID0ge1xyXG4gIGlzVmVydGljYWw6IGZhbHNlLFxyXG5cclxuICBzaGlwczogW1xyXG4gICAgeyBuYW1lOiAnQ2FycmllcicsIHNpemU6IDUsIGluRmxlZXQ6IGZhbHNlIH0sXHJcbiAgICB7IG5hbWU6ICdCYXR0bGVzaGlwJywgc2l6ZTogNCwgaW5GbGVldDogZmFsc2UgfSxcclxuICAgIHsgbmFtZTogJ0Rlc3Ryb3llcicsIHNpemU6IDMsIGluRmxlZXQ6IGZhbHNlIH0sXHJcbiAgICB7IG5hbWU6ICdTdWJtYXJpbmUnLCBzaXplOiAzLCBpbkZsZWV0OiBmYWxzZSB9LFxyXG4gICAgeyBuYW1lOiAnUGF0cm9sIEJvYXQnLCBzaXplOiAyLCBpbkZsZWV0OiBmYWxzZSB9LFxyXG4gIF0sXHJcblxyXG4gIHNoaXBzUGxhY2VkKCkge1xyXG4gICAgY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnQnKVxyXG4gICAgY29uc3Qgcm90YXRlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvdGF0ZScpO1xyXG4gICAgY29uc3QgYWxsU2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxsLXNoaXBzJyk7XHJcbiAgICByb3RhdGVCdXR0b24ucmVtb3ZlKCk7XHJcbiAgICBhbGxTaGlwcy5yZW1vdmUoKTtcclxuICAgIHN0YXJ0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcclxuICB9LFxyXG5cclxuICBkcm9wSGFuZGxlcihlLCBwbGF5ZXIpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IGRhdGEgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0Jyk7XHJcbiAgICBjb25zdCBzaGlwRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7ZGF0YX1gKTtcclxuICAgIGNvbnN0IHNpemUgPSBzaGlwRGl2LmNoaWxkRWxlbWVudENvdW50O1xyXG4gICAgY29uc3QgbGlzdCA9IGUudGFyZ2V0LmNsYXNzTGlzdDtcclxuICAgIGNvbnN0IHsgY2VsbCB9ID0gZS50YXJnZXQuZGF0YXNldDtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgICghdGhpcy5pc1ZlcnRpY2FsICYmIChjZWxsICUgMTApICsgc2l6ZSA+IDEwKSB8fFxyXG4gICAgICAodGhpcy5pc1ZlcnRpY2FsICYmIE1hdGguZmxvb3IoY2VsbCAvIDEwKSArIHNpemUgPiAxMCkgfHxcclxuICAgICAgIWxpc3QuY29udGFpbnMoJ2NlbGwnKSB8fFxyXG4gICAgICBsaXN0LmNvbnRhaW5zKCdzaGlwJylcclxuICAgICkge1xyXG4gICAgICBsaXN0LnJlbW92ZSgndGVtcC1zaGlwJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSArPSAxKSB7XHJcbiAgICAgIGlmICghdGhpcy5pc1ZlcnRpY2FsKSB7XHJcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaChbTWF0aC5mbG9vcihjZWxsIC8gMTApLCAoY2VsbCAlIDEwKSArIGldKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb29yZGluYXRlcy5wdXNoKFtNYXRoLmZsb29yKGNlbGwgLyAxMCkgKyBpLCBjZWxsICUgMTBdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBsYXllci5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoZGF0YSwgY29vcmRpbmF0ZXMpO1xyXG4gICAgc2hpcERpdi50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgZG9tLmFwcGVuZEJvYXJkcyhwbGF5ZXIucGxheWVyQm9hcmQsIHBsYXllci5jb21wdXRlckJvYXJkLCAnc2hpcCBwbGFjaW5nJyk7XHJcblxyXG4gICAgY29uc3Qgc2hpcE5hbWUgPSBkYXRhID09PSAnUGF0cm9sLUJvYXQnID8gJ1BhdHJvbCBCb2F0JyA6IGRhdGE7XHJcbiAgICBjb25zdCBjdXJyZW50U2hpcCA9IHRoaXMuc2hpcHMuZmluZCgoc2hpcCkgPT4gc2hpcC5uYW1lID09PSBzaGlwTmFtZSk7XHJcbiAgICBjdXJyZW50U2hpcC5pbkZsZWV0ID0gdHJ1ZTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2hpcHMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgaWYgKCF0aGlzLnNoaXBzW2ldLmluRmxlZXQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNoaXBzUGxhY2VkKCk7XHJcbiAgfSxcclxuXHJcbiAgY3JlYXRlU2hpcHMoKSB7XHJcbiAgICBjb25zdCBhbGxTaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGwtc2hpcHMnKTtcclxuXHJcbiAgICBpZiAodGhpcy5pc1ZlcnRpY2FsKSB7XHJcbiAgICAgIGFsbFNoaXBzLmNsYXNzTGlzdC5hZGQoJ3ZlcnRpY2FsJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGxTaGlwcy5jbGFzc0xpc3QucmVtb3ZlKCd2ZXJ0aWNhbCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmlzVmVydGljYWwpIHtcclxuICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2hpcE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgc2hpcE5hbWUudGV4dENvbnRlbnQgPSBzaGlwLm5hbWU7XHJcbiAgICAgICAgYWxsU2hpcHMuYXBwZW5kKHNoaXBOYW1lKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNoaXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgc2hpcERpdi5jbGFzc0xpc3QuYWRkKCdzaGlwLWRpdicpO1xyXG4gICAgICBjb25zdCBpZE5hbWUgPSBzaGlwLm5hbWUgPT09ICdQYXRyb2wgQm9hdCcgPyAnUGF0cm9sLUJvYXQnIDogc2hpcC5uYW1lO1xyXG4gICAgICBzaGlwRGl2LnNldEF0dHJpYnV0ZSgnaWQnLCBpZE5hbWUpO1xyXG4gICAgICBzaGlwRGl2LnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ3RydWUnKTtcclxuXHJcbiAgICAgIGlmICghc2hpcC5pbkZsZWV0KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNpemU7IGkgKz0gMSkge1xyXG4gICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XHJcbiAgICAgICAgICBjZWxsLmRhdGFzZXQuY2VsbCA9IGk7XHJcbiAgICAgICAgICBzaGlwRGl2LmFwcGVuZENoaWxkKGNlbGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCF0aGlzLmlzVmVydGljYWwpIHtcclxuICAgICAgICBjb25zdCBzaGlwTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBzaGlwTmFtZS50ZXh0Q29udGVudCA9IHNoaXAubmFtZTtcclxuICAgICAgICBhbGxTaGlwcy5hcHBlbmQoc2hpcE5hbWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBhbGxTaGlwcy5hcHBlbmQoc2hpcERpdik7XHJcblxyXG4gICAgICBzaGlwRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIChlKSA9PiB7XHJcbiAgICAgICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dCcsIGUudGFyZ2V0LmlkKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9LFxyXG5cclxuICBwbGFjZShwbGF5ZXIpIHtcclxuICAgIGNvbnN0IG1lc3NhZ2VCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZS1ib3gnKTtcclxuICAgIGNvbnN0IHBsYXllckJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllcicpO1xyXG4gICAgY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGNvbnN0IGFsbFNoaXBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb25zdCByb3RhdGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgICBzdGFydEJ1dHRvbi50ZXh0Q29udGVudCA9ICdTdGFydCc7XHJcbiAgICByb3RhdGVCdXR0b24udGV4dENvbnRlbnQgPSAnUm90YXRlJztcclxuICAgIHN0YXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3N0YXJ0JylcclxuICAgIHJvdGF0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdyb3RhdGUnKVxyXG4gICAgYWxsU2hpcHMuY2xhc3NMaXN0LmFkZCgnYWxsLXNoaXBzJyk7XHJcbiAgICBzdGFydEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgIG1lc3NhZ2VCb3guYXBwZW5kQ2hpbGQoc3RhcnRCdXR0b24pO1xyXG4gICAgbWVzc2FnZUJveC5hcHBlbmRDaGlsZChyb3RhdGVCdXR0b24pO1xyXG4gICAgbWVzc2FnZUJveC5hcHBlbmQoYWxsU2hpcHMpO1xyXG5cclxuICAgIHJvdGF0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgdGhpcy5pc1ZlcnRpY2FsID0gIXRoaXMuaXNWZXJ0aWNhbDtcclxuICAgICAgYWxsU2hpcHMudGV4dENvbnRlbnQgPSAnJztcclxuICAgICAgdGhpcy5jcmVhdGVTaGlwcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZG9tLmFwcGVuZEJvYXJkcyhwbGF5ZXIucGxheWVyQm9hcmQsIHBsYXllci5jb21wdXRlckJvYXJkLCAnc2hpcCBwbGFjaW5nJyk7XHJcbiAgICB0aGlzLmNyZWF0ZVNoaXBzKCk7XHJcblxyXG4gICAgcGxheWVyQm9hcmRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCAoZSkgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3RlbXAtc2hpcCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcGxheWVyQm9hcmRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCd0ZW1wLXNoaXAnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHBsYXllckJvYXJkQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCAoZSkgPT4ge1xyXG4gICAgICB0aGlzLmRyb3BIYW5kbGVyKGUsIHBsYXllcik7XHJcbiAgICB9KTtcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGxheWVyUGxhY2VTaGlwcztcclxuIiwiY2xhc3MgU2hpcCB7XHJcbiAgY29uc3RydWN0b3IobmFtZSwgbGVuZ3RoKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lXHJcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgIHRoaXMudGltZXNIaXQgPSAwO1xyXG4gIH1cclxuXHJcbiAgaGl0KCkge1xyXG4gICAgaWYgKCF0aGlzLmlzU3VuaygpKSB7XHJcbiAgICAgIHRoaXMudGltZXNIaXQgKz0gMTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzU3VuaygpIHtcclxuICAgIHJldHVybiB0aGlzLnRpbWVzSGl0ID09PSB0aGlzLmxlbmd0aDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNoaXA7XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2ZvbnRzL0lUQyBNYWNoaW5lIFJlZ3VsYXIub3RmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi9pbWcvYWxwaGEteC5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBAZm9udC1mYWNlIHtcclxuICBmb250LWZhbWlseTogJ0lUQyBNYWNoaW5lIFJlZ3VsYXInO1xyXG4gIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xyXG59XHJcblxyXG46cm9vdCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogbmF2eTtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XHJcbn1cclxuXHJcbmJvZHkge1xyXG4gIGhlaWdodDogMTAwdmg7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IG1heC1jb250ZW50IDIwMHB4O1xyXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDMwcHg7XHJcbn1cclxuXHJcbmgxIHtcclxuICBmb250LWZhbWlseTogJ0lUQyBNYWNoaW5lIFJlZ3VsYXInLCBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xyXG4gIGZvbnQtc2l6ZTogNHJlbTtcclxufVxyXG5cclxuLmVudGVyLW5hbWUge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMywgbWF4LWNvbnRlbnQpO1xyXG4gIGdhcDogMTBweDtcclxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbmJ1dHRvbiB7XHJcbiAgd2lkdGg6IG1heC1jb250ZW50O1xyXG4gIHBhZGRpbmc6IDVweCAxMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xyXG59XHJcblxyXG4ubWVzc2FnZS1ib3gge1xyXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xyXG4gIGdyaWQtdGVtcGxhdGUtcm93czogbWF4LWNvbnRlbnQgbWF4LWNvbnRlbnQ7XHJcbn1cclxuXHJcbi5hbGwtc2hpcHMge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtYXgtY29udGVudCAyMDBweDtcclxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg1LCA1MHB4KTtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxuICBjb2x1bW4tZ2FwOiAzMHB4O1xyXG4gIG1hcmdpbjogMjBweCAwO1xyXG59XHJcblxyXG4uc2hpcC1kaXYge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgbWFyZ2luOiAxMHB4IDA7XHJcbiAgZ3JpZC1hdXRvLWZsb3c6IGNvbHVtbjtcclxuICBncmlkLWF1dG8tY29sdW1uczogMzBweDtcclxuICBnYXA6IDFweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAganVzdGlmeS1zZWxmOiBzdGFydDtcclxufVxyXG5cclxuLnZlcnRpY2FsIHtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCBtYXgtY29udGVudCk7XHJcbn1cclxuXHJcbi52ZXJ0aWNhbCAuc2hpcC1kaXYge1xyXG4gIGdyaWQtYXV0by1mbG93OiByb3c7XHJcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XHJcbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcclxufVxyXG5cclxuLmFsbC1zaGlwcyBwIHtcclxuICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbi5nYW1lLWNvbnRlbnQge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWF4LWNvbnRlbnQgbWF4LWNvbnRlbnQ7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XHJcbiAgZm9udC1mYW1pbHk6ICdJVEMgTWFjaGluZSBSZWd1bGFyJywgc2Fucy1zZXJpZjtcclxuICBmb250LXNpemU6IDEuNXJlbTtcclxuICBsZXR0ZXItc3BhY2luZzogMnB4O1xyXG59XHJcblxyXG4uYm9hcmQge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xyXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAzMHB4KTtcclxuICBnYXA6IDFweDtcclxufVxyXG5cclxuLmNlbGwge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4uc2hpcCxcclxuLnRlbXAtc2hpcCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcclxuICBoZWlnaHQ6IDMwcHg7XHJcbn1cclxuXHJcbi5hdHRhY2tlZCB7XHJcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fX30pO1xyXG59XHJcblxyXG4uaGl0IHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY2MTYxO1xyXG59XHJcblxyXG4uY2xpY2thYmxlIHtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usa0NBQWtDO0VBQ2xDLDRDQUE2QztBQUMvQzs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixZQUFZO0VBQ1oseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGFBQWE7RUFDYixpREFBaUQ7RUFDakQscUJBQXFCO0VBQ3JCLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGdFQUFnRTtFQUNoRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDBDQUEwQztFQUMxQyxTQUFTO0VBQ1QscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixhQUFhO0VBQ2IscUJBQXFCO0VBQ3JCLDJDQUEyQztBQUM3Qzs7QUFFQTtFQUNFLGFBQWE7RUFDYix3Q0FBd0M7RUFDeEMsbUNBQW1DO0VBQ25DLG1CQUFtQjtFQUNuQixxQkFBcUI7RUFDckIsZ0JBQWdCO0VBQ2hCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsY0FBYztFQUNkLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsUUFBUTtFQUNSLGVBQWU7RUFDZixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSw2Q0FBNkM7QUFDL0M7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsb0JBQW9CO0VBQ3BCLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLDhDQUE4QztFQUM5Qyw2QkFBNkI7RUFDN0IsOENBQThDO0VBQzlDLGlCQUFpQjtFQUNqQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUNBQXVDO0VBQ3ZDLG9DQUFvQztFQUNwQyxRQUFRO0FBQ1Y7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7O0VBRUUsc0JBQXNCO0VBQ3RCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLHlEQUF3QztBQUMxQzs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGVBQWU7QUFDakJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZSB7XFxyXFxuICBmb250LWZhbWlseTogJ0lUQyBNYWNoaW5lIFJlZ3VsYXInO1xcclxcbiAgc3JjOiB1cmwoJy4vZm9udHMvSVRDXFxcXCBNYWNoaW5lXFxcXCBSZWd1bGFyLm90ZicpO1xcclxcbn1cXHJcXG5cXHJcXG46cm9vdCB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBuYXZ5O1xcclxcbiAgY29sb3I6IHdoaXRlO1xcclxcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgaGVpZ2h0OiAxMDB2aDtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IG1heC1jb250ZW50IDIwMHB4O1xcclxcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcclxcbiAgZ2FwOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG5oMSB7XFxyXFxuICBmb250LWZhbWlseTogJ0lUQyBNYWNoaW5lIFJlZ3VsYXInLCBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcclxcbiAgZm9udC1zaXplOiA0cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4uZW50ZXItbmFtZSB7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMywgbWF4LWNvbnRlbnQpO1xcclxcbiAgZ2FwOiAxMHB4O1xcclxcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG5idXR0b24ge1xcclxcbiAgd2lkdGg6IG1heC1jb250ZW50O1xcclxcbiAgcGFkZGluZzogNXB4IDEwcHg7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5tZXNzYWdlLWJveCB7XFxyXFxuICBmb250LXNpemU6IDEuNXJlbTtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IG1heC1jb250ZW50O1xcclxcbn1cXHJcXG5cXHJcXG4uYWxsLXNoaXBzIHtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1heC1jb250ZW50IDIwMHB4O1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNSwgNTBweCk7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcclxcbiAgY29sdW1uLWdhcDogMzBweDtcXHJcXG4gIG1hcmdpbjogMjBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcC1kaXYge1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIG1hcmdpbjogMTBweCAwO1xcclxcbiAgZ3JpZC1hdXRvLWZsb3c6IGNvbHVtbjtcXHJcXG4gIGdyaWQtYXV0by1jb2x1bW5zOiAzMHB4O1xcclxcbiAgZ2FwOiAxcHg7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBqdXN0aWZ5LXNlbGY6IHN0YXJ0O1xcclxcbn1cXHJcXG5cXHJcXG4udmVydGljYWwge1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgbWF4LWNvbnRlbnQpO1xcclxcbn1cXHJcXG5cXHJcXG4udmVydGljYWwgLnNoaXAtZGl2IHtcXHJcXG4gIGdyaWQtYXV0by1mbG93OiByb3c7XFxyXFxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXHJcXG4gIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxyXFxufVxcclxcblxcclxcbi5hbGwtc2hpcHMgcCB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLWNvbnRlbnQge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtYXgtY29udGVudCBtYXgtY29udGVudDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcclxcbiAgZm9udC1mYW1pbHk6ICdJVEMgTWFjaGluZSBSZWd1bGFyJywgc2Fucy1zZXJpZjtcXHJcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcclxcbiAgbGV0dGVyLXNwYWNpbmc6IDJweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkIHtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxyXFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMzBweCk7XFxyXFxuICBnYXA6IDFweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNlbGwge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxyXFxufVxcclxcblxcclxcbi5zaGlwLFxcclxcbi50ZW1wLXNoaXAge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcXHJcXG4gIGhlaWdodDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmF0dGFja2VkIHtcXHJcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCguL2ltZy9hbHBoYS14LnN2Zyk7XFxyXFxufVxcclxcblxcclxcbi5oaXQge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNjE2MTtcXHJcXG59XFxyXFxuXFxyXFxuLmNsaWNrYWJsZSB7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4uL3N0eWxlLmNzcyc7XHJcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xyXG5pbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcclxuaW1wb3J0IHBsYXllclBsYWNlU2hpcHMgZnJvbSAnLi9wbGF5ZXJQbGFjZVNoaXBzJztcclxuaW1wb3J0IGNvbXB1dGVyUGxhY2VTaGlwcyBmcm9tICcuL2NvbXB1dGVyUGxhY2VTaGlwcyc7XHJcblxyXG5sZXQgcGxheWVyO1xyXG5sZXQgaXNHYW1lT3ZlciA9IGZhbHNlO1xyXG5cclxuZnVuY3Rpb24gZW5kR2FtZSgpIHtcclxuICBpZiAoaXNHYW1lT3Zlcikge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBpZiAocGxheWVyLmNvbXB1dGVyQm9hcmQuYWxsU3VuaygpKSB7XHJcbiAgICBkb20ubmV3TWVzc2FnZSgnRW5lbXkgZmxlZXQgc3VuayEgWW91IHdpbiEnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZG9tLm5ld01lc3NhZ2UoJ1lvdXIgZmxlZXQgd2FzIHN1bmshIEdhbWUgb3ZlciEnKTtcclxuICB9XHJcblxyXG4gIGRvbS5hcHBlbmRCb2FyZHMocGxheWVyLnBsYXllckJvYXJkLCBwbGF5ZXIuY29tcHV0ZXJCb2FyZCwgJ2dhbWUgb3ZlcicpO1xyXG4gIGRvbS5lbmRHYW1lKCk7XHJcblxyXG4gIGNvbnN0IG5ld0dhbWVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LWdhbWUnKTtcclxuICBuZXdHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZG9tLm9wZW5Gb3JtKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGxheVJvdW5kKGUpIHtcclxuICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG5cclxuICBpZiAoXHJcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbGwnKSAmJlxyXG4gICAgIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYXR0YWNrZWQnKVxyXG4gICkge1xyXG4gICAgY29uc3QgeyBjZWxsIH0gPSBlLnRhcmdldC5kYXRhc2V0O1xyXG4gICAgY29uc3QgbWVzc2FnZTEgPSBwbGF5ZXIucGxheWVyTW92ZShbTWF0aC5mbG9vcihjZWxsIC8gMTApLCBjZWxsICUgMTBdKTtcclxuICAgIGNvbnN0IG1lc3NhZ2UyID0gcGxheWVyLmNvbXB1dGVyTW92ZSgpO1xyXG4gICAgZG9tLm5ld01lc3NhZ2UobWVzc2FnZTEsIG1lc3NhZ2UyKTtcclxuICAgIGRvbS5hcHBlbmRCb2FyZHMocGxheWVyLnBsYXllckJvYXJkLCBwbGF5ZXIuY29tcHV0ZXJCb2FyZCwgJ25vcm1hbCBwbGF5Jyk7XHJcbiAgfVxyXG4gIGlmIChwbGF5ZXIucGxheWVyQm9hcmQuYWxsU3VuaygpIHx8IHBsYXllci5jb21wdXRlckJvYXJkLmFsbFN1bmsoKSkge1xyXG4gICAgZW5kR2FtZSgpO1xyXG4gICAgaXNHYW1lT3ZlciA9IHRydWU7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpO1xyXG5jb25zdCBlID0geyBwcmV2ZW50RGVmYXVsdCgpIHt9LCB0YXJnZXQ6IHsgcmVzZXQoKSB7fSB9IH07XHJcbi8vIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcclxucGxheWVyID0gbmV3IFBsYXllcigpO1xyXG5kb20uc3RhcnRHYW1lKGUpO1xyXG4vLyBwbGF5ZXJQbGFjZVNoaXBzLnBsYWNlKHBsYXllcik7XHJcbi8vIH0pO1xyXG5cclxuLy8gY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnQnKTtcclxuXHJcbi8vIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5jb21wdXRlclBsYWNlU2hpcHMocGxheWVyLnBsYXllckJvYXJkKTtcclxuY29tcHV0ZXJQbGFjZVNoaXBzKHBsYXllci5jb21wdXRlckJvYXJkKTtcclxuZG9tLmFwcGVuZEJvYXJkcyhwbGF5ZXIucGxheWVyQm9hcmQsIHBsYXllci5jb21wdXRlckJvYXJkLCAnbm9ybWFsIHBsYXknKTtcclxuZG9tLm5ld01lc3NhZ2UoJ0ZpcmUgd2hlbiByZWFkeSEnKTtcclxuY29uc3QgZW5lbXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5lbXknKTtcclxuZW5lbXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGF5Um91bmQpO1xyXG4vLyBzdGFydEJ1dHRvbi5yZW1vdmUoKTtcclxuLy8gfSk7XHJcbiJdLCJuYW1lcyI6WyJjb21wdXRlclBsYWNlU2hpcHMiLCJjb21wdXRlckJvYXJkIiwic2hpcHMiLCJuYW1lIiwic2l6ZSIsImZvckVhY2giLCJzaGlwIiwia2VlcEdvaW5nIiwiaXNWZXJ0aWNhbCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJvdyIsImZpcnN0Q29sdW1uIiwiYWxsRW1wdHkiLCJpIiwiY3VycmVudENlbGwiLCJib2FyZCIsImNvb3JkaW5hdGVzIiwicHVzaCIsInBsYWNlU2hpcCIsImZpcnN0Um93IiwiY29sdW1uIiwiZG9tIiwic3RhcnRHYW1lIiwiZSIsInByZXZlbnREZWZhdWx0IiwibmFtZUlucHV0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidmFsdWUiLCJ0YXJnZXQiLCJyZXNldCIsImZvcm0iLCJzdHlsZSIsImRpc3BsYXkiLCJtZXNzYWdlQm94IiwiY3JlYXRlRWxlbWVudCIsIm1lc3NhZ2VQMSIsIm1lc3NhZ2VQMiIsImdhbWVDb250ZW50IiwicGxheWVyQ29udGVudCIsImVuZW15Q29udGVudCIsInBsYXllckNhcHRpb24iLCJlbmVteUNhcHRpb24iLCJwbGF5ZXJCb2FyZENvbnRhaW5lciIsImVuZW15Qm9hcmRDb250YWluZXIiLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRBdHRyaWJ1dGUiLCJ0ZXh0Q29udGVudCIsImFwcGVuZENoaWxkIiwiYm9keSIsImluc2VydEJlZm9yZSIsImVuZEdhbWUiLCJuZXdHYW1lQnV0dG9uIiwib3BlbkZvcm0iLCJyZW1vdmUiLCJidWlsZEJvYXJkIiwiZ2FtZWJvYXJkIiwidHlwZSIsImNvbmRpdGlvbiIsImNlbGwiLCJkYXRhc2V0IiwiY29udGFpbnMiLCJqIiwicHJldmlvdXNBdHRhY2tzIiwibGVuZ3RoIiwiYXBwZW5kQm9hcmRzIiwicGxheWVyQm9hcmQiLCJwbGF5ZXJCb2FyZE5vZGUiLCJjb21wdXRlckJvYXJkTm9kZSIsImJvYXJkQ29udGFpbmVycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJuZXdNZXNzYWdlIiwibWVzc2FnZTEiLCJtZXNzYWdlMiIsIm1lc3NhZ2VQcyIsIlNoaXAiLCJHYW1lYm9hcmQiLCJjb25zdHJ1Y3RvciIsInRlbXAiLCJjdXJyZW50U2hpcCIsImNvb3JkUGFpciIsInJlY2VpdmVBdHRhY2siLCJoaXQiLCJhbGxTdW5rIiwiaXNTdW5rIiwiaW5QcmV2aW91c0F0dGFja3MiLCJQbGF5ZXIiLCJwbGF5ZXJNb3ZlIiwibWVzc2FnZSIsImNvbXB1dGVyTW92ZSIsInBsYXllclBsYWNlU2hpcHMiLCJpbkZsZWV0Iiwic2hpcHNQbGFjZWQiLCJzdGFydEJ1dHRvbiIsInJvdGF0ZUJ1dHRvbiIsImFsbFNoaXBzIiwiZHJvcEhhbmRsZXIiLCJwbGF5ZXIiLCJkYXRhIiwiZGF0YVRyYW5zZmVyIiwiZ2V0RGF0YSIsInNoaXBEaXYiLCJjaGlsZEVsZW1lbnRDb3VudCIsImxpc3QiLCJzaGlwTmFtZSIsImZpbmQiLCJjcmVhdGVTaGlwcyIsImFwcGVuZCIsImlkTmFtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXREYXRhIiwiaWQiLCJwbGFjZSIsInRpbWVzSGl0IiwiaXNHYW1lT3ZlciIsInBsYXlSb3VuZCIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsImVuZW15Il0sInNvdXJjZVJvb3QiOiIifQ==