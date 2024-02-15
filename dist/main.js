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

/***/ "./src/js/coordPairInArray.js":
/*!************************************!*\
  !*** ./src/js/coordPairInArray.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function coordPairInArray(coordPair, arr) {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][0] === coordPair[0] && arr[i][1] === coordPair[1]) {
      return true;
    }
  }
  return false;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (coordPairInArray);

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
/* harmony import */ var _coordPairInArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./coordPairInArray */ "./src/js/coordPairInArray.js");


class Player {
  constructor() {
    this.playerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.computerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.possibleHits = [];
    this.search = false;
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
  static enemyMessage(cell) {
    let message = 'The enemy missed you';
    if (typeof cell === 'object') {
      message = 'The enemy hit you!';
      if (cell.isSunk()) {
        message = `${message} The enemy sunk your ${cell.name}!`;
      }
    }
    return message;
  }
  pushDirections(coordPair) {
    const {
      board
    } = this.playerBoard;
    if (board[coordPair[0] - 1]) {
      if (!(0,_coordPairInArray__WEBPACK_IMPORTED_MODULE_1__["default"])([coordPair[0] - 1, coordPair[1]], this.playerBoard.previousAttacks) && !(0,_coordPairInArray__WEBPACK_IMPORTED_MODULE_1__["default"])([coordPair[0] - 1, coordPair[1]], this.possibleHits)) {
        this.possibleHits.push([coordPair[0] - 1, coordPair[1]]);
      }
    }
    if (board[coordPair[0] + 1]) {
      if (!(0,_coordPairInArray__WEBPACK_IMPORTED_MODULE_1__["default"])([coordPair[0] + 1, coordPair[1]], this.playerBoard.previousAttacks) && !(0,_coordPairInArray__WEBPACK_IMPORTED_MODULE_1__["default"])([coordPair[0] + 1, coordPair[1]], this.possibleHits)) {
        this.possibleHits.push([coordPair[0] + 1, coordPair[1]]);
      }
    }
    if (board[coordPair[0]][coordPair[1] - 1] && !(0,_coordPairInArray__WEBPACK_IMPORTED_MODULE_1__["default"])([coordPair[0], coordPair[1] - 1], this.playerBoard.previousAttacks) && !(0,_coordPairInArray__WEBPACK_IMPORTED_MODULE_1__["default"])([coordPair[0], coordPair[1] - 1], this.possibleHits)) {
      this.possibleHits.push([coordPair[0], coordPair[1] - 1]);
    }
    if (board[coordPair[0]][coordPair[1] + 1] && !(0,_coordPairInArray__WEBPACK_IMPORTED_MODULE_1__["default"])([coordPair[0], coordPair[1] + 1], this.playerBoard.previousAttacks) && !(0,_coordPairInArray__WEBPACK_IMPORTED_MODULE_1__["default"])([coordPair[0], coordPair[1] + 1], this.possibleHits)) {
      this.possibleHits.push([coordPair[0], coordPair[1] + 1]);
    }
  }
  searchAndDestroy() {
    const coordPair = this.possibleHits.shift();
    this.playerBoard.receiveAttack(coordPair);
    if (typeof this.playerBoard.board[coordPair[0]][coordPair[1]] === 'object') {
      this.pushDirections(coordPair);
    }
    if (this.possibleHits.length === 0) {
      this.search = false;
    }
    return this.playerBoard.board[coordPair[0]][coordPair[1]];
  }
  computerMove() {
    let row = Math.floor(Math.random() * 10);
    let column = Math.floor(Math.random() * 10);
    let cell;
    if (this.search === true) {
      cell = this.searchAndDestroy();
    } else {
      while ((0,_coordPairInArray__WEBPACK_IMPORTED_MODULE_1__["default"])([row, column], this.playerBoard.previousAttacks)) {
        row = Math.floor(Math.random() * 10);
        column = Math.floor(Math.random() * 10);
      }
      this.playerBoard.receiveAttack([row, column]);
      cell = this.playerBoard.board[row][column];
      if (typeof cell === 'object') {
        this.search = true;
        this.pushDirections([row, column]);
      }
    }
    return Player.enemyMessage(cell);
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
    this.ships = [{
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
    }];
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





const form = document.querySelector('form');
let player;
let startButton;
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
  const enemy = document.querySelector('#enemy');
  const newGameButton = document.querySelector('.new-game');
  enemy.replaceWith(enemy.cloneNode(true));
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
form.addEventListener('submit', e => {
  player = new _player__WEBPACK_IMPORTED_MODULE_1__["default"]();
  _dom__WEBPACK_IMPORTED_MODULE_2__["default"].startGame(e);
  _playerPlaceShips__WEBPACK_IMPORTED_MODULE_3__["default"].place(player);
  startButton = document.querySelector('.start');
  startButton.addEventListener('click', () => {
    (0,_computerPlaceShips__WEBPACK_IMPORTED_MODULE_4__["default"])(player.computerBoard);
    _dom__WEBPACK_IMPORTED_MODULE_2__["default"].appendBoards(player.playerBoard, player.computerBoard, 'normal play');
    _dom__WEBPACK_IMPORTED_MODULE_2__["default"].newMessage('Fire when ready!');
    const enemy = document.querySelector('#enemy');
    enemy.addEventListener('click', playRound);
    startButton.remove();
  });
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RyxJQUFJO0VBQ25CO0FBQ0Y7QUFFQXhGLElBQUksQ0FBQ21GLGdCQUFnQixDQUFDLFFBQVEsRUFBRzNGLENBQUMsSUFBSztFQUNyQytFLE1BQU0sR0FBRyxJQUFJakIsK0NBQU0sQ0FBQyxDQUFDO0VBQ3JCaEUsNENBQUcsQ0FBQ0MsU0FBUyxDQUFDQyxDQUFDLENBQUM7RUFDaEJ3RSx5REFBZ0IsQ0FBQ3NCLEtBQUssQ0FBQ2YsTUFBTSxDQUFDO0VBQzlCSixXQUFXLEdBQUd4RSxRQUFRLENBQUNDLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFFOUN1RSxXQUFXLENBQUNnQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtJQUMxQ3hILCtEQUFrQixDQUFDNEcsTUFBTSxDQUFDM0csYUFBYSxDQUFDO0lBQ3hDMEIsNENBQUcsQ0FBQzRDLFlBQVksQ0FBQ3FDLE1BQU0sQ0FBQ3BDLFdBQVcsRUFBRW9DLE1BQU0sQ0FBQzNHLGFBQWEsRUFBRSxhQUFhLENBQUM7SUFDekUwQiw0Q0FBRyxDQUFDa0QsVUFBVSxDQUFDLGtCQUFrQixDQUFDO0lBRWxDLE1BQU1pRCxLQUFLLEdBQUc5RixRQUFRLENBQUNDLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFDOUM2RixLQUFLLENBQUNOLGdCQUFnQixDQUFDLE9BQU8sRUFBRVMsU0FBUyxDQUFDO0lBQzFDekIsV0FBVyxDQUFDM0MsTUFBTSxDQUFDLENBQUM7RUFDdEIsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXcvLi9zcmMvanMvY29tcHV0ZXJQbGFjZVNoaXBzLmpzIiwid2VicGFjazovL25ldy8uL3NyYy9qcy9jb29yZFBhaXJJbkFycmF5LmpzIiwid2VicGFjazovL25ldy8uL3NyYy9qcy9kb20uanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vc3JjL2pzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9uZXcvLi9zcmMvanMvcGxheWVyLmpzIiwid2VicGFjazovL25ldy8uL3NyYy9qcy9wbGF5ZXJQbGFjZVNoaXBzLmpzIiwid2VicGFjazovL25ldy8uL3NyYy9qcy9zaGlwLmpzIiwid2VicGFjazovL25ldy8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vbmV3Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9uZXcvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL25ldy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL25ldy8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9uZXcvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9uZXcvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL25ldy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL25ldy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL25ldy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXcvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbmV3L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXcvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9uZXcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXcvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXcvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vbmV3L3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL25ldy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vbmV3Ly4vc3JjL2pzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGNvbXB1dGVyUGxhY2VTaGlwcyhjb21wdXRlckJvYXJkKSB7XHJcbiAgY29uc3Qgc2hpcHMgPSBbXHJcbiAgICB7IG5hbWU6ICdDYXJyaWVyJywgc2l6ZTogNSB9LFxyXG4gICAgeyBuYW1lOiAnQmF0dGxlc2hpcCcsIHNpemU6IDQgfSxcclxuICAgIHsgbmFtZTogJ0Rlc3Ryb3llcicsIHNpemU6IDMgfSxcclxuICAgIHsgbmFtZTogJ1N1Ym1hcmluZScsIHNpemU6IDMgfSxcclxuICAgIHsgbmFtZTogJ1BhdHJvbCBCb2F0Jywgc2l6ZTogMiB9LFxyXG4gIF07XHJcblxyXG4gIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgIGxldCBrZWVwR29pbmcgPSB0cnVlO1xyXG5cclxuICAgIHdoaWxlIChrZWVwR29pbmcpIHtcclxuICAgICAgY29uc3QgaXNWZXJ0aWNhbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xyXG5cclxuICAgICAgaWYgKGlzVmVydGljYWwgPT09IDApIHtcclxuICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgY29uc3QgZmlyc3RDb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAgLSBzaGlwLnNpemUpKTtcclxuICAgICAgICBsZXQgYWxsRW1wdHkgPSB0cnVlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBzaGlwLnNpemU7IGkgKz0gMSkge1xyXG4gICAgICAgICAgY29uc3QgY3VycmVudENlbGwgPSBjb21wdXRlckJvYXJkLmJvYXJkW3Jvd11bZmlyc3RDb2x1bW4gKyBpXTtcclxuXHJcbiAgICAgICAgICBpZiAodHlwZW9mIGN1cnJlbnRDZWxsID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBhbGxFbXB0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhbGxFbXB0eSkge1xyXG4gICAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuc2l6ZTsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2goW3JvdywgZmlyc3RDb2x1bW4gKyBpXSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoc2hpcC5uYW1lLCBjb29yZGluYXRlcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBrZWVwR29pbmcgPSAhYWxsRW1wdHk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgZmlyc3RSb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAgLSBzaGlwLnNpemUpKTtcclxuICAgICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgbGV0IGFsbEVtcHR5ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gc2hpcC5zaXplOyBpICs9IDEpIHtcclxuICAgICAgICAgIGNvbnN0IGN1cnJlbnRDZWxsID0gY29tcHV0ZXJCb2FyZC5ib2FyZFtmaXJzdFJvdyArIGldW2NvbHVtbl07XHJcblxyXG4gICAgICAgICAgaWYgKHR5cGVvZiBjdXJyZW50Q2VsbCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgYWxsRW1wdHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWxsRW1wdHkpIHtcclxuICAgICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gW107XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNpemU7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKFtmaXJzdFJvdyArIGksIGNvbHVtbl0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKHNoaXAubmFtZSwgY29vcmRpbmF0ZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAga2VlcEdvaW5nID0gIWFsbEVtcHR5O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbXB1dGVyUGxhY2VTaGlwcztcclxuIiwiZnVuY3Rpb24gY29vcmRQYWlySW5BcnJheShjb29yZFBhaXIsIGFycikge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICBpZiAoYXJyW2ldWzBdID09PSBjb29yZFBhaXJbMF0gJiYgYXJyW2ldWzFdID09PSBjb29yZFBhaXJbMV0pIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvb3JkUGFpckluQXJyYXk7IiwiY29uc3QgZG9tID0ge1xyXG4gIHN0YXJ0R2FtZShlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmFtZScpO1xyXG4gICAgY29uc3QgbmFtZSA9IG5hbWVJbnB1dC52YWx1ZTtcclxuICAgIGUudGFyZ2V0LnJlc2V0KCk7XHJcblxyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcclxuICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbiAgICBjb25zdCBtZXNzYWdlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb25zdCBtZXNzYWdlUDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICBjb25zdCBtZXNzYWdlUDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICBjb25zdCBnYW1lQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgcGxheWVyQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgZW5lbXlDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb25zdCBwbGF5ZXJDYXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcclxuICAgIGNvbnN0IGVuZW15Q2FwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XHJcbiAgICBjb25zdCBwbGF5ZXJCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgZW5lbXlCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgIG1lc3NhZ2VCb3guY2xhc3NMaXN0LmFkZCgnbWVzc2FnZS1ib3gnKTtcclxuICAgIGdhbWVDb250ZW50LmNsYXNzTGlzdC5hZGQoJ2dhbWUtY29udGVudCcpO1xyXG4gICAgcGxheWVyQ29udGVudC5jbGFzc0xpc3QuYWRkKCdwbGF5ZXItY29udGVudCcpO1xyXG4gICAgZW5lbXlDb250ZW50LmNsYXNzTGlzdC5hZGQoJ3BsYXllci1jb250ZW50Jyk7XHJcbiAgICBwbGF5ZXJDYXB0aW9uLmNsYXNzTGlzdC5hZGQoJ2NhcHRpb24nKTtcclxuICAgIGVuZW15Q2FwdGlvbi5jbGFzc0xpc3QuYWRkKCdjYXB0aW9uJyk7XHJcbiAgICBwbGF5ZXJCb2FyZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2JvYXJkLWNvbnRhaW5lcicpO1xyXG4gICAgcGxheWVyQm9hcmRDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdwbGF5ZXInKTtcclxuICAgIGVuZW15Qm9hcmRDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdib2FyZC1jb250YWluZXInKTtcclxuICAgIGVuZW15Qm9hcmRDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdlbmVteScpO1xyXG5cclxuICAgIHBsYXllckNhcHRpb24udGV4dENvbnRlbnQgPSBuYW1lID8gYCR7bmFtZX0ncyBGbGVldGAgOiBcIlBsYXllcidzIEZsZWV0XCI7XHJcbiAgICBlbmVteUNhcHRpb24udGV4dENvbnRlbnQgPSBgRW5lbXkgRmxlZXRgO1xyXG5cclxuICAgIG1lc3NhZ2VCb3guYXBwZW5kQ2hpbGQobWVzc2FnZVAxKTtcclxuICAgIG1lc3NhZ2VCb3guYXBwZW5kQ2hpbGQobWVzc2FnZVAyKTtcclxuICAgIHBsYXllckNvbnRlbnQuYXBwZW5kQ2hpbGQocGxheWVyQ2FwdGlvbik7XHJcbiAgICBwbGF5ZXJDb250ZW50LmFwcGVuZENoaWxkKHBsYXllckJvYXJkQ29udGFpbmVyKTtcclxuICAgIGVuZW15Q29udGVudC5hcHBlbmRDaGlsZChlbmVteUNhcHRpb24pO1xyXG4gICAgZW5lbXlDb250ZW50LmFwcGVuZENoaWxkKGVuZW15Qm9hcmRDb250YWluZXIpO1xyXG4gICAgZ2FtZUNvbnRlbnQuYXBwZW5kQ2hpbGQocGxheWVyQ29udGVudCk7XHJcbiAgICBnYW1lQ29udGVudC5hcHBlbmRDaGlsZChlbmVteUNvbnRlbnQpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUobWVzc2FnZUJveCwgZm9ybSk7XHJcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShnYW1lQ29udGVudCwgbWVzc2FnZUJveCk7XHJcbiAgfSxcclxuXHJcbiAgZW5kR2FtZSgpIHtcclxuICAgIGNvbnN0IG1lc3NhZ2VCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZS1ib3gnKTtcclxuICAgIGNvbnN0IG5ld0dhbWVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIG5ld0dhbWVCdXR0b24uY2xhc3NMaXN0LmFkZCgnbmV3LWdhbWUnKTtcclxuICAgIG5ld0dhbWVCdXR0b24udGV4dENvbnRlbnQgPSAnTmV3IEdhbWUnO1xyXG4gICAgbWVzc2FnZUJveC5hcHBlbmRDaGlsZChuZXdHYW1lQnV0dG9uKTtcclxuICB9LFxyXG5cclxuICBvcGVuRm9ybSgpIHtcclxuICAgIGNvbnN0IG1lc3NhZ2VCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZS1ib3gnKTtcclxuICAgIGNvbnN0IGdhbWVDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtY29udGVudCcpO1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcclxuICAgIG1lc3NhZ2VCb3gucmVtb3ZlKCk7XHJcbiAgICBnYW1lQ29udGVudC5yZW1vdmUoKTtcclxuICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgfSxcclxuXHJcbiAgYnVpbGRCb2FyZChnYW1lYm9hcmQsIHR5cGUsIGNvbmRpdGlvbikge1xyXG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGJvYXJkLmNsYXNzTGlzdC5hZGQoJ2JvYXJkJyk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkgKz0gMSkge1xyXG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xyXG4gICAgICBjZWxsLmRhdGFzZXQuY2VsbCA9IGk7XHJcblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdHlwZW9mIGdhbWVib2FyZC5ib2FyZFtNYXRoLmZsb29yKGkgLyAxMCldW2kgJSAxMF0gPT09ICdvYmplY3QnICYmXHJcbiAgICAgICAgKHR5cGUgPT09ICdwbGF5ZXInIHx8IGNvbmRpdGlvbiA9PT0gJ2dhbWUgb3ZlcicpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChcclxuICAgICAgICB0eXBlID09PSAnY29tcHV0ZXInICYmXHJcbiAgICAgICAgY29uZGl0aW9uID09PSAnbm9ybWFsIHBsYXknICYmXHJcbiAgICAgICAgIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdhdHRhY2tlZCcpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2xpY2thYmxlJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ2FtZWJvYXJkLnByZXZpb3VzQXR0YWNrcy5sZW5ndGg7IGogKz0gMSkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIGdhbWVib2FyZC5wcmV2aW91c0F0dGFja3Nbal1bMF0gPT09IE1hdGguZmxvb3IoaSAvIDEwKSAmJlxyXG4gICAgICAgICAgZ2FtZWJvYXJkLnByZXZpb3VzQXR0YWNrc1tqXVsxXSA9PT0gaSAlIDEwXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2F0dGFja2VkJyk7XHJcblxyXG4gICAgICAgICAgaWYgKHR5cGVvZiBnYW1lYm9hcmQuYm9hcmRbTWF0aC5mbG9vcihpIC8gMTApXVtpICUgMTBdID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoY2VsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGJvYXJkO1xyXG4gIH0sXHJcblxyXG4gIGFwcGVuZEJvYXJkcyhwbGF5ZXJCb2FyZCwgY29tcHV0ZXJCb2FyZCwgY29uZGl0aW9uKSB7XHJcbiAgICBjb25zdCBwbGF5ZXJCb2FyZE5vZGUgPSBkb20uYnVpbGRCb2FyZChwbGF5ZXJCb2FyZCwgJ3BsYXllcicsIGNvbmRpdGlvbik7XHJcbiAgICBjb25zdCBjb21wdXRlckJvYXJkTm9kZSA9IGRvbS5idWlsZEJvYXJkKFxyXG4gICAgICBjb21wdXRlckJvYXJkLFxyXG4gICAgICAnY29tcHV0ZXInLFxyXG4gICAgICBjb25kaXRpb24sXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGJvYXJkQ29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib2FyZC1jb250YWluZXInKTtcclxuICAgIGJvYXJkQ29udGFpbmVyc1swXS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgYm9hcmRDb250YWluZXJzWzFdLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICBib2FyZENvbnRhaW5lcnNbMF0uYXBwZW5kQ2hpbGQocGxheWVyQm9hcmROb2RlKTtcclxuICAgIGJvYXJkQ29udGFpbmVyc1sxXS5hcHBlbmRDaGlsZChjb21wdXRlckJvYXJkTm9kZSk7XHJcbiAgfSxcclxuXHJcbiAgbmV3TWVzc2FnZShtZXNzYWdlMSwgbWVzc2FnZTIpIHtcclxuICAgIGNvbnN0IG1lc3NhZ2VQcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZXNzYWdlLWJveCBwJyk7XHJcbiAgICBtZXNzYWdlUHNbMF0udGV4dENvbnRlbnQgPSBtZXNzYWdlMTtcclxuICAgIG1lc3NhZ2VQc1sxXS50ZXh0Q29udGVudCA9IG1lc3NhZ2UyO1xyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkb207XHJcbiIsImltcG9ydCBTaGlwIGZyb20gJy4vc2hpcCc7XHJcblxyXG5jbGFzcyBHYW1lYm9hcmQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ib2FyZCA9IFtdO1xyXG4gICAgdGhpcy5wcmV2aW91c0F0dGFja3MgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcclxuICAgICAgY29uc3QgdGVtcCA9IFtdO1xyXG5cclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XHJcbiAgICAgICAgdGVtcC5wdXNoKCdlbXB0eScpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmJvYXJkLnB1c2godGVtcCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwbGFjZVNoaXAobmFtZSwgY29vcmRpbmF0ZXMpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gbmV3IFNoaXAobmFtZSwgY29vcmRpbmF0ZXMubGVuZ3RoKTtcclxuXHJcbiAgICBjb29yZGluYXRlcy5mb3JFYWNoKChjb29yZFBhaXIpID0+IHtcclxuICAgICAgdGhpcy5ib2FyZFtjb29yZFBhaXJbMF1dW2Nvb3JkUGFpclsxXV0gPSBjdXJyZW50U2hpcDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVjZWl2ZUF0dGFjayhjb29yZFBhaXIpIHtcclxuICAgIHRoaXMucHJldmlvdXNBdHRhY2tzLnB1c2goY29vcmRQYWlyKTtcclxuICAgIGNvbnN0IGNlbGwgPSB0aGlzLmJvYXJkW2Nvb3JkUGFpclswXV1bY29vcmRQYWlyWzFdXTtcclxuXHJcbiAgICBpZiAodHlwZW9mIGNlbGwgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGNlbGwuaGl0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmJvYXJkW2Nvb3JkUGFpclswXV1bY29vcmRQYWlyWzFdXSA9ICdtaXNzJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFsbFN1bmsoKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgdHlwZW9mIHRoaXMuYm9hcmRbaV1bal0gPT09ICdvYmplY3QnICYmXHJcbiAgICAgICAgICAhdGhpcy5ib2FyZFtpXVtqXS5pc1N1bmsoKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgaW5QcmV2aW91c0F0dGFja3MoY29vcmRQYWlyKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJldmlvdXNBdHRhY2tzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICB0aGlzLnByZXZpb3VzQXR0YWNrc1tpXVswXSA9PT0gY29vcmRQYWlyWzBdICYmXHJcbiAgICAgICAgdGhpcy5wcmV2aW91c0F0dGFja3NbaV1bMV0gPT09IGNvb3JkUGFpclsxXVxyXG4gICAgICApIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcclxuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCc7XHJcbmltcG9ydCBjb29yZFBhaXJJbkFycmF5IGZyb20gJy4vY29vcmRQYWlySW5BcnJheSc7XHJcblxyXG5jbGFzcyBQbGF5ZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5wbGF5ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcclxuICAgIHRoaXMuY29tcHV0ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcclxuICAgIHRoaXMucG9zc2libGVIaXRzID0gW107XHJcbiAgICB0aGlzLnNlYXJjaCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcGxheWVyTW92ZShjb29yZFBhaXIpIHtcclxuICAgIHRoaXMuY29tcHV0ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkUGFpcik7XHJcbiAgICBjb25zdCBjZWxsID0gdGhpcy5jb21wdXRlckJvYXJkLmJvYXJkW2Nvb3JkUGFpclswXV1bY29vcmRQYWlyWzFdXTtcclxuICAgIGxldCBtZXNzYWdlID0gJ1lvdSBtaXNzZWQgdGhlIGVuZW15JztcclxuXHJcbiAgICBpZiAodHlwZW9mIGNlbGwgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIG1lc3NhZ2UgPSAnWW91IGhpdCB0aGUgZW5lbXkhJztcclxuXHJcbiAgICAgIGlmIChjZWxsLmlzU3VuaygpKSB7XHJcbiAgICAgICAgbWVzc2FnZSA9IGAke21lc3NhZ2V9IFlvdSBzdW5rIHRoZSBlbmVteSdzICR7Y2VsbC5uYW1lfSFgO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZW5lbXlNZXNzYWdlKGNlbGwpIHtcclxuICAgIGxldCBtZXNzYWdlID0gJ1RoZSBlbmVteSBtaXNzZWQgeW91JztcclxuXHJcbiAgICBpZiAodHlwZW9mIGNlbGwgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIG1lc3NhZ2UgPSAnVGhlIGVuZW15IGhpdCB5b3UhJztcclxuXHJcbiAgICAgIGlmIChjZWxsLmlzU3VuaygpKSB7XHJcbiAgICAgICAgbWVzc2FnZSA9IGAke21lc3NhZ2V9IFRoZSBlbmVteSBzdW5rIHlvdXIgJHtjZWxsLm5hbWV9IWA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWVzc2FnZTtcclxuICB9XHJcblxyXG4gIHB1c2hEaXJlY3Rpb25zKGNvb3JkUGFpcikge1xyXG4gICAgY29uc3QgeyBib2FyZCB9ID0gdGhpcy5wbGF5ZXJCb2FyZDtcclxuXHJcbiAgICBpZiAoYm9hcmRbY29vcmRQYWlyWzBdIC0gMV0pIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgICFjb29yZFBhaXJJbkFycmF5KFxyXG4gICAgICAgICAgW2Nvb3JkUGFpclswXSAtIDEsIGNvb3JkUGFpclsxXV0sXHJcbiAgICAgICAgICB0aGlzLnBsYXllckJvYXJkLnByZXZpb3VzQXR0YWNrcyxcclxuICAgICAgICApICYmXHJcbiAgICAgICAgIWNvb3JkUGFpckluQXJyYXkoW2Nvb3JkUGFpclswXSAtIDEsIGNvb3JkUGFpclsxXV0sIHRoaXMucG9zc2libGVIaXRzKVxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLnBvc3NpYmxlSGl0cy5wdXNoKFtjb29yZFBhaXJbMF0gLSAxLCBjb29yZFBhaXJbMV1dKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChib2FyZFtjb29yZFBhaXJbMF0gKyAxXSkge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgIWNvb3JkUGFpckluQXJyYXkoXHJcbiAgICAgICAgICBbY29vcmRQYWlyWzBdICsgMSwgY29vcmRQYWlyWzFdXSxcclxuICAgICAgICAgIHRoaXMucGxheWVyQm9hcmQucHJldmlvdXNBdHRhY2tzLFxyXG4gICAgICAgICkgJiZcclxuICAgICAgICAhY29vcmRQYWlySW5BcnJheShbY29vcmRQYWlyWzBdICsgMSwgY29vcmRQYWlyWzFdXSwgdGhpcy5wb3NzaWJsZUhpdHMpXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMucG9zc2libGVIaXRzLnB1c2goW2Nvb3JkUGFpclswXSArIDEsIGNvb3JkUGFpclsxXV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBib2FyZFtjb29yZFBhaXJbMF1dW2Nvb3JkUGFpclsxXSAtIDFdICYmXHJcbiAgICAgICFjb29yZFBhaXJJbkFycmF5KFxyXG4gICAgICAgIFtjb29yZFBhaXJbMF0sIGNvb3JkUGFpclsxXSAtIDFdLFxyXG4gICAgICAgIHRoaXMucGxheWVyQm9hcmQucHJldmlvdXNBdHRhY2tzLFxyXG4gICAgICApICYmXHJcbiAgICAgICFjb29yZFBhaXJJbkFycmF5KFtjb29yZFBhaXJbMF0sIGNvb3JkUGFpclsxXSAtIDFdLCB0aGlzLnBvc3NpYmxlSGl0cylcclxuICAgICkge1xyXG4gICAgICB0aGlzLnBvc3NpYmxlSGl0cy5wdXNoKFtjb29yZFBhaXJbMF0sIGNvb3JkUGFpclsxXSAtIDFdKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIGJvYXJkW2Nvb3JkUGFpclswXV1bY29vcmRQYWlyWzFdICsgMV0gJiZcclxuICAgICAgIWNvb3JkUGFpckluQXJyYXkoXHJcbiAgICAgICAgW2Nvb3JkUGFpclswXSwgY29vcmRQYWlyWzFdICsgMV0sXHJcbiAgICAgICAgdGhpcy5wbGF5ZXJCb2FyZC5wcmV2aW91c0F0dGFja3MsXHJcbiAgICAgICkgJiZcclxuICAgICAgIWNvb3JkUGFpckluQXJyYXkoW2Nvb3JkUGFpclswXSwgY29vcmRQYWlyWzFdICsgMV0sIHRoaXMucG9zc2libGVIaXRzKVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMucG9zc2libGVIaXRzLnB1c2goW2Nvb3JkUGFpclswXSwgY29vcmRQYWlyWzFdICsgMV0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2VhcmNoQW5kRGVzdHJveSgpIHtcclxuICAgIGNvbnN0IGNvb3JkUGFpciA9IHRoaXMucG9zc2libGVIaXRzLnNoaWZ0KCk7XHJcbiAgICB0aGlzLnBsYXllckJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRQYWlyKTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIHR5cGVvZiB0aGlzLnBsYXllckJvYXJkLmJvYXJkW2Nvb3JkUGFpclswXV1bY29vcmRQYWlyWzFdXSA9PT0gJ29iamVjdCdcclxuICAgICkge1xyXG4gICAgICB0aGlzLnB1c2hEaXJlY3Rpb25zKGNvb3JkUGFpcik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucG9zc2libGVIaXRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLnNlYXJjaCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnBsYXllckJvYXJkLmJvYXJkW2Nvb3JkUGFpclswXV1bY29vcmRQYWlyWzFdXTtcclxuICB9XHJcblxyXG4gIGNvbXB1dGVyTW92ZSgpIHtcclxuICAgIGxldCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICBsZXQgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgbGV0IGNlbGw7XHJcblxyXG4gICAgaWYgKHRoaXMuc2VhcmNoID09PSB0cnVlKSB7XHJcbiAgICAgIGNlbGwgPSB0aGlzLnNlYXJjaEFuZERlc3Ryb3koKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdoaWxlIChcclxuICAgICAgICBjb29yZFBhaXJJbkFycmF5KFtyb3csIGNvbHVtbl0sIHRoaXMucGxheWVyQm9hcmQucHJldmlvdXNBdHRhY2tzKVxyXG4gICAgICApIHtcclxuICAgICAgICByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnBsYXllckJvYXJkLnJlY2VpdmVBdHRhY2soW3JvdywgY29sdW1uXSk7XHJcbiAgICAgIGNlbGwgPSB0aGlzLnBsYXllckJvYXJkLmJvYXJkW3Jvd11bY29sdW1uXTtcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgY2VsbCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICB0aGlzLnNlYXJjaCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5wdXNoRGlyZWN0aW9ucyhbcm93LCBjb2x1bW5dKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBQbGF5ZXIuZW5lbXlNZXNzYWdlKGNlbGwpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xyXG4iLCJpbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcclxuXHJcbmNvbnN0IHBsYXllclBsYWNlU2hpcHMgPSB7XHJcbiAgaXNWZXJ0aWNhbDogZmFsc2UsXHJcblxyXG4gIHNoaXBzOiBbXHJcbiAgICB7IG5hbWU6ICdDYXJyaWVyJywgc2l6ZTogNSwgaW5GbGVldDogZmFsc2UgfSxcclxuICAgIHsgbmFtZTogJ0JhdHRsZXNoaXAnLCBzaXplOiA0LCBpbkZsZWV0OiBmYWxzZSB9LFxyXG4gICAgeyBuYW1lOiAnRGVzdHJveWVyJywgc2l6ZTogMywgaW5GbGVldDogZmFsc2UgfSxcclxuICAgIHsgbmFtZTogJ1N1Ym1hcmluZScsIHNpemU6IDMsIGluRmxlZXQ6IGZhbHNlIH0sXHJcbiAgICB7IG5hbWU6ICdQYXRyb2wgQm9hdCcsIHNpemU6IDIsIGluRmxlZXQ6IGZhbHNlIH0sXHJcbiAgXSxcclxuXHJcbiAgc2hpcHNQbGFjZWQoKSB7XHJcbiAgICBjb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydCcpO1xyXG4gICAgY29uc3Qgcm90YXRlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvdGF0ZScpO1xyXG4gICAgY29uc3QgYWxsU2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxsLXNoaXBzJyk7XHJcbiAgICByb3RhdGVCdXR0b24ucmVtb3ZlKCk7XHJcbiAgICBhbGxTaGlwcy5yZW1vdmUoKTtcclxuICAgIHN0YXJ0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcclxuICB9LFxyXG5cclxuICBkcm9wSGFuZGxlcihlLCBwbGF5ZXIpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IGRhdGEgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0Jyk7XHJcbiAgICBjb25zdCBzaGlwRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7ZGF0YX1gKTtcclxuICAgIGNvbnN0IHNpemUgPSBzaGlwRGl2LmNoaWxkRWxlbWVudENvdW50O1xyXG4gICAgY29uc3QgbGlzdCA9IGUudGFyZ2V0LmNsYXNzTGlzdDtcclxuICAgIGNvbnN0IHsgY2VsbCB9ID0gZS50YXJnZXQuZGF0YXNldDtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgICghdGhpcy5pc1ZlcnRpY2FsICYmIChjZWxsICUgMTApICsgc2l6ZSA+IDEwKSB8fFxyXG4gICAgICAodGhpcy5pc1ZlcnRpY2FsICYmIE1hdGguZmxvb3IoY2VsbCAvIDEwKSArIHNpemUgPiAxMCkgfHxcclxuICAgICAgIWxpc3QuY29udGFpbnMoJ2NlbGwnKSB8fFxyXG4gICAgICBsaXN0LmNvbnRhaW5zKCdzaGlwJylcclxuICAgICkge1xyXG4gICAgICBsaXN0LnJlbW92ZSgndGVtcC1zaGlwJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSArPSAxKSB7XHJcbiAgICAgIGlmICghdGhpcy5pc1ZlcnRpY2FsKSB7XHJcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaChbTWF0aC5mbG9vcihjZWxsIC8gMTApLCAoY2VsbCAlIDEwKSArIGldKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb29yZGluYXRlcy5wdXNoKFtNYXRoLmZsb29yKGNlbGwgLyAxMCkgKyBpLCBjZWxsICUgMTBdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBsYXllci5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoZGF0YSwgY29vcmRpbmF0ZXMpO1xyXG4gICAgc2hpcERpdi50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgZG9tLmFwcGVuZEJvYXJkcyhwbGF5ZXIucGxheWVyQm9hcmQsIHBsYXllci5jb21wdXRlckJvYXJkLCAnc2hpcCBwbGFjaW5nJyk7XHJcblxyXG4gICAgY29uc3Qgc2hpcE5hbWUgPSBkYXRhID09PSAnUGF0cm9sLUJvYXQnID8gJ1BhdHJvbCBCb2F0JyA6IGRhdGE7XHJcbiAgICBjb25zdCBjdXJyZW50U2hpcCA9IHRoaXMuc2hpcHMuZmluZCgoc2hpcCkgPT4gc2hpcC5uYW1lID09PSBzaGlwTmFtZSk7XHJcbiAgICBjdXJyZW50U2hpcC5pbkZsZWV0ID0gdHJ1ZTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2hpcHMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgaWYgKCF0aGlzLnNoaXBzW2ldLmluRmxlZXQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNoaXBzUGxhY2VkKCk7XHJcbiAgfSxcclxuXHJcbiAgY3JlYXRlU2hpcHMoKSB7XHJcbiAgICBjb25zdCBhbGxTaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGwtc2hpcHMnKTtcclxuXHJcbiAgICBpZiAodGhpcy5pc1ZlcnRpY2FsKSB7XHJcbiAgICAgIGFsbFNoaXBzLmNsYXNzTGlzdC5hZGQoJ3ZlcnRpY2FsJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGxTaGlwcy5jbGFzc0xpc3QucmVtb3ZlKCd2ZXJ0aWNhbCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmlzVmVydGljYWwpIHtcclxuICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2hpcE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgc2hpcE5hbWUudGV4dENvbnRlbnQgPSBzaGlwLm5hbWU7XHJcbiAgICAgICAgYWxsU2hpcHMuYXBwZW5kKHNoaXBOYW1lKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNoaXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgc2hpcERpdi5jbGFzc0xpc3QuYWRkKCdzaGlwLWRpdicpO1xyXG4gICAgICBjb25zdCBpZE5hbWUgPSBzaGlwLm5hbWUgPT09ICdQYXRyb2wgQm9hdCcgPyAnUGF0cm9sLUJvYXQnIDogc2hpcC5uYW1lO1xyXG4gICAgICBzaGlwRGl2LnNldEF0dHJpYnV0ZSgnaWQnLCBpZE5hbWUpO1xyXG4gICAgICBzaGlwRGl2LnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ3RydWUnKTtcclxuXHJcbiAgICAgIGlmICghc2hpcC5pbkZsZWV0KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNpemU7IGkgKz0gMSkge1xyXG4gICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XHJcbiAgICAgICAgICBjZWxsLmRhdGFzZXQuY2VsbCA9IGk7XHJcbiAgICAgICAgICBzaGlwRGl2LmFwcGVuZENoaWxkKGNlbGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCF0aGlzLmlzVmVydGljYWwpIHtcclxuICAgICAgICBjb25zdCBzaGlwTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBzaGlwTmFtZS50ZXh0Q29udGVudCA9IHNoaXAubmFtZTtcclxuICAgICAgICBhbGxTaGlwcy5hcHBlbmQoc2hpcE5hbWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBhbGxTaGlwcy5hcHBlbmQoc2hpcERpdik7XHJcblxyXG4gICAgICBzaGlwRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIChlKSA9PiB7XHJcbiAgICAgICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dCcsIGUudGFyZ2V0LmlkKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9LFxyXG5cclxuICBwbGFjZShwbGF5ZXIpIHtcclxuICAgIGNvbnN0IG1lc3NhZ2VCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZS1ib3gnKTtcclxuICAgIGNvbnN0IHBsYXllckJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllcicpO1xyXG4gICAgY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGNvbnN0IGFsbFNoaXBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb25zdCByb3RhdGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgICB0aGlzLnNoaXBzID0gW1xyXG4gICAgICB7IG5hbWU6ICdDYXJyaWVyJywgc2l6ZTogNSwgaW5GbGVldDogZmFsc2UgfSxcclxuICAgICAgeyBuYW1lOiAnQmF0dGxlc2hpcCcsIHNpemU6IDQsIGluRmxlZXQ6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ0Rlc3Ryb3llcicsIHNpemU6IDMsIGluRmxlZXQ6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ1N1Ym1hcmluZScsIHNpemU6IDMsIGluRmxlZXQ6IGZhbHNlIH0sXHJcbiAgICAgIHsgbmFtZTogJ1BhdHJvbCBCb2F0Jywgc2l6ZTogMiwgaW5GbGVldDogZmFsc2UgfSxcclxuICAgIF07XHJcblxyXG4gICAgc3RhcnRCdXR0b24udGV4dENvbnRlbnQgPSAnU3RhcnQnO1xyXG4gICAgcm90YXRlQnV0dG9uLnRleHRDb250ZW50ID0gJ1JvdGF0ZSc7XHJcbiAgICBzdGFydEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzdGFydCcpO1xyXG4gICAgcm90YXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3JvdGF0ZScpO1xyXG4gICAgYWxsU2hpcHMuY2xhc3NMaXN0LmFkZCgnYWxsLXNoaXBzJyk7XHJcbiAgICBzdGFydEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgIG1lc3NhZ2VCb3guYXBwZW5kQ2hpbGQoc3RhcnRCdXR0b24pO1xyXG4gICAgbWVzc2FnZUJveC5hcHBlbmRDaGlsZChyb3RhdGVCdXR0b24pO1xyXG4gICAgbWVzc2FnZUJveC5hcHBlbmQoYWxsU2hpcHMpO1xyXG5cclxuICAgIHJvdGF0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgdGhpcy5pc1ZlcnRpY2FsID0gIXRoaXMuaXNWZXJ0aWNhbDtcclxuICAgICAgYWxsU2hpcHMudGV4dENvbnRlbnQgPSAnJztcclxuICAgICAgdGhpcy5jcmVhdGVTaGlwcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZG9tLmFwcGVuZEJvYXJkcyhwbGF5ZXIucGxheWVyQm9hcmQsIHBsYXllci5jb21wdXRlckJvYXJkLCAnc2hpcCBwbGFjaW5nJyk7XHJcbiAgICB0aGlzLmNyZWF0ZVNoaXBzKCk7XHJcblxyXG4gICAgcGxheWVyQm9hcmRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCAoZSkgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3RlbXAtc2hpcCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcGxheWVyQm9hcmRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCd0ZW1wLXNoaXAnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHBsYXllckJvYXJkQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCAoZSkgPT4ge1xyXG4gICAgICB0aGlzLmRyb3BIYW5kbGVyKGUsIHBsYXllcik7XHJcbiAgICB9KTtcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGxheWVyUGxhY2VTaGlwcztcclxuIiwiY2xhc3MgU2hpcCB7XHJcbiAgY29uc3RydWN0b3IobmFtZSwgbGVuZ3RoKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lXHJcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgIHRoaXMudGltZXNIaXQgPSAwO1xyXG4gIH1cclxuXHJcbiAgaGl0KCkge1xyXG4gICAgaWYgKCF0aGlzLmlzU3VuaygpKSB7XHJcbiAgICAgIHRoaXMudGltZXNIaXQgKz0gMTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzU3VuaygpIHtcclxuICAgIHJldHVybiB0aGlzLnRpbWVzSGl0ID09PSB0aGlzLmxlbmd0aDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNoaXA7XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2ZvbnRzL0lUQyBNYWNoaW5lIFJlZ3VsYXIub3RmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi9pbWcvYWxwaGEteC5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBAZm9udC1mYWNlIHtcclxuICBmb250LWZhbWlseTogJ0lUQyBNYWNoaW5lIFJlZ3VsYXInO1xyXG4gIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xyXG59XHJcblxyXG46cm9vdCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogbmF2eTtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XHJcbn1cclxuXHJcbmJvZHkge1xyXG4gIGhlaWdodDogMTAwdmg7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IG1heC1jb250ZW50IDIwMHB4O1xyXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDMwcHg7XHJcbn1cclxuXHJcbmgxIHtcclxuICBmb250LWZhbWlseTogJ0lUQyBNYWNoaW5lIFJlZ3VsYXInLCBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xyXG4gIGZvbnQtc2l6ZTogNHJlbTtcclxufVxyXG5cclxuLmVudGVyLW5hbWUge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMywgbWF4LWNvbnRlbnQpO1xyXG4gIGdhcDogMTBweDtcclxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbmJ1dHRvbiB7XHJcbiAgd2lkdGg6IG1heC1jb250ZW50O1xyXG4gIHBhZGRpbmc6IDVweCAxMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xyXG59XHJcblxyXG4ubWVzc2FnZS1ib3gge1xyXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xyXG4gIGdyaWQtdGVtcGxhdGUtcm93czogbWF4LWNvbnRlbnQgbWF4LWNvbnRlbnQ7XHJcbn1cclxuXHJcbi5hbGwtc2hpcHMge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtYXgtY29udGVudCAyMDBweDtcclxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg1LCA1MHB4KTtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxuICBjb2x1bW4tZ2FwOiAzMHB4O1xyXG4gIG1hcmdpbjogMjBweCAwO1xyXG59XHJcblxyXG4uc2hpcC1kaXYge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgbWFyZ2luOiAxMHB4IDA7XHJcbiAgZ3JpZC1hdXRvLWZsb3c6IGNvbHVtbjtcclxuICBncmlkLWF1dG8tY29sdW1uczogMzBweDtcclxuICBnYXA6IDFweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAganVzdGlmeS1zZWxmOiBzdGFydDtcclxufVxyXG5cclxuLnZlcnRpY2FsIHtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCBtYXgtY29udGVudCk7XHJcbn1cclxuXHJcbi52ZXJ0aWNhbCAuc2hpcC1kaXYge1xyXG4gIGdyaWQtYXV0by1mbG93OiByb3c7XHJcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XHJcbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcclxufVxyXG5cclxuLmFsbC1zaGlwcyBwIHtcclxuICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbi5nYW1lLWNvbnRlbnQge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWF4LWNvbnRlbnQgbWF4LWNvbnRlbnQ7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XHJcbiAgZm9udC1mYW1pbHk6ICdJVEMgTWFjaGluZSBSZWd1bGFyJywgc2Fucy1zZXJpZjtcclxuICBmb250LXNpemU6IDEuNXJlbTtcclxuICBsZXR0ZXItc3BhY2luZzogMnB4O1xyXG59XHJcblxyXG4uYm9hcmQge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xyXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAzMHB4KTtcclxuICBnYXA6IDFweDtcclxufVxyXG5cclxuLmNlbGwge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4uc2hpcCxcclxuLnRlbXAtc2hpcCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcclxuICBoZWlnaHQ6IDMwcHg7XHJcbn1cclxuXHJcbi5hdHRhY2tlZCB7XHJcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fX30pO1xyXG59XHJcblxyXG4uaGl0IHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY2MTYxO1xyXG59XHJcblxyXG4uY2xpY2thYmxlIHtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usa0NBQWtDO0VBQ2xDLDRDQUE2QztBQUMvQzs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixZQUFZO0VBQ1oseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGFBQWE7RUFDYixpREFBaUQ7RUFDakQscUJBQXFCO0VBQ3JCLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGdFQUFnRTtFQUNoRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDBDQUEwQztFQUMxQyxTQUFTO0VBQ1QscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixhQUFhO0VBQ2IscUJBQXFCO0VBQ3JCLDJDQUEyQztBQUM3Qzs7QUFFQTtFQUNFLGFBQWE7RUFDYix3Q0FBd0M7RUFDeEMsbUNBQW1DO0VBQ25DLG1CQUFtQjtFQUNuQixxQkFBcUI7RUFDckIsZ0JBQWdCO0VBQ2hCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsY0FBYztFQUNkLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsUUFBUTtFQUNSLGVBQWU7RUFDZixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSw2Q0FBNkM7QUFDL0M7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsb0JBQW9CO0VBQ3BCLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLDhDQUE4QztFQUM5Qyw2QkFBNkI7RUFDN0IsOENBQThDO0VBQzlDLGlCQUFpQjtFQUNqQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUNBQXVDO0VBQ3ZDLG9DQUFvQztFQUNwQyxRQUFRO0FBQ1Y7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7O0VBRUUsc0JBQXNCO0VBQ3RCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLHlEQUF3QztBQUMxQzs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGVBQWU7QUFDakJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZSB7XFxyXFxuICBmb250LWZhbWlseTogJ0lUQyBNYWNoaW5lIFJlZ3VsYXInO1xcclxcbiAgc3JjOiB1cmwoJy4vZm9udHMvSVRDXFxcXCBNYWNoaW5lXFxcXCBSZWd1bGFyLm90ZicpO1xcclxcbn1cXHJcXG5cXHJcXG46cm9vdCB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBuYXZ5O1xcclxcbiAgY29sb3I6IHdoaXRlO1xcclxcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgaGVpZ2h0OiAxMDB2aDtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IG1heC1jb250ZW50IDIwMHB4O1xcclxcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcclxcbiAgZ2FwOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG5oMSB7XFxyXFxuICBmb250LWZhbWlseTogJ0lUQyBNYWNoaW5lIFJlZ3VsYXInLCBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcclxcbiAgZm9udC1zaXplOiA0cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4uZW50ZXItbmFtZSB7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMywgbWF4LWNvbnRlbnQpO1xcclxcbiAgZ2FwOiAxMHB4O1xcclxcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG5idXR0b24ge1xcclxcbiAgd2lkdGg6IG1heC1jb250ZW50O1xcclxcbiAgcGFkZGluZzogNXB4IDEwcHg7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5tZXNzYWdlLWJveCB7XFxyXFxuICBmb250LXNpemU6IDEuNXJlbTtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IG1heC1jb250ZW50O1xcclxcbn1cXHJcXG5cXHJcXG4uYWxsLXNoaXBzIHtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1heC1jb250ZW50IDIwMHB4O1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNSwgNTBweCk7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcclxcbiAgY29sdW1uLWdhcDogMzBweDtcXHJcXG4gIG1hcmdpbjogMjBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcC1kaXYge1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIG1hcmdpbjogMTBweCAwO1xcclxcbiAgZ3JpZC1hdXRvLWZsb3c6IGNvbHVtbjtcXHJcXG4gIGdyaWQtYXV0by1jb2x1bW5zOiAzMHB4O1xcclxcbiAgZ2FwOiAxcHg7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBqdXN0aWZ5LXNlbGY6IHN0YXJ0O1xcclxcbn1cXHJcXG5cXHJcXG4udmVydGljYWwge1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgbWF4LWNvbnRlbnQpO1xcclxcbn1cXHJcXG5cXHJcXG4udmVydGljYWwgLnNoaXAtZGl2IHtcXHJcXG4gIGdyaWQtYXV0by1mbG93OiByb3c7XFxyXFxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXHJcXG4gIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxyXFxufVxcclxcblxcclxcbi5hbGwtc2hpcHMgcCB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxufVxcclxcblxcclxcbi5nYW1lLWNvbnRlbnQge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtYXgtY29udGVudCBtYXgtY29udGVudDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcclxcbiAgZm9udC1mYW1pbHk6ICdJVEMgTWFjaGluZSBSZWd1bGFyJywgc2Fucy1zZXJpZjtcXHJcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcclxcbiAgbGV0dGVyLXNwYWNpbmc6IDJweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkIHtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxyXFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMzBweCk7XFxyXFxuICBnYXA6IDFweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNlbGwge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxyXFxufVxcclxcblxcclxcbi5zaGlwLFxcclxcbi50ZW1wLXNoaXAge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcXHJcXG4gIGhlaWdodDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmF0dGFja2VkIHtcXHJcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCguL2ltZy9hbHBoYS14LnN2Zyk7XFxyXFxufVxcclxcblxcclxcbi5oaXQge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNjE2MTtcXHJcXG59XFxyXFxuXFxyXFxuLmNsaWNrYWJsZSB7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4uL3N0eWxlLmNzcyc7XHJcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xyXG5pbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcclxuaW1wb3J0IHBsYXllclBsYWNlU2hpcHMgZnJvbSAnLi9wbGF5ZXJQbGFjZVNoaXBzJztcclxuaW1wb3J0IGNvbXB1dGVyUGxhY2VTaGlwcyBmcm9tICcuL2NvbXB1dGVyUGxhY2VTaGlwcyc7XHJcblxyXG5jb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpO1xyXG5sZXQgcGxheWVyO1xyXG5sZXQgc3RhcnRCdXR0b247XHJcbmxldCBpc0dhbWVPdmVyID0gZmFsc2U7XHJcblxyXG5mdW5jdGlvbiBlbmRHYW1lKCkge1xyXG4gIGlmIChpc0dhbWVPdmVyKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGlmIChwbGF5ZXIuY29tcHV0ZXJCb2FyZC5hbGxTdW5rKCkpIHtcclxuICAgIGRvbS5uZXdNZXNzYWdlKCdFbmVteSBmbGVldCBzdW5rISBZb3Ugd2luIScpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBkb20ubmV3TWVzc2FnZSgnWW91ciBmbGVldCB3YXMgc3VuayEgR2FtZSBvdmVyIScpO1xyXG4gIH1cclxuXHJcbiAgZG9tLmFwcGVuZEJvYXJkcyhwbGF5ZXIucGxheWVyQm9hcmQsIHBsYXllci5jb21wdXRlckJvYXJkLCAnZ2FtZSBvdmVyJyk7XHJcbiAgZG9tLmVuZEdhbWUoKTtcclxuXHJcbiAgY29uc3QgZW5lbXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5lbXknKTtcclxuICBjb25zdCBuZXdHYW1lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy1nYW1lJyk7XHJcbiAgZW5lbXkucmVwbGFjZVdpdGgoZW5lbXkuY2xvbmVOb2RlKHRydWUpKTtcclxuICBuZXdHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZG9tLm9wZW5Gb3JtKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGxheVJvdW5kKGUpIHtcclxuICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG5cclxuICBpZiAoXHJcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbGwnKSAmJlxyXG4gICAgIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYXR0YWNrZWQnKVxyXG4gICkge1xyXG4gICAgY29uc3QgeyBjZWxsIH0gPSBlLnRhcmdldC5kYXRhc2V0O1xyXG4gICAgY29uc3QgbWVzc2FnZTEgPSBwbGF5ZXIucGxheWVyTW92ZShbTWF0aC5mbG9vcihjZWxsIC8gMTApLCBjZWxsICUgMTBdKTtcclxuICAgIGNvbnN0IG1lc3NhZ2UyID0gcGxheWVyLmNvbXB1dGVyTW92ZSgpO1xyXG4gICAgZG9tLm5ld01lc3NhZ2UobWVzc2FnZTEsIG1lc3NhZ2UyKTtcclxuICAgIGRvbS5hcHBlbmRCb2FyZHMocGxheWVyLnBsYXllckJvYXJkLCBwbGF5ZXIuY29tcHV0ZXJCb2FyZCwgJ25vcm1hbCBwbGF5Jyk7XHJcbiAgfVxyXG4gIGlmIChwbGF5ZXIucGxheWVyQm9hcmQuYWxsU3VuaygpIHx8IHBsYXllci5jb21wdXRlckJvYXJkLmFsbFN1bmsoKSkge1xyXG4gICAgZW5kR2FtZSgpO1xyXG4gICAgaXNHYW1lT3ZlciA9IHRydWU7XHJcbiAgfVxyXG59XHJcblxyXG5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XHJcbiAgcGxheWVyID0gbmV3IFBsYXllcigpO1xyXG4gIGRvbS5zdGFydEdhbWUoZSk7XHJcbiAgcGxheWVyUGxhY2VTaGlwcy5wbGFjZShwbGF5ZXIpO1xyXG4gIHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0Jyk7XHJcblxyXG4gIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgY29tcHV0ZXJQbGFjZVNoaXBzKHBsYXllci5jb21wdXRlckJvYXJkKTtcclxuICAgIGRvbS5hcHBlbmRCb2FyZHMocGxheWVyLnBsYXllckJvYXJkLCBwbGF5ZXIuY29tcHV0ZXJCb2FyZCwgJ25vcm1hbCBwbGF5Jyk7XHJcbiAgICBkb20ubmV3TWVzc2FnZSgnRmlyZSB3aGVuIHJlYWR5IScpO1xyXG4gICAgXHJcbiAgICBjb25zdCBlbmVteSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbmVteScpO1xyXG4gICAgZW5lbXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGF5Um91bmQpO1xyXG4gICAgc3RhcnRCdXR0b24ucmVtb3ZlKCk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOlsiY29tcHV0ZXJQbGFjZVNoaXBzIiwiY29tcHV0ZXJCb2FyZCIsInNoaXBzIiwibmFtZSIsInNpemUiLCJmb3JFYWNoIiwic2hpcCIsImtlZXBHb2luZyIsImlzVmVydGljYWwiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyb3ciLCJmaXJzdENvbHVtbiIsImFsbEVtcHR5IiwiaSIsImN1cnJlbnRDZWxsIiwiYm9hcmQiLCJjb29yZGluYXRlcyIsInB1c2giLCJwbGFjZVNoaXAiLCJmaXJzdFJvdyIsImNvbHVtbiIsImNvb3JkUGFpckluQXJyYXkiLCJjb29yZFBhaXIiLCJhcnIiLCJsZW5ndGgiLCJkb20iLCJzdGFydEdhbWUiLCJlIiwicHJldmVudERlZmF1bHQiLCJuYW1lSW5wdXQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ2YWx1ZSIsInRhcmdldCIsInJlc2V0IiwiZm9ybSIsInN0eWxlIiwiZGlzcGxheSIsIm1lc3NhZ2VCb3giLCJjcmVhdGVFbGVtZW50IiwibWVzc2FnZVAxIiwibWVzc2FnZVAyIiwiZ2FtZUNvbnRlbnQiLCJwbGF5ZXJDb250ZW50IiwiZW5lbXlDb250ZW50IiwicGxheWVyQ2FwdGlvbiIsImVuZW15Q2FwdGlvbiIsInBsYXllckJvYXJkQ29udGFpbmVyIiwiZW5lbXlCb2FyZENvbnRhaW5lciIsImNsYXNzTGlzdCIsImFkZCIsInNldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiYXBwZW5kQ2hpbGQiLCJib2R5IiwiaW5zZXJ0QmVmb3JlIiwiZW5kR2FtZSIsIm5ld0dhbWVCdXR0b24iLCJvcGVuRm9ybSIsInJlbW92ZSIsImJ1aWxkQm9hcmQiLCJnYW1lYm9hcmQiLCJ0eXBlIiwiY29uZGl0aW9uIiwiY2VsbCIsImRhdGFzZXQiLCJjb250YWlucyIsImoiLCJwcmV2aW91c0F0dGFja3MiLCJhcHBlbmRCb2FyZHMiLCJwbGF5ZXJCb2FyZCIsInBsYXllckJvYXJkTm9kZSIsImNvbXB1dGVyQm9hcmROb2RlIiwiYm9hcmRDb250YWluZXJzIiwicXVlcnlTZWxlY3RvckFsbCIsIm5ld01lc3NhZ2UiLCJtZXNzYWdlMSIsIm1lc3NhZ2UyIiwibWVzc2FnZVBzIiwiU2hpcCIsIkdhbWVib2FyZCIsImNvbnN0cnVjdG9yIiwidGVtcCIsImN1cnJlbnRTaGlwIiwicmVjZWl2ZUF0dGFjayIsImhpdCIsImFsbFN1bmsiLCJpc1N1bmsiLCJpblByZXZpb3VzQXR0YWNrcyIsIlBsYXllciIsInBvc3NpYmxlSGl0cyIsInNlYXJjaCIsInBsYXllck1vdmUiLCJtZXNzYWdlIiwiZW5lbXlNZXNzYWdlIiwicHVzaERpcmVjdGlvbnMiLCJzZWFyY2hBbmREZXN0cm95Iiwic2hpZnQiLCJjb21wdXRlck1vdmUiLCJwbGF5ZXJQbGFjZVNoaXBzIiwiaW5GbGVldCIsInNoaXBzUGxhY2VkIiwic3RhcnRCdXR0b24iLCJyb3RhdGVCdXR0b24iLCJhbGxTaGlwcyIsImRyb3BIYW5kbGVyIiwicGxheWVyIiwiZGF0YSIsImRhdGFUcmFuc2ZlciIsImdldERhdGEiLCJzaGlwRGl2IiwiY2hpbGRFbGVtZW50Q291bnQiLCJsaXN0Iiwic2hpcE5hbWUiLCJmaW5kIiwiY3JlYXRlU2hpcHMiLCJhcHBlbmQiLCJpZE5hbWUiLCJhZGRFdmVudExpc3RlbmVyIiwic2V0RGF0YSIsImlkIiwicGxhY2UiLCJ0aW1lc0hpdCIsImlzR2FtZU92ZXIiLCJlbmVteSIsInJlcGxhY2VXaXRoIiwiY2xvbmVOb2RlIiwicGxheVJvdW5kIiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==