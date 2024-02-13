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
// });

const startButton = document.querySelector('.start');
startButton.addEventListener('click', () => {
  (0,_computerPlaceShips__WEBPACK_IMPORTED_MODULE_4__["default"])(player.computerBoard);
  _dom__WEBPACK_IMPORTED_MODULE_2__["default"].appendBoards(player.playerBoard, player.computerBoard, 'normal play');
  _dom__WEBPACK_IMPORTED_MODULE_2__["default"].newMessage('Fire when ready!');
  const enemy = document.querySelector('#enemy');
  enemy.addEventListener('click', playRound);
  startButton.remove();
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLGtCQUFrQkEsQ0FBQ0MsYUFBYSxFQUFFO0VBQ3pDLE1BQU1DLEtBQUssR0FBRyxDQUNaO0lBQUVDLElBQUksRUFBRSxTQUFTO0lBQUVDLElBQUksRUFBRTtFQUFFLENBQUMsRUFDNUI7SUFBRUQsSUFBSSxFQUFFLFlBQVk7SUFBRUMsSUFBSSxFQUFFO0VBQUUsQ0FBQyxFQUMvQjtJQUFFRCxJQUFJLEVBQUUsV0FBVztJQUFFQyxJQUFJLEVBQUU7RUFBRSxDQUFDLEVBQzlCO0lBQUVELElBQUksRUFBRSxXQUFXO0lBQUVDLElBQUksRUFBRTtFQUFFLENBQUMsRUFDOUI7SUFBRUQsSUFBSSxFQUFFLGFBQWE7SUFBRUMsSUFBSSxFQUFFO0VBQUUsQ0FBQyxDQUNqQztFQUVERixLQUFLLENBQUNHLE9BQU8sQ0FBRUMsSUFBSSxJQUFLO0lBQ3RCLElBQUlDLFNBQVMsR0FBRyxJQUFJO0lBRXBCLE9BQU9BLFNBQVMsRUFBRTtNQUNoQixNQUFNQyxVQUFVLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO01BRWhELElBQUlILFVBQVUsS0FBSyxDQUFDLEVBQUU7UUFDcEIsTUFBTUksR0FBRyxHQUFHSCxJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFDRSxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMxQyxNQUFNRSxXQUFXLEdBQUdKLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHTCxJQUFJLENBQUNGLElBQUksQ0FBQyxDQUFDO1FBQ2hFLElBQUlVLFFBQVEsR0FBRyxJQUFJO1FBRW5CLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxJQUFJVCxJQUFJLENBQUNGLElBQUksRUFBRVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtVQUN0QyxNQUFNQyxXQUFXLEdBQUdmLGFBQWEsQ0FBQ2dCLEtBQUssQ0FBQ0wsR0FBRyxDQUFDLENBQUNDLFdBQVcsR0FBR0UsQ0FBQyxDQUFDO1VBRTdELElBQUksT0FBT0MsV0FBVyxLQUFLLFFBQVEsRUFBRTtZQUNuQ0YsUUFBUSxHQUFHLEtBQUs7WUFDaEI7VUFDRjtRQUNGO1FBRUEsSUFBSUEsUUFBUSxFQUFFO1VBQ1osTUFBTUksV0FBVyxHQUFHLEVBQUU7VUFFdEIsS0FBSyxJQUFJSCxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdULElBQUksQ0FBQ0YsSUFBSSxFQUFFVyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3JDRyxXQUFXLENBQUNDLElBQUksQ0FBQyxDQUFDUCxHQUFHLEVBQUVDLFdBQVcsR0FBR0UsQ0FBQyxDQUFDLENBQUM7VUFDMUM7VUFFQWQsYUFBYSxDQUFDbUIsU0FBUyxDQUFDZCxJQUFJLENBQUNILElBQUksRUFBRWUsV0FBVyxDQUFDO1FBQ2pEO1FBRUFYLFNBQVMsR0FBRyxDQUFDTyxRQUFRO01BQ3ZCLENBQUMsTUFBTTtRQUNMLE1BQU1PLFFBQVEsR0FBR1osSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUdMLElBQUksQ0FBQ0YsSUFBSSxDQUFDLENBQUM7UUFDN0QsTUFBTWtCLE1BQU0sR0FBR2IsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDN0MsSUFBSUcsUUFBUSxHQUFHLElBQUk7UUFFbkIsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLElBQUlULElBQUksQ0FBQ0YsSUFBSSxFQUFFVyxDQUFDLElBQUksQ0FBQyxFQUFFO1VBQ3RDLE1BQU1DLFdBQVcsR0FBR2YsYUFBYSxDQUFDZ0IsS0FBSyxDQUFDSSxRQUFRLEdBQUdOLENBQUMsQ0FBQyxDQUFDTyxNQUFNLENBQUM7VUFFN0QsSUFBSSxPQUFPTixXQUFXLEtBQUssUUFBUSxFQUFFO1lBQ25DRixRQUFRLEdBQUcsS0FBSztZQUNoQjtVQUNGO1FBQ0Y7UUFFQSxJQUFJQSxRQUFRLEVBQUU7VUFDWixNQUFNSSxXQUFXLEdBQUcsRUFBRTtVQUV0QixLQUFLLElBQUlILENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR1QsSUFBSSxDQUFDRixJQUFJLEVBQUVXLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDckNHLFdBQVcsQ0FBQ0MsSUFBSSxDQUFDLENBQUNFLFFBQVEsR0FBR04sQ0FBQyxFQUFFTyxNQUFNLENBQUMsQ0FBQztVQUMxQztVQUVBckIsYUFBYSxDQUFDbUIsU0FBUyxDQUFDZCxJQUFJLENBQUNILElBQUksRUFBRWUsV0FBVyxDQUFDO1FBQ2pEO1FBRUFYLFNBQVMsR0FBRyxDQUFDTyxRQUFRO01BQ3ZCO0lBQ0Y7RUFDRixDQUFDLENBQUM7QUFDSjtBQUVBLGlFQUFlZCxrQkFBa0I7Ozs7Ozs7Ozs7Ozs7O0FDdEVqQyxNQUFNdUIsR0FBRyxHQUFHO0VBQ1ZDLFNBQVNBLENBQUNDLENBQUMsRUFBRTtJQUNYQSxDQUFDLENBQUNDLGNBQWMsQ0FBQyxDQUFDO0lBQ2xCLE1BQU1DLFNBQVMsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsT0FBTyxDQUFDO0lBQ2pELE1BQU0xQixJQUFJLEdBQUd3QixTQUFTLENBQUNHLEtBQUs7SUFDNUJMLENBQUMsQ0FBQ00sTUFBTSxDQUFDQyxLQUFLLENBQUMsQ0FBQztJQUVoQixNQUFNQyxJQUFJLEdBQUdMLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLE1BQU0sQ0FBQztJQUMzQ0ksSUFBSSxDQUFDQyxLQUFLLENBQUNDLE9BQU8sR0FBRyxNQUFNO0lBRTNCLE1BQU1DLFVBQVUsR0FBR1IsUUFBUSxDQUFDUyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ2hELE1BQU1DLFFBQVEsR0FBR1YsUUFBUSxDQUFDUyxhQUFhLENBQUMsR0FBRyxDQUFDO0lBQzVDLE1BQU1FLFdBQVcsR0FBR1gsUUFBUSxDQUFDUyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ2pELE1BQU1HLGFBQWEsR0FBR1osUUFBUSxDQUFDUyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ25ELE1BQU1JLFlBQVksR0FBR2IsUUFBUSxDQUFDUyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ2xELE1BQU1LLGFBQWEsR0FBR2QsUUFBUSxDQUFDUyxhQUFhLENBQUMsSUFBSSxDQUFDO0lBQ2xELE1BQU1NLFlBQVksR0FBR2YsUUFBUSxDQUFDUyxhQUFhLENBQUMsSUFBSSxDQUFDO0lBQ2pELE1BQU1PLG9CQUFvQixHQUFHaEIsUUFBUSxDQUFDUyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQzFELE1BQU1RLG1CQUFtQixHQUFHakIsUUFBUSxDQUFDUyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBRXpERCxVQUFVLENBQUNVLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGFBQWEsQ0FBQztJQUN2Q1IsV0FBVyxDQUFDTyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxjQUFjLENBQUM7SUFDekNQLGFBQWEsQ0FBQ00sU0FBUyxDQUFDQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7SUFDN0NOLFlBQVksQ0FBQ0ssU0FBUyxDQUFDQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7SUFDNUNMLGFBQWEsQ0FBQ0ksU0FBUyxDQUFDQyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBQ3RDSixZQUFZLENBQUNHLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUNyQ0gsb0JBQW9CLENBQUNJLFlBQVksQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUM7SUFDN0RKLG9CQUFvQixDQUFDSSxZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQztJQUNqREgsbUJBQW1CLENBQUNHLFlBQVksQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUM7SUFDNURILG1CQUFtQixDQUFDRyxZQUFZLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQztJQUUvQ04sYUFBYSxDQUFDTyxXQUFXLEdBQUc5QyxJQUFJLEdBQUksR0FBRUEsSUFBSyxVQUFTLEdBQUcsZ0JBQWdCO0lBQ3ZFd0MsWUFBWSxDQUFDTSxXQUFXLEdBQUksYUFBWTtJQUV4Q2IsVUFBVSxDQUFDYyxXQUFXLENBQUNaLFFBQVEsQ0FBQztJQUNoQ0UsYUFBYSxDQUFDVSxXQUFXLENBQUNSLGFBQWEsQ0FBQztJQUN4Q0YsYUFBYSxDQUFDVSxXQUFXLENBQUNOLG9CQUFvQixDQUFDO0lBQy9DSCxZQUFZLENBQUNTLFdBQVcsQ0FBQ1AsWUFBWSxDQUFDO0lBQ3RDRixZQUFZLENBQUNTLFdBQVcsQ0FBQ0wsbUJBQW1CLENBQUM7SUFDN0NOLFdBQVcsQ0FBQ1csV0FBVyxDQUFDVixhQUFhLENBQUM7SUFDdENELFdBQVcsQ0FBQ1csV0FBVyxDQUFDVCxZQUFZLENBQUM7SUFDckNiLFFBQVEsQ0FBQ3VCLElBQUksQ0FBQ0MsWUFBWSxDQUFDaEIsVUFBVSxFQUFFSCxJQUFJLENBQUM7SUFDNUNMLFFBQVEsQ0FBQ3VCLElBQUksQ0FBQ0MsWUFBWSxDQUFDYixXQUFXLEVBQUVILFVBQVUsQ0FBQztFQUNyRCxDQUFDO0VBRURpQixPQUFPQSxDQUFBLEVBQUc7SUFDUixNQUFNakIsVUFBVSxHQUFHUixRQUFRLENBQUNDLGFBQWEsQ0FBQyxjQUFjLENBQUM7SUFDekQsTUFBTXlCLGFBQWEsR0FBRzFCLFFBQVEsQ0FBQ1MsYUFBYSxDQUFDLFFBQVEsQ0FBQztJQUN0RGlCLGFBQWEsQ0FBQ1IsU0FBUyxDQUFDQyxHQUFHLENBQUMsVUFBVSxDQUFDO0lBQ3ZDTyxhQUFhLENBQUNMLFdBQVcsR0FBRyxVQUFVO0lBQ3RDYixVQUFVLENBQUNjLFdBQVcsQ0FBQ0ksYUFBYSxDQUFDO0VBQ3ZDLENBQUM7RUFFREMsUUFBUUEsQ0FBQSxFQUFHO0lBQ1QsTUFBTW5CLFVBQVUsR0FBR1IsUUFBUSxDQUFDQyxhQUFhLENBQUMsY0FBYyxDQUFDO0lBQ3pELE1BQU1VLFdBQVcsR0FBR1gsUUFBUSxDQUFDQyxhQUFhLENBQUMsZUFBZSxDQUFDO0lBQzNELE1BQU1JLElBQUksR0FBR0wsUUFBUSxDQUFDQyxhQUFhLENBQUMsTUFBTSxDQUFDO0lBQzNDTyxVQUFVLENBQUNvQixNQUFNLENBQUMsQ0FBQztJQUNuQmpCLFdBQVcsQ0FBQ2lCLE1BQU0sQ0FBQyxDQUFDO0lBQ3BCdkIsSUFBSSxDQUFDQyxLQUFLLENBQUNDLE9BQU8sR0FBRyxPQUFPO0VBQzlCLENBQUM7RUFFRHNCLFVBQVVBLENBQUNDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxTQUFTLEVBQUU7SUFDckMsTUFBTTNDLEtBQUssR0FBR1csUUFBUSxDQUFDUyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQzNDcEIsS0FBSyxDQUFDNkIsU0FBUyxDQUFDQyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBRTVCLEtBQUssSUFBSWhDLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxHQUFHLEVBQUVBLENBQUMsSUFBSSxDQUFDLEVBQUU7TUFDL0IsTUFBTThDLElBQUksR0FBR2pDLFFBQVEsQ0FBQ1MsYUFBYSxDQUFDLEtBQUssQ0FBQztNQUMxQ3dCLElBQUksQ0FBQ2YsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO01BQzFCYyxJQUFJLENBQUNDLE9BQU8sQ0FBQ0QsSUFBSSxHQUFHOUMsQ0FBQztNQUVyQixJQUNFLE9BQU8yQyxTQUFTLENBQUN6QyxLQUFLLENBQUNSLElBQUksQ0FBQ0MsS0FBSyxDQUFDSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQ0EsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLFFBQVEsS0FDOUQ0QyxJQUFJLEtBQUssUUFBUSxJQUFJQyxTQUFTLEtBQUssV0FBVyxDQUFDLEVBQ2hEO1FBQ0FDLElBQUksQ0FBQ2YsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO01BQzVCO01BQ0EsSUFDRVksSUFBSSxLQUFLLFVBQVUsSUFDbkJDLFNBQVMsS0FBSyxhQUFhLElBQzNCLENBQUNDLElBQUksQ0FBQ2YsU0FBUyxDQUFDaUIsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUNwQztRQUNBRixJQUFJLENBQUNmLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFdBQVcsQ0FBQztNQUNqQztNQUVBLEtBQUssSUFBSWlCLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR04sU0FBUyxDQUFDTyxlQUFlLENBQUNDLE1BQU0sRUFBRUYsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUM1RCxJQUNFTixTQUFTLENBQUNPLGVBQWUsQ0FBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUt2RCxJQUFJLENBQUNDLEtBQUssQ0FBQ0ssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUN0RDJDLFNBQVMsQ0FBQ08sZUFBZSxDQUFDRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBS2pELENBQUMsR0FBRyxFQUFFLEVBQzFDO1VBQ0E4QyxJQUFJLENBQUNmLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztVQUU5QixJQUFJLE9BQU9XLFNBQVMsQ0FBQ3pDLEtBQUssQ0FBQ1IsSUFBSSxDQUFDQyxLQUFLLENBQUNLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDQSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQ25FOEMsSUFBSSxDQUFDZixTQUFTLENBQUNDLEdBQUcsQ0FBQyxLQUFLLENBQUM7VUFDM0I7UUFDRjtNQUNGO01BRUE5QixLQUFLLENBQUNpQyxXQUFXLENBQUNXLElBQUksQ0FBQztJQUN6QjtJQUVBLE9BQU81QyxLQUFLO0VBQ2QsQ0FBQztFQUVEa0QsWUFBWUEsQ0FBQ0MsV0FBVyxFQUFFbkUsYUFBYSxFQUFFMkQsU0FBUyxFQUFFO0lBQ2xELE1BQU1TLGVBQWUsR0FBRzlDLEdBQUcsQ0FBQ2tDLFVBQVUsQ0FBQ1csV0FBVyxFQUFFLFFBQVEsRUFBRVIsU0FBUyxDQUFDO0lBQ3hFLE1BQU1VLGlCQUFpQixHQUFHL0MsR0FBRyxDQUFDa0MsVUFBVSxDQUN0Q3hELGFBQWEsRUFDYixVQUFVLEVBQ1YyRCxTQUNGLENBQUM7SUFFRCxNQUFNVyxlQUFlLEdBQUczQyxRQUFRLENBQUM0QyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQztJQUNyRUQsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDdEIsV0FBVyxHQUFHLEVBQUU7SUFDbkNzQixlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUN0QixXQUFXLEdBQUcsRUFBRTtJQUNuQ3NCLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQ3JCLFdBQVcsQ0FBQ21CLGVBQWUsQ0FBQztJQUMvQ0UsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDckIsV0FBVyxDQUFDb0IsaUJBQWlCLENBQUM7RUFDbkQsQ0FBQztFQUVERyxVQUFVQSxDQUFDQyxPQUFPLEVBQUU7SUFDbEIsTUFBTXBDLFFBQVEsR0FBR1YsUUFBUSxDQUFDQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7SUFDekRTLFFBQVEsQ0FBQ1csV0FBVyxHQUFHeUIsT0FBTztFQUNoQztBQUNGLENBQUM7QUFFRCxpRUFBZW5ELEdBQUc7Ozs7Ozs7Ozs7Ozs7OztBQzdIUTtBQUUxQixNQUFNcUQsU0FBUyxDQUFDO0VBQ2RDLFdBQVdBLENBQUEsRUFBRztJQUNaLElBQUksQ0FBQzVELEtBQUssR0FBRyxFQUFFO0lBQ2YsSUFBSSxDQUFDZ0QsZUFBZSxHQUFHLEVBQUU7SUFFekIsS0FBSyxJQUFJbEQsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLEVBQUUsRUFBRUEsQ0FBQyxJQUFJLENBQUMsRUFBRTtNQUM5QixNQUFNK0QsSUFBSSxHQUFHLEVBQUU7TUFFZixLQUFLLElBQUlkLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDOUJjLElBQUksQ0FBQzNELElBQUksQ0FBQyxPQUFPLENBQUM7TUFDcEI7TUFFQSxJQUFJLENBQUNGLEtBQUssQ0FBQ0UsSUFBSSxDQUFDMkQsSUFBSSxDQUFDO0lBQ3ZCO0VBQ0Y7RUFFQTFELFNBQVNBLENBQUNqQixJQUFJLEVBQUVlLFdBQVcsRUFBRTtJQUMzQixNQUFNNkQsV0FBVyxHQUFHLElBQUlKLDZDQUFJLENBQUN4RSxJQUFJLEVBQUVlLFdBQVcsQ0FBQ2dELE1BQU0sQ0FBQztJQUV0RGhELFdBQVcsQ0FBQ2IsT0FBTyxDQUFFMkUsU0FBUyxJQUFLO01BQ2pDLElBQUksQ0FBQy9ELEtBQUssQ0FBQytELFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0QsV0FBVztJQUN0RCxDQUFDLENBQUM7RUFDSjtFQUVBRSxhQUFhQSxDQUFDRCxTQUFTLEVBQUU7SUFDdkIsSUFBSSxDQUFDZixlQUFlLENBQUM5QyxJQUFJLENBQUM2RCxTQUFTLENBQUM7SUFDcEMsTUFBTW5CLElBQUksR0FBRyxJQUFJLENBQUM1QyxLQUFLLENBQUMrRCxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRW5ELElBQUksT0FBT25CLElBQUksS0FBSyxRQUFRLEVBQUU7TUFDNUJBLElBQUksQ0FBQ3FCLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQyxNQUFNO01BQ0wsSUFBSSxDQUFDakUsS0FBSyxDQUFDK0QsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNBLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU07SUFDakQ7RUFDRjtFQUVBRyxPQUFPQSxDQUFBLEVBQUc7SUFDUixLQUFLLElBQUlwRSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsRUFBRSxFQUFFQSxDQUFDLElBQUksQ0FBQyxFQUFFO01BQzlCLEtBQUssSUFBSWlELENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDOUIsSUFDRSxPQUFPLElBQUksQ0FBQy9DLEtBQUssQ0FBQ0YsQ0FBQyxDQUFDLENBQUNpRCxDQUFDLENBQUMsS0FBSyxRQUFRLElBQ3BDLENBQUMsSUFBSSxDQUFDL0MsS0FBSyxDQUFDRixDQUFDLENBQUMsQ0FBQ2lELENBQUMsQ0FBQyxDQUFDb0IsTUFBTSxDQUFDLENBQUMsRUFDMUI7VUFDQSxPQUFPLEtBQUs7UUFDZDtNQUNGO0lBQ0Y7SUFFQSxPQUFPLElBQUk7RUFDYjtFQUVBQyxpQkFBaUJBLENBQUNMLFNBQVMsRUFBRTtJQUMzQixLQUFLLElBQUlqRSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsSUFBSSxDQUFDa0QsZUFBZSxDQUFDQyxNQUFNLEVBQUVuRCxDQUFDLElBQUksQ0FBQyxFQUFFO01BQ3ZELElBQ0UsSUFBSSxDQUFDa0QsZUFBZSxDQUFDbEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUtpRSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQzNDLElBQUksQ0FBQ2YsZUFBZSxDQUFDbEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUtpRSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQzNDO1FBQ0EsT0FBTyxJQUFJO01BQ2I7SUFDRjtJQUVBLE9BQU8sS0FBSztFQUNkO0FBQ0Y7QUFFQSxpRUFBZUosU0FBUzs7Ozs7Ozs7Ozs7Ozs7O0FDbEVZO0FBRXBDLE1BQU1VLE1BQU0sQ0FBQztFQUNYVCxXQUFXQSxDQUFBLEVBQUc7SUFDWixJQUFJLENBQUNULFdBQVcsR0FBRyxJQUFJUSxrREFBUyxDQUFDLENBQUM7SUFDbEMsSUFBSSxDQUFDM0UsYUFBYSxHQUFHLElBQUkyRSxrREFBUyxDQUFDLENBQUM7RUFDdEM7RUFFQVcsVUFBVUEsQ0FBQ1AsU0FBUyxFQUFFO0lBQ3BCLElBQUksQ0FBQy9FLGFBQWEsQ0FBQ2dGLGFBQWEsQ0FBQ0QsU0FBUyxDQUFDO0lBQzNDLE1BQU1uQixJQUFJLEdBQUcsSUFBSSxDQUFDNUQsYUFBYSxDQUFDZ0IsS0FBSyxDQUFDK0QsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNBLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRSxJQUFJTixPQUFPLEdBQUcsc0JBQXNCO0lBRXBDLElBQUksT0FBT2IsSUFBSSxLQUFLLFFBQVEsRUFBRTtNQUM1QmEsT0FBTyxHQUFHLG9CQUFvQjtNQUU5QixJQUFJYixJQUFJLENBQUN1QixNQUFNLEVBQUU7UUFDZlYsT0FBTyxHQUFJLEdBQUVBLE9BQVEseUJBQXdCYixJQUFJLENBQUMxRCxJQUFLLEdBQUU7TUFDM0Q7SUFDRjtJQUVBLE9BQU91RSxPQUFPO0VBQ2hCO0VBRUFjLFlBQVlBLENBQUEsRUFBRztJQUNiLElBQUk1RSxHQUFHLEdBQUdILElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3hDLElBQUlXLE1BQU0sR0FBR2IsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFM0MsT0FBTyxJQUFJLENBQUN5RCxXQUFXLENBQUNpQixpQkFBaUIsQ0FBQyxDQUFDekUsR0FBRyxFQUFFVSxNQUFNLENBQUMsQ0FBQyxFQUFFO01BQ3hEVixHQUFHLEdBQUdILElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO01BQ3BDVyxNQUFNLEdBQUdiLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3pDO0lBRUEsSUFBSSxDQUFDeUQsV0FBVyxDQUFDYSxhQUFhLENBQUMsQ0FBQ3JFLEdBQUcsRUFBRVUsTUFBTSxDQUFDLENBQUM7RUFDL0M7QUFDRjtBQUVBLGlFQUFlZ0UsTUFBTTs7Ozs7Ozs7Ozs7Ozs7O0FDckNHO0FBRXhCLE1BQU1HLGdCQUFnQixHQUFHO0VBQ3ZCakYsVUFBVSxFQUFFLEtBQUs7RUFFakJOLEtBQUssRUFBRSxDQUNMO0lBQUVDLElBQUksRUFBRSxTQUFTO0lBQUVDLElBQUksRUFBRSxDQUFDO0lBQUVzRixPQUFPLEVBQUU7RUFBTSxDQUFDLEVBQzVDO0lBQUV2RixJQUFJLEVBQUUsWUFBWTtJQUFFQyxJQUFJLEVBQUUsQ0FBQztJQUFFc0YsT0FBTyxFQUFFO0VBQU0sQ0FBQyxFQUMvQztJQUFFdkYsSUFBSSxFQUFFLFdBQVc7SUFBRUMsSUFBSSxFQUFFLENBQUM7SUFBRXNGLE9BQU8sRUFBRTtFQUFNLENBQUMsRUFDOUM7SUFBRXZGLElBQUksRUFBRSxXQUFXO0lBQUVDLElBQUksRUFBRSxDQUFDO0lBQUVzRixPQUFPLEVBQUU7RUFBTSxDQUFDLEVBQzlDO0lBQUV2RixJQUFJLEVBQUUsYUFBYTtJQUFFQyxJQUFJLEVBQUUsQ0FBQztJQUFFc0YsT0FBTyxFQUFFO0VBQU0sQ0FBQyxDQUNqRDtFQUVEQyxXQUFXQSxDQUFBLEVBQUc7SUFDWixNQUFNQyxXQUFXLEdBQUdoRSxRQUFRLENBQUNDLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFDcEQsTUFBTWdFLFlBQVksR0FBR2pFLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFNBQVMsQ0FBQztJQUN0RCxNQUFNaUUsUUFBUSxHQUFHbEUsUUFBUSxDQUFDQyxhQUFhLENBQUMsWUFBWSxDQUFDO0lBQ3JEZ0UsWUFBWSxDQUFDckMsTUFBTSxDQUFDLENBQUM7SUFDckJzQyxRQUFRLENBQUN0QyxNQUFNLENBQUMsQ0FBQztJQUNqQm9DLFdBQVcsQ0FBQzFELEtBQUssQ0FBQ0MsT0FBTyxHQUFHLFFBQVE7RUFDdEMsQ0FBQztFQUVENEQsV0FBV0EsQ0FBQ3RFLENBQUMsRUFBRXVFLE1BQU0sRUFBRTtJQUNyQnZFLENBQUMsQ0FBQ0MsY0FBYyxDQUFDLENBQUM7SUFDbEIsTUFBTXVFLElBQUksR0FBR3hFLENBQUMsQ0FBQ3lFLFlBQVksQ0FBQ0MsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUMzQyxNQUFNQyxPQUFPLEdBQUd4RSxRQUFRLENBQUNDLGFBQWEsQ0FBRSxJQUFHb0UsSUFBSyxFQUFDLENBQUM7SUFDbEQsTUFBTTdGLElBQUksR0FBR2dHLE9BQU8sQ0FBQ0MsaUJBQWlCO0lBQ3RDLE1BQU1DLElBQUksR0FBRzdFLENBQUMsQ0FBQ00sTUFBTSxDQUFDZSxTQUFTO0lBQy9CLE1BQU07TUFBRWU7SUFBSyxDQUFDLEdBQUdwQyxDQUFDLENBQUNNLE1BQU0sQ0FBQytCLE9BQU87SUFFakMsSUFDRyxDQUFDLElBQUksQ0FBQ3RELFVBQVUsSUFBS3FELElBQUksR0FBRyxFQUFFLEdBQUl6RCxJQUFJLEdBQUcsRUFBRSxJQUMzQyxJQUFJLENBQUNJLFVBQVUsSUFBSUMsSUFBSSxDQUFDQyxLQUFLLENBQUNtRCxJQUFJLEdBQUcsRUFBRSxDQUFDLEdBQUd6RCxJQUFJLEdBQUcsRUFBRyxJQUN0RCxDQUFDa0csSUFBSSxDQUFDdkMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUN0QnVDLElBQUksQ0FBQ3ZDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFDckI7TUFDQXVDLElBQUksQ0FBQzlDLE1BQU0sQ0FBQyxXQUFXLENBQUM7TUFDeEI7SUFDRjtJQUVBLE1BQU10QyxXQUFXLEdBQUcsRUFBRTtJQUV0QixLQUFLLElBQUlILENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR1gsSUFBSSxFQUFFVyxDQUFDLElBQUksQ0FBQyxFQUFFO01BQ2hDLElBQUksQ0FBQyxJQUFJLENBQUNQLFVBQVUsRUFBRTtRQUNwQlUsV0FBVyxDQUFDQyxJQUFJLENBQUMsQ0FBQ1YsSUFBSSxDQUFDQyxLQUFLLENBQUNtRCxJQUFJLEdBQUcsRUFBRSxDQUFDLEVBQUdBLElBQUksR0FBRyxFQUFFLEdBQUk5QyxDQUFDLENBQUMsQ0FBQztNQUM1RCxDQUFDLE1BQU07UUFDTEcsV0FBVyxDQUFDQyxJQUFJLENBQUMsQ0FBQ1YsSUFBSSxDQUFDQyxLQUFLLENBQUNtRCxJQUFJLEdBQUcsRUFBRSxDQUFDLEdBQUc5QyxDQUFDLEVBQUU4QyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7TUFDMUQ7SUFDRjtJQUVBbUMsTUFBTSxDQUFDNUIsV0FBVyxDQUFDaEQsU0FBUyxDQUFDNkUsSUFBSSxFQUFFL0UsV0FBVyxDQUFDO0lBQy9Da0YsT0FBTyxDQUFDbkQsV0FBVyxHQUFHLEVBQUU7SUFDeEIxQiw0Q0FBRyxDQUFDNEMsWUFBWSxDQUFDNkIsTUFBTSxDQUFDNUIsV0FBVyxFQUFFNEIsTUFBTSxDQUFDL0YsYUFBYSxFQUFFLGNBQWMsQ0FBQztJQUUxRSxNQUFNc0csUUFBUSxHQUFHTixJQUFJLEtBQUssYUFBYSxHQUFHLGFBQWEsR0FBR0EsSUFBSTtJQUM5RCxNQUFNbEIsV0FBVyxHQUFHLElBQUksQ0FBQzdFLEtBQUssQ0FBQ3NHLElBQUksQ0FBRWxHLElBQUksSUFBS0EsSUFBSSxDQUFDSCxJQUFJLEtBQUtvRyxRQUFRLENBQUM7SUFDckV4QixXQUFXLENBQUNXLE9BQU8sR0FBRyxJQUFJO0lBRTFCLEtBQUssSUFBSTNFLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxJQUFJLENBQUNiLEtBQUssQ0FBQ2dFLE1BQU0sRUFBRW5ELENBQUMsSUFBSSxDQUFDLEVBQUU7TUFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQ2IsS0FBSyxDQUFDYSxDQUFDLENBQUMsQ0FBQzJFLE9BQU8sRUFBRTtRQUMxQjtNQUNGO0lBQ0Y7SUFFQSxJQUFJLENBQUNDLFdBQVcsQ0FBQyxDQUFDO0VBQ3BCLENBQUM7RUFFRGMsV0FBV0EsQ0FBQSxFQUFHO0lBQ1osTUFBTVgsUUFBUSxHQUFHbEUsUUFBUSxDQUFDQyxhQUFhLENBQUMsWUFBWSxDQUFDO0lBRXJELElBQUksSUFBSSxDQUFDckIsVUFBVSxFQUFFO01BQ25Cc0YsUUFBUSxDQUFDaEQsU0FBUyxDQUFDQyxHQUFHLENBQUMsVUFBVSxDQUFDO0lBQ3BDLENBQUMsTUFBTTtNQUNMK0MsUUFBUSxDQUFDaEQsU0FBUyxDQUFDVSxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3ZDO0lBRUEsSUFBSSxJQUFJLENBQUNoRCxVQUFVLEVBQUU7TUFDbkIsSUFBSSxDQUFDTixLQUFLLENBQUNHLE9BQU8sQ0FBRUMsSUFBSSxJQUFLO1FBQzNCLE1BQU1pRyxRQUFRLEdBQUczRSxRQUFRLENBQUNTLGFBQWEsQ0FBQyxHQUFHLENBQUM7UUFDNUNrRSxRQUFRLENBQUN0RCxXQUFXLEdBQUczQyxJQUFJLENBQUNILElBQUk7UUFDaEMyRixRQUFRLENBQUNZLE1BQU0sQ0FBQ0gsUUFBUSxDQUFDO01BQzNCLENBQUMsQ0FBQztJQUNKO0lBRUEsSUFBSSxDQUFDckcsS0FBSyxDQUFDRyxPQUFPLENBQUVDLElBQUksSUFBSztNQUMzQixNQUFNOEYsT0FBTyxHQUFHeEUsUUFBUSxDQUFDUyxhQUFhLENBQUMsS0FBSyxDQUFDO01BQzdDK0QsT0FBTyxDQUFDdEQsU0FBUyxDQUFDQyxHQUFHLENBQUMsVUFBVSxDQUFDO01BQ2pDLE1BQU00RCxNQUFNLEdBQUdyRyxJQUFJLENBQUNILElBQUksS0FBSyxhQUFhLEdBQUcsYUFBYSxHQUFHRyxJQUFJLENBQUNILElBQUk7TUFDdEVpRyxPQUFPLENBQUNwRCxZQUFZLENBQUMsSUFBSSxFQUFFMkQsTUFBTSxDQUFDO01BQ2xDUCxPQUFPLENBQUNwRCxZQUFZLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQztNQUV6QyxJQUFJLENBQUMxQyxJQUFJLENBQUNvRixPQUFPLEVBQUU7UUFDakIsS0FBSyxJQUFJM0UsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHVCxJQUFJLENBQUNGLElBQUksRUFBRVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtVQUNyQyxNQUFNOEMsSUFBSSxHQUFHakMsUUFBUSxDQUFDUyxhQUFhLENBQUMsS0FBSyxDQUFDO1VBQzFDd0IsSUFBSSxDQUFDZixTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7VUFDMUJjLElBQUksQ0FBQ0MsT0FBTyxDQUFDRCxJQUFJLEdBQUc5QyxDQUFDO1VBQ3JCcUYsT0FBTyxDQUFDbEQsV0FBVyxDQUFDVyxJQUFJLENBQUM7UUFDM0I7TUFDRjtNQUVBLElBQUksQ0FBQyxJQUFJLENBQUNyRCxVQUFVLEVBQUU7UUFDcEIsTUFBTStGLFFBQVEsR0FBRzNFLFFBQVEsQ0FBQ1MsYUFBYSxDQUFDLEdBQUcsQ0FBQztRQUM1Q2tFLFFBQVEsQ0FBQ3RELFdBQVcsR0FBRzNDLElBQUksQ0FBQ0gsSUFBSTtRQUNoQzJGLFFBQVEsQ0FBQ1ksTUFBTSxDQUFDSCxRQUFRLENBQUM7TUFDM0I7TUFFQVQsUUFBUSxDQUFDWSxNQUFNLENBQUNOLE9BQU8sQ0FBQztNQUV4QkEsT0FBTyxDQUFDUSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUduRixDQUFDLElBQUs7UUFDM0NBLENBQUMsQ0FBQ3lFLFlBQVksQ0FBQ1csT0FBTyxDQUFDLE1BQU0sRUFBRXBGLENBQUMsQ0FBQ00sTUFBTSxDQUFDK0UsRUFBRSxDQUFDO01BQzdDLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztFQUNKLENBQUM7RUFFREMsS0FBS0EsQ0FBQ2YsTUFBTSxFQUFFO0lBQ1osTUFBTTVELFVBQVUsR0FBR1IsUUFBUSxDQUFDQyxhQUFhLENBQUMsY0FBYyxDQUFDO0lBQ3pELE1BQU1lLG9CQUFvQixHQUFHaEIsUUFBUSxDQUFDQyxhQUFhLENBQUMsU0FBUyxDQUFDO0lBQzlELE1BQU0rRCxXQUFXLEdBQUdoRSxRQUFRLENBQUNTLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFDcEQsTUFBTXlELFFBQVEsR0FBR2xFLFFBQVEsQ0FBQ1MsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUM5QyxNQUFNd0QsWUFBWSxHQUFHakUsUUFBUSxDQUFDUyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBRXJEdUQsV0FBVyxDQUFDM0MsV0FBVyxHQUFHLE9BQU87SUFDakM0QyxZQUFZLENBQUM1QyxXQUFXLEdBQUcsUUFBUTtJQUNuQzJDLFdBQVcsQ0FBQzlDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUNsQzhDLFlBQVksQ0FBQy9DLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztJQUNwQytDLFFBQVEsQ0FBQ2hELFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFdBQVcsQ0FBQztJQUNuQzZDLFdBQVcsQ0FBQzFELEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07SUFFbENDLFVBQVUsQ0FBQ2MsV0FBVyxDQUFDMEMsV0FBVyxDQUFDO0lBQ25DeEQsVUFBVSxDQUFDYyxXQUFXLENBQUMyQyxZQUFZLENBQUM7SUFDcEN6RCxVQUFVLENBQUNzRSxNQUFNLENBQUNaLFFBQVEsQ0FBQztJQUUzQkQsWUFBWSxDQUFDZSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtNQUMzQyxJQUFJLENBQUNwRyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUNBLFVBQVU7TUFDbENzRixRQUFRLENBQUM3QyxXQUFXLEdBQUcsRUFBRTtNQUN6QixJQUFJLENBQUN3RCxXQUFXLENBQUMsQ0FBQztJQUNwQixDQUFDLENBQUM7SUFFRmxGLDRDQUFHLENBQUM0QyxZQUFZLENBQUM2QixNQUFNLENBQUM1QixXQUFXLEVBQUU0QixNQUFNLENBQUMvRixhQUFhLEVBQUUsY0FBYyxDQUFDO0lBQzFFLElBQUksQ0FBQ3dHLFdBQVcsQ0FBQyxDQUFDO0lBRWxCN0Qsb0JBQW9CLENBQUNnRSxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUduRixDQUFDLElBQUs7TUFDdkRBLENBQUMsQ0FBQ0MsY0FBYyxDQUFDLENBQUM7TUFDbEJELENBQUMsQ0FBQ00sTUFBTSxDQUFDZSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxXQUFXLENBQUM7SUFDckMsQ0FBQyxDQUFDO0lBRUZILG9CQUFvQixDQUFDZ0UsZ0JBQWdCLENBQUMsV0FBVyxFQUFHbkYsQ0FBQyxJQUFLO01BQ3hEQSxDQUFDLENBQUNDLGNBQWMsQ0FBQyxDQUFDO01BQ2xCRCxDQUFDLENBQUNNLE1BQU0sQ0FBQ2UsU0FBUyxDQUFDVSxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ3hDLENBQUMsQ0FBQztJQUVGWixvQkFBb0IsQ0FBQ2dFLGdCQUFnQixDQUFDLE1BQU0sRUFBR25GLENBQUMsSUFBSztNQUNuRCxJQUFJLENBQUNzRSxXQUFXLENBQUN0RSxDQUFDLEVBQUV1RSxNQUFNLENBQUM7SUFDN0IsQ0FBQyxDQUFDO0VBQ0o7QUFDRixDQUFDO0FBRUQsaUVBQWVQLGdCQUFnQjs7Ozs7Ozs7Ozs7Ozs7QUM3Si9CLE1BQU1kLElBQUksQ0FBQztFQUNURSxXQUFXQSxDQUFDMUUsSUFBSSxFQUFFK0QsTUFBTSxFQUFFO0lBQ3hCLElBQUksQ0FBQy9ELElBQUksR0FBR0EsSUFBSTtJQUNoQixJQUFJLENBQUMrRCxNQUFNLEdBQUdBLE1BQU07SUFDcEIsSUFBSSxDQUFDOEMsUUFBUSxHQUFHLENBQUM7RUFDbkI7RUFFQTlCLEdBQUdBLENBQUEsRUFBRztJQUNKLElBQUksQ0FBQyxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEVBQUU7TUFDbEIsSUFBSSxDQUFDNEIsUUFBUSxJQUFJLENBQUM7SUFDcEI7RUFDRjtFQUVBNUIsTUFBTUEsQ0FBQSxFQUFHO0lBQ1AsT0FBTyxJQUFJLENBQUM0QixRQUFRLEtBQUssSUFBSSxDQUFDOUMsTUFBTTtFQUN0QztBQUNGO0FBRUEsaUVBQWVTLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEJuQjtBQUMwRztBQUNqQjtBQUNPO0FBQ2hHLDRDQUE0QywySUFBa0Q7QUFDOUYsNENBQTRDLCtHQUFvQztBQUNoRiw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GLHlDQUF5QyxzRkFBK0I7QUFDeEUseUNBQXlDLHNGQUErQjtBQUN4RTtBQUNBO0FBQ0E7QUFDQSxhQUFhLG1DQUFtQztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG1DQUFtQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLGdGQUFnRixZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLHNDQUFzQyx5Q0FBeUMsc0RBQXNELEtBQUssZUFBZSw2QkFBNkIsbUJBQW1CLGdEQUFnRCxLQUFLLGNBQWMsb0JBQW9CLG9CQUFvQix3REFBd0QsNEJBQTRCLGdCQUFnQixLQUFLLFlBQVksdUVBQXVFLHNCQUFzQixLQUFLLHFCQUFxQixvQkFBb0IsaURBQWlELGdCQUFnQiw0QkFBNEIsS0FBSyxnQkFBZ0IseUJBQXlCLHdCQUF3Qix5QkFBeUIsc0JBQXNCLEtBQUssc0JBQXNCLHdCQUF3QixvQkFBb0IsNEJBQTRCLGtEQUFrRCxLQUFLLG9CQUFvQixvQkFBb0IsK0NBQStDLDBDQUEwQywwQkFBMEIsNEJBQTRCLHVCQUF1QixxQkFBcUIsS0FBSyxtQkFBbUIsb0JBQW9CLHFCQUFxQiw2QkFBNkIsOEJBQThCLGVBQWUsc0JBQXNCLDBCQUEwQixLQUFLLG1CQUFtQixvREFBb0QsS0FBSyw2QkFBNkIsMEJBQTBCLDJCQUEyQiw2QkFBNkIsS0FBSyxzQkFBc0IsZ0JBQWdCLEtBQUssdUJBQXVCLGtCQUFrQix5QkFBeUIsb0JBQW9CLHFEQUFxRCxvQ0FBb0MscURBQXFELHdCQUF3QiwwQkFBMEIsS0FBSyxnQkFBZ0Isb0JBQW9CLDhDQUE4QywyQ0FBMkMsZUFBZSxLQUFLLGVBQWUsOEJBQThCLEtBQUssMkJBQTJCLDZCQUE2QixtQkFBbUIsS0FBSyxtQkFBbUIsK0NBQStDLEtBQUssY0FBYyxnQ0FBZ0MsS0FBSyxvQkFBb0Isc0JBQXNCLEtBQUssdUJBQXVCO0FBQ254RztBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7OztBQ2pJMUI7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQSxxRkFBcUY7QUFDckY7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGlCQUFpQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIscUJBQXFCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNGQUFzRixxQkFBcUI7QUFDM0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLGlEQUFpRCxxQkFBcUI7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNEQUFzRCxxQkFBcUI7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3BGYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDekJhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsY0FBYztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZEEsTUFBK0Y7QUFDL0YsTUFBcUY7QUFDckYsTUFBNEY7QUFDNUYsTUFBK0c7QUFDL0csTUFBd0c7QUFDeEcsTUFBd0c7QUFDeEcsTUFBbUc7QUFDbkc7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyxzRkFBTzs7OztBQUk2QztBQUNyRSxPQUFPLGlFQUFlLHNGQUFPLElBQUksc0ZBQU8sVUFBVSxzRkFBTyxtQkFBbUIsRUFBQzs7Ozs7Ozs7Ozs7QUMxQmhFOztBQUViO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsNkJBQTZCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDbkZhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2pDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNiQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2xCQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7Ozs7O1dDckJBOzs7Ozs7Ozs7Ozs7Ozs7O0FDQXNCO0FBQ1E7QUFDTjtBQUMwQjtBQUNJO0FBRXRELElBQUlxQixNQUFNO0FBQ1YsSUFBSWlCLFVBQVUsR0FBRyxLQUFLO0FBRXRCLFNBQVM1RCxPQUFPQSxDQUFBLEVBQUc7RUFDakIsSUFBSTRELFVBQVUsRUFBRTtJQUNkO0VBQ0Y7RUFDQSxJQUFJakIsTUFBTSxDQUFDL0YsYUFBYSxDQUFDa0YsT0FBTyxDQUFDLENBQUMsRUFBRTtJQUNsQzVELDRDQUFHLENBQUNrRCxVQUFVLENBQUMsNEJBQTRCLENBQUM7RUFDOUMsQ0FBQyxNQUFNO0lBQ0xsRCw0Q0FBRyxDQUFDa0QsVUFBVSxDQUFDLGlDQUFpQyxDQUFDO0VBQ25EO0VBRUFsRCw0Q0FBRyxDQUFDNEMsWUFBWSxDQUFDNkIsTUFBTSxDQUFDNUIsV0FBVyxFQUFFNEIsTUFBTSxDQUFDL0YsYUFBYSxFQUFFLFdBQVcsQ0FBQztFQUN2RXNCLDRDQUFHLENBQUM4QixPQUFPLENBQUMsQ0FBQztFQUViLE1BQU1DLGFBQWEsR0FBRzFCLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFdBQVcsQ0FBQztFQUN6RHlCLGFBQWEsQ0FBQ3NELGdCQUFnQixDQUFDLE9BQU8sRUFBRXJGLDRDQUFHLENBQUNnQyxRQUFRLENBQUM7QUFDdkQ7QUFFQSxTQUFTMkQsU0FBU0EsQ0FBQ3pGLENBQUMsRUFBRTtFQUNwQkEsQ0FBQyxDQUFDMEYsd0JBQXdCLENBQUMsQ0FBQztFQUU1QixJQUNFMUYsQ0FBQyxDQUFDTSxNQUFNLENBQUNlLFNBQVMsQ0FBQ2lCLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFDbkMsQ0FBQ3RDLENBQUMsQ0FBQ00sTUFBTSxDQUFDZSxTQUFTLENBQUNpQixRQUFRLENBQUMsVUFBVSxDQUFDLEVBQ3hDO0lBQ0EsTUFBTTtNQUFFRjtJQUFLLENBQUMsR0FBR3BDLENBQUMsQ0FBQ00sTUFBTSxDQUFDK0IsT0FBTztJQUNqQyxNQUFNWSxPQUFPLEdBQUdzQixNQUFNLENBQUNULFVBQVUsQ0FBQyxDQUFDOUUsSUFBSSxDQUFDQyxLQUFLLENBQUNtRCxJQUFJLEdBQUcsRUFBRSxDQUFDLEVBQUVBLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNyRXRDLDRDQUFHLENBQUNrRCxVQUFVLENBQUNDLE9BQU8sQ0FBQztJQUN2QnNCLE1BQU0sQ0FBQ1IsWUFBWSxDQUFDLENBQUM7SUFDckJqRSw0Q0FBRyxDQUFDNEMsWUFBWSxDQUFDNkIsTUFBTSxDQUFDNUIsV0FBVyxFQUFFNEIsTUFBTSxDQUFDL0YsYUFBYSxFQUFFLGFBQWEsQ0FBQztFQUMzRTtFQUNBLElBQUkrRixNQUFNLENBQUM1QixXQUFXLENBQUNlLE9BQU8sQ0FBQyxDQUFDLElBQUlhLE1BQU0sQ0FBQy9GLGFBQWEsQ0FBQ2tGLE9BQU8sQ0FBQyxDQUFDLEVBQUU7SUFDbEU5QixPQUFPLENBQUMsQ0FBQztJQUNUNEQsVUFBVSxHQUFHLElBQUk7RUFDbkI7QUFDRjs7QUFFQTtBQUNBLE1BQU14RixDQUFDLEdBQUc7RUFBRUMsY0FBY0EsQ0FBQSxFQUFHLENBQUMsQ0FBQztFQUFFSyxNQUFNLEVBQUU7SUFBRUMsS0FBS0EsQ0FBQSxFQUFHLENBQUM7RUFBRTtBQUFFLENBQUM7QUFDekQ7QUFDQWdFLE1BQU0sR0FBRyxJQUFJViwrQ0FBTSxDQUFDLENBQUM7QUFDckIvRCw0Q0FBRyxDQUFDQyxTQUFTLENBQUNDLENBQUMsQ0FBQztBQUNoQmdFLHlEQUFnQixDQUFDc0IsS0FBSyxDQUFDZixNQUFNLENBQUM7QUFDOUI7O0FBRUEsTUFBTUosV0FBVyxHQUFHaEUsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO0FBRXBEK0QsV0FBVyxDQUFDZ0IsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU07RUFDMUM1RywrREFBa0IsQ0FBQ2dHLE1BQU0sQ0FBQy9GLGFBQWEsQ0FBQztFQUN4Q3NCLDRDQUFHLENBQUM0QyxZQUFZLENBQUM2QixNQUFNLENBQUM1QixXQUFXLEVBQUU0QixNQUFNLENBQUMvRixhQUFhLEVBQUUsYUFBYSxDQUFDO0VBQ3pFc0IsNENBQUcsQ0FBQ2tELFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQztFQUNsQyxNQUFNMkMsS0FBSyxHQUFHeEYsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO0VBQzlDdUYsS0FBSyxDQUFDUixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUVNLFNBQVMsQ0FBQztFQUMxQ3RCLFdBQVcsQ0FBQ3BDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RCLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3Ly4vc3JjL2pzL2NvbXB1dGVyUGxhY2VTaGlwcy5qcyIsIndlYnBhY2s6Ly9uZXcvLi9zcmMvanMvZG9tLmpzIiwid2VicGFjazovL25ldy8uL3NyYy9qcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vc3JjL2pzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9uZXcvLi9zcmMvanMvcGxheWVyUGxhY2VTaGlwcy5qcyIsIndlYnBhY2s6Ly9uZXcvLi9zcmMvanMvc2hpcC5qcyIsIndlYnBhY2s6Ly9uZXcvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL25ldy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9uZXcvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9uZXcvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vbmV3Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL25ldy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vbmV3Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL25ldy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9uZXcvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9uZXcvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9uZXcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25ldy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmV3L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmV3L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmV3L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV3L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL25ldy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9uZXcvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL25ldy8uL3NyYy9qcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjb21wdXRlclBsYWNlU2hpcHMoY29tcHV0ZXJCb2FyZCkge1xyXG4gIGNvbnN0IHNoaXBzID0gW1xyXG4gICAgeyBuYW1lOiAnQ2FycmllcicsIHNpemU6IDUgfSxcclxuICAgIHsgbmFtZTogJ0JhdHRsZXNoaXAnLCBzaXplOiA0IH0sXHJcbiAgICB7IG5hbWU6ICdEZXN0cm95ZXInLCBzaXplOiAzIH0sXHJcbiAgICB7IG5hbWU6ICdTdWJtYXJpbmUnLCBzaXplOiAzIH0sXHJcbiAgICB7IG5hbWU6ICdQYXRyb2wgQm9hdCcsIHNpemU6IDIgfSxcclxuICBdO1xyXG5cclxuICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICBsZXQga2VlcEdvaW5nID0gdHJ1ZTtcclxuXHJcbiAgICB3aGlsZSAoa2VlcEdvaW5nKSB7XHJcbiAgICAgIGNvbnN0IGlzVmVydGljYWwgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcclxuXHJcbiAgICAgIGlmIChpc1ZlcnRpY2FsID09PSAwKSB7XHJcbiAgICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgIGNvbnN0IGZpcnN0Q29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwIC0gc2hpcC5zaXplKSk7XHJcbiAgICAgICAgbGV0IGFsbEVtcHR5ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gc2hpcC5zaXplOyBpICs9IDEpIHtcclxuICAgICAgICAgIGNvbnN0IGN1cnJlbnRDZWxsID0gY29tcHV0ZXJCb2FyZC5ib2FyZFtyb3ddW2ZpcnN0Q29sdW1uICsgaV07XHJcblxyXG4gICAgICAgICAgaWYgKHR5cGVvZiBjdXJyZW50Q2VsbCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgYWxsRW1wdHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWxsRW1wdHkpIHtcclxuICAgICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gW107XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNpemU7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKFtyb3csIGZpcnN0Q29sdW1uICsgaV0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKHNoaXAubmFtZSwgY29vcmRpbmF0ZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAga2VlcEdvaW5nID0gIWFsbEVtcHR5O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGZpcnN0Um93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwIC0gc2hpcC5zaXplKSk7XHJcbiAgICAgICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgIGxldCBhbGxFbXB0eSA9IHRydWU7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHNoaXAuc2l6ZTsgaSArPSAxKSB7XHJcbiAgICAgICAgICBjb25zdCBjdXJyZW50Q2VsbCA9IGNvbXB1dGVyQm9hcmQuYm9hcmRbZmlyc3RSb3cgKyBpXVtjb2x1bW5dO1xyXG5cclxuICAgICAgICAgIGlmICh0eXBlb2YgY3VycmVudENlbGwgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGFsbEVtcHR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFsbEVtcHR5KSB7XHJcbiAgICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IFtdO1xyXG5cclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5zaXplOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChbZmlyc3RSb3cgKyBpLCBjb2x1bW5dKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChzaGlwLm5hbWUsIGNvb3JkaW5hdGVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGtlZXBHb2luZyA9ICFhbGxFbXB0eTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21wdXRlclBsYWNlU2hpcHM7XHJcbiIsImNvbnN0IGRvbSA9IHtcclxuICBzdGFydEdhbWUoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25hbWUnKTtcclxuICAgIGNvbnN0IG5hbWUgPSBuYW1lSW5wdXQudmFsdWU7XHJcbiAgICBlLnRhcmdldC5yZXNldCgpO1xyXG5cclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XHJcbiAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG4gICAgY29uc3QgbWVzc2FnZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgbWVzc2FnZVAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICBjb25zdCBnYW1lQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgcGxheWVyQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgZW5lbXlDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb25zdCBwbGF5ZXJDYXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcclxuICAgIGNvbnN0IGVuZW15Q2FwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XHJcbiAgICBjb25zdCBwbGF5ZXJCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgZW5lbXlCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgIG1lc3NhZ2VCb3guY2xhc3NMaXN0LmFkZCgnbWVzc2FnZS1ib3gnKTtcclxuICAgIGdhbWVDb250ZW50LmNsYXNzTGlzdC5hZGQoJ2dhbWUtY29udGVudCcpO1xyXG4gICAgcGxheWVyQ29udGVudC5jbGFzc0xpc3QuYWRkKCdwbGF5ZXItY29udGVudCcpO1xyXG4gICAgZW5lbXlDb250ZW50LmNsYXNzTGlzdC5hZGQoJ3BsYXllci1jb250ZW50Jyk7XHJcbiAgICBwbGF5ZXJDYXB0aW9uLmNsYXNzTGlzdC5hZGQoJ2NhcHRpb24nKTtcclxuICAgIGVuZW15Q2FwdGlvbi5jbGFzc0xpc3QuYWRkKCdjYXB0aW9uJyk7XHJcbiAgICBwbGF5ZXJCb2FyZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2JvYXJkLWNvbnRhaW5lcicpO1xyXG4gICAgcGxheWVyQm9hcmRDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdwbGF5ZXInKTtcclxuICAgIGVuZW15Qm9hcmRDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdib2FyZC1jb250YWluZXInKTtcclxuICAgIGVuZW15Qm9hcmRDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdlbmVteScpO1xyXG5cclxuICAgIHBsYXllckNhcHRpb24udGV4dENvbnRlbnQgPSBuYW1lID8gYCR7bmFtZX0ncyBGbGVldGAgOiBcIlBsYXllcidzIEZsZWV0XCI7XHJcbiAgICBlbmVteUNhcHRpb24udGV4dENvbnRlbnQgPSBgRW5lbXkgRmxlZXRgO1xyXG5cclxuICAgIG1lc3NhZ2VCb3guYXBwZW5kQ2hpbGQobWVzc2FnZVApO1xyXG4gICAgcGxheWVyQ29udGVudC5hcHBlbmRDaGlsZChwbGF5ZXJDYXB0aW9uKTtcclxuICAgIHBsYXllckNvbnRlbnQuYXBwZW5kQ2hpbGQocGxheWVyQm9hcmRDb250YWluZXIpO1xyXG4gICAgZW5lbXlDb250ZW50LmFwcGVuZENoaWxkKGVuZW15Q2FwdGlvbik7XHJcbiAgICBlbmVteUNvbnRlbnQuYXBwZW5kQ2hpbGQoZW5lbXlCb2FyZENvbnRhaW5lcik7XHJcbiAgICBnYW1lQ29udGVudC5hcHBlbmRDaGlsZChwbGF5ZXJDb250ZW50KTtcclxuICAgIGdhbWVDb250ZW50LmFwcGVuZENoaWxkKGVuZW15Q29udGVudCk7XHJcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShtZXNzYWdlQm94LCBmb3JtKTtcclxuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKGdhbWVDb250ZW50LCBtZXNzYWdlQm94KTtcclxuICB9LFxyXG5cclxuICBlbmRHYW1lKCkge1xyXG4gICAgY29uc3QgbWVzc2FnZUJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlLWJveCcpO1xyXG4gICAgY29uc3QgbmV3R2FtZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgbmV3R2FtZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCduZXctZ2FtZScpO1xyXG4gICAgbmV3R2FtZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdOZXcgR2FtZSc7XHJcbiAgICBtZXNzYWdlQm94LmFwcGVuZENoaWxkKG5ld0dhbWVCdXR0b24pO1xyXG4gIH0sXHJcblxyXG4gIG9wZW5Gb3JtKCkge1xyXG4gICAgY29uc3QgbWVzc2FnZUJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlLWJveCcpO1xyXG4gICAgY29uc3QgZ2FtZUNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1jb250ZW50Jyk7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpO1xyXG4gICAgbWVzc2FnZUJveC5yZW1vdmUoKTtcclxuICAgIGdhbWVDb250ZW50LnJlbW92ZSgpO1xyXG4gICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICB9LFxyXG5cclxuICBidWlsZEJvYXJkKGdhbWVib2FyZCwgdHlwZSwgY29uZGl0aW9uKSB7XHJcbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgYm9hcmQuY2xhc3NMaXN0LmFkZCgnYm9hcmQnKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSArPSAxKSB7XHJcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XHJcbiAgICAgIGNlbGwuZGF0YXNldC5jZWxsID0gaTtcclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICB0eXBlb2YgZ2FtZWJvYXJkLmJvYXJkW01hdGguZmxvb3IoaSAvIDEwKV1baSAlIDEwXSA9PT0gJ29iamVjdCcgJiZcclxuICAgICAgICAodHlwZSA9PT0gJ3BsYXllcicgfHwgY29uZGl0aW9uID09PSAnZ2FtZSBvdmVyJylcclxuICAgICAgKSB7XHJcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKFxyXG4gICAgICAgIHR5cGUgPT09ICdjb21wdXRlcicgJiZcclxuICAgICAgICBjb25kaXRpb24gPT09ICdub3JtYWwgcGxheScgJiZcclxuICAgICAgICAhY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2F0dGFja2VkJylcclxuICAgICAgKSB7XHJcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjbGlja2FibGUnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBnYW1lYm9hcmQucHJldmlvdXNBdHRhY2tzLmxlbmd0aDsgaiArPSAxKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgZ2FtZWJvYXJkLnByZXZpb3VzQXR0YWNrc1tqXVswXSA9PT0gTWF0aC5mbG9vcihpIC8gMTApICYmXHJcbiAgICAgICAgICBnYW1lYm9hcmQucHJldmlvdXNBdHRhY2tzW2pdWzFdID09PSBpICUgMTBcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnYXR0YWNrZWQnKTtcclxuXHJcbiAgICAgICAgICBpZiAodHlwZW9mIGdhbWVib2FyZC5ib2FyZFtNYXRoLmZsb29yKGkgLyAxMCldW2kgJSAxMF0gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBib2FyZC5hcHBlbmRDaGlsZChjZWxsKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYm9hcmQ7XHJcbiAgfSxcclxuXHJcbiAgYXBwZW5kQm9hcmRzKHBsYXllckJvYXJkLCBjb21wdXRlckJvYXJkLCBjb25kaXRpb24pIHtcclxuICAgIGNvbnN0IHBsYXllckJvYXJkTm9kZSA9IGRvbS5idWlsZEJvYXJkKHBsYXllckJvYXJkLCAncGxheWVyJywgY29uZGl0aW9uKTtcclxuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmROb2RlID0gZG9tLmJ1aWxkQm9hcmQoXHJcbiAgICAgIGNvbXB1dGVyQm9hcmQsXHJcbiAgICAgICdjb21wdXRlcicsXHJcbiAgICAgIGNvbmRpdGlvbixcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgYm9hcmRDb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJvYXJkLWNvbnRhaW5lcicpO1xyXG4gICAgYm9hcmRDb250YWluZXJzWzBdLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICBib2FyZENvbnRhaW5lcnNbMV0udGV4dENvbnRlbnQgPSAnJztcclxuICAgIGJvYXJkQ29udGFpbmVyc1swXS5hcHBlbmRDaGlsZChwbGF5ZXJCb2FyZE5vZGUpO1xyXG4gICAgYm9hcmRDb250YWluZXJzWzFdLmFwcGVuZENoaWxkKGNvbXB1dGVyQm9hcmROb2RlKTtcclxuICB9LFxyXG5cclxuICBuZXdNZXNzYWdlKG1lc3NhZ2UpIHtcclxuICAgIGNvbnN0IG1lc3NhZ2VQID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2UtYm94IHAnKTtcclxuICAgIG1lc3NhZ2VQLnRleHRDb250ZW50ID0gbWVzc2FnZTtcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZG9tO1xyXG4iLCJpbXBvcnQgU2hpcCBmcm9tICcuL3NoaXAnO1xyXG5cclxuY2xhc3MgR2FtZWJvYXJkIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuYm9hcmQgPSBbXTtcclxuICAgIHRoaXMucHJldmlvdXNBdHRhY2tzID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XHJcbiAgICAgIGNvbnN0IHRlbXAgPSBbXTtcclxuXHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xyXG4gICAgICAgIHRlbXAucHVzaCgnZW1wdHknKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5ib2FyZC5wdXNoKHRlbXApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGxhY2VTaGlwKG5hbWUsIGNvb3JkaW5hdGVzKSB7XHJcbiAgICBjb25zdCBjdXJyZW50U2hpcCA9IG5ldyBTaGlwKG5hbWUsIGNvb3JkaW5hdGVzLmxlbmd0aCk7XHJcblxyXG4gICAgY29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmRQYWlyKSA9PiB7XHJcbiAgICAgIHRoaXMuYm9hcmRbY29vcmRQYWlyWzBdXVtjb29yZFBhaXJbMV1dID0gY3VycmVudFNoaXA7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlY2VpdmVBdHRhY2soY29vcmRQYWlyKSB7XHJcbiAgICB0aGlzLnByZXZpb3VzQXR0YWNrcy5wdXNoKGNvb3JkUGFpcik7XHJcbiAgICBjb25zdCBjZWxsID0gdGhpcy5ib2FyZFtjb29yZFBhaXJbMF1dW2Nvb3JkUGFpclsxXV07XHJcblxyXG4gICAgaWYgKHR5cGVvZiBjZWxsID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBjZWxsLmhpdCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5ib2FyZFtjb29yZFBhaXJbMF1dW2Nvb3JkUGFpclsxXV0gPSAnbWlzcyc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhbGxTdW5rKCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHR5cGVvZiB0aGlzLmJvYXJkW2ldW2pdID09PSAnb2JqZWN0JyAmJlxyXG4gICAgICAgICAgIXRoaXMuYm9hcmRbaV1bal0uaXNTdW5rKClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGluUHJldmlvdXNBdHRhY2tzKGNvb3JkUGFpcikge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByZXZpb3VzQXR0YWNrcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGhpcy5wcmV2aW91c0F0dGFja3NbaV1bMF0gPT09IGNvb3JkUGFpclswXSAmJlxyXG4gICAgICAgIHRoaXMucHJldmlvdXNBdHRhY2tzW2ldWzFdID09PSBjb29yZFBhaXJbMV1cclxuICAgICAgKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XHJcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnO1xyXG5cclxuY2xhc3MgUGxheWVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucGxheWVyQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XHJcbiAgICB0aGlzLmNvbXB1dGVyQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XHJcbiAgfVxyXG5cclxuICBwbGF5ZXJNb3ZlKGNvb3JkUGFpcikge1xyXG4gICAgdGhpcy5jb21wdXRlckJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRQYWlyKTtcclxuICAgIGNvbnN0IGNlbGwgPSB0aGlzLmNvbXB1dGVyQm9hcmQuYm9hcmRbY29vcmRQYWlyWzBdXVtjb29yZFBhaXJbMV1dO1xyXG4gICAgbGV0IG1lc3NhZ2UgPSAnWW91IG1pc3NlZCB0aGUgZW5lbXknO1xyXG5cclxuICAgIGlmICh0eXBlb2YgY2VsbCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgbWVzc2FnZSA9ICdZb3UgaGl0IHRoZSBlbmVteSEnO1xyXG5cclxuICAgICAgaWYgKGNlbGwuaXNTdW5rKSB7XHJcbiAgICAgICAgbWVzc2FnZSA9IGAke21lc3NhZ2V9IFlvdSBzdW5rIHRoZSBlbmVteSdzICR7Y2VsbC5uYW1lfSFgO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgfVxyXG5cclxuICBjb21wdXRlck1vdmUoKSB7XHJcbiAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgbGV0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuXHJcbiAgICB3aGlsZSAodGhpcy5wbGF5ZXJCb2FyZC5pblByZXZpb3VzQXR0YWNrcyhbcm93LCBjb2x1bW5dKSkge1xyXG4gICAgICByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgIGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnBsYXllckJvYXJkLnJlY2VpdmVBdHRhY2soW3JvdywgY29sdW1uXSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XHJcbiIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xyXG5cclxuY29uc3QgcGxheWVyUGxhY2VTaGlwcyA9IHtcclxuICBpc1ZlcnRpY2FsOiBmYWxzZSxcclxuXHJcbiAgc2hpcHM6IFtcclxuICAgIHsgbmFtZTogJ0NhcnJpZXInLCBzaXplOiA1LCBpbkZsZWV0OiBmYWxzZSB9LFxyXG4gICAgeyBuYW1lOiAnQmF0dGxlc2hpcCcsIHNpemU6IDQsIGluRmxlZXQ6IGZhbHNlIH0sXHJcbiAgICB7IG5hbWU6ICdEZXN0cm95ZXInLCBzaXplOiAzLCBpbkZsZWV0OiBmYWxzZSB9LFxyXG4gICAgeyBuYW1lOiAnU3VibWFyaW5lJywgc2l6ZTogMywgaW5GbGVldDogZmFsc2UgfSxcclxuICAgIHsgbmFtZTogJ1BhdHJvbCBCb2F0Jywgc2l6ZTogMiwgaW5GbGVldDogZmFsc2UgfSxcclxuICBdLFxyXG5cclxuICBzaGlwc1BsYWNlZCgpIHtcclxuICAgIGNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0JylcclxuICAgIGNvbnN0IHJvdGF0ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yb3RhdGUnKTtcclxuICAgIGNvbnN0IGFsbFNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsbC1zaGlwcycpO1xyXG4gICAgcm90YXRlQnV0dG9uLnJlbW92ZSgpO1xyXG4gICAgYWxsU2hpcHMucmVtb3ZlKCk7XHJcbiAgICBzdGFydEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XHJcbiAgfSxcclxuXHJcbiAgZHJvcEhhbmRsZXIoZSwgcGxheWVyKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBkYXRhID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dCcpO1xyXG4gICAgY29uc3Qgc2hpcERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2RhdGF9YCk7XHJcbiAgICBjb25zdCBzaXplID0gc2hpcERpdi5jaGlsZEVsZW1lbnRDb3VudDtcclxuICAgIGNvbnN0IGxpc3QgPSBlLnRhcmdldC5jbGFzc0xpc3Q7XHJcbiAgICBjb25zdCB7IGNlbGwgfSA9IGUudGFyZ2V0LmRhdGFzZXQ7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAoIXRoaXMuaXNWZXJ0aWNhbCAmJiAoY2VsbCAlIDEwKSArIHNpemUgPiAxMCkgfHxcclxuICAgICAgKHRoaXMuaXNWZXJ0aWNhbCAmJiBNYXRoLmZsb29yKGNlbGwgLyAxMCkgKyBzaXplID4gMTApIHx8XHJcbiAgICAgICFsaXN0LmNvbnRhaW5zKCdjZWxsJykgfHxcclxuICAgICAgbGlzdC5jb250YWlucygnc2hpcCcpXHJcbiAgICApIHtcclxuICAgICAgbGlzdC5yZW1vdmUoJ3RlbXAtc2hpcCcpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkgKz0gMSkge1xyXG4gICAgICBpZiAoIXRoaXMuaXNWZXJ0aWNhbCkge1xyXG4gICAgICAgIGNvb3JkaW5hdGVzLnB1c2goW01hdGguZmxvb3IoY2VsbCAvIDEwKSwgKGNlbGwgJSAxMCkgKyBpXSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaChbTWF0aC5mbG9vcihjZWxsIC8gMTApICsgaSwgY2VsbCAlIDEwXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5ZXIucGxheWVyQm9hcmQucGxhY2VTaGlwKGRhdGEsIGNvb3JkaW5hdGVzKTtcclxuICAgIHNoaXBEaXYudGV4dENvbnRlbnQgPSAnJztcclxuICAgIGRvbS5hcHBlbmRCb2FyZHMocGxheWVyLnBsYXllckJvYXJkLCBwbGF5ZXIuY29tcHV0ZXJCb2FyZCwgJ3NoaXAgcGxhY2luZycpO1xyXG5cclxuICAgIGNvbnN0IHNoaXBOYW1lID0gZGF0YSA9PT0gJ1BhdHJvbC1Cb2F0JyA/ICdQYXRyb2wgQm9hdCcgOiBkYXRhO1xyXG4gICAgY29uc3QgY3VycmVudFNoaXAgPSB0aGlzLnNoaXBzLmZpbmQoKHNoaXApID0+IHNoaXAubmFtZSA9PT0gc2hpcE5hbWUpO1xyXG4gICAgY3VycmVudFNoaXAuaW5GbGVldCA9IHRydWU7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoaXBzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgIGlmICghdGhpcy5zaGlwc1tpXS5pbkZsZWV0KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zaGlwc1BsYWNlZCgpO1xyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZVNoaXBzKCkge1xyXG4gICAgY29uc3QgYWxsU2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxsLXNoaXBzJyk7XHJcblxyXG4gICAgaWYgKHRoaXMuaXNWZXJ0aWNhbCkge1xyXG4gICAgICBhbGxTaGlwcy5jbGFzc0xpc3QuYWRkKCd2ZXJ0aWNhbCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxsU2hpcHMuY2xhc3NMaXN0LnJlbW92ZSgndmVydGljYWwnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc1ZlcnRpY2FsKSB7XHJcbiAgICAgIHRoaXMuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNoaXBOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIHNoaXBOYW1lLnRleHRDb250ZW50ID0gc2hpcC5uYW1lO1xyXG4gICAgICAgIGFsbFNoaXBzLmFwcGVuZChzaGlwTmFtZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICBjb25zdCBzaGlwRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIHNoaXBEaXYuY2xhc3NMaXN0LmFkZCgnc2hpcC1kaXYnKTtcclxuICAgICAgY29uc3QgaWROYW1lID0gc2hpcC5uYW1lID09PSAnUGF0cm9sIEJvYXQnID8gJ1BhdHJvbC1Cb2F0JyA6IHNoaXAubmFtZTtcclxuICAgICAgc2hpcERpdi5zZXRBdHRyaWJ1dGUoJ2lkJywgaWROYW1lKTtcclxuICAgICAgc2hpcERpdi5zZXRBdHRyaWJ1dGUoJ2RyYWdnYWJsZScsICd0cnVlJyk7XHJcblxyXG4gICAgICBpZiAoIXNoaXAuaW5GbGVldCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5zaXplOyBpICs9IDEpIHtcclxuICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xyXG4gICAgICAgICAgY2VsbC5kYXRhc2V0LmNlbGwgPSBpO1xyXG4gICAgICAgICAgc2hpcERpdi5hcHBlbmRDaGlsZChjZWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghdGhpcy5pc1ZlcnRpY2FsKSB7XHJcbiAgICAgICAgY29uc3Qgc2hpcE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgc2hpcE5hbWUudGV4dENvbnRlbnQgPSBzaGlwLm5hbWU7XHJcbiAgICAgICAgYWxsU2hpcHMuYXBwZW5kKHNoaXBOYW1lKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYWxsU2hpcHMuYXBwZW5kKHNoaXBEaXYpO1xyXG5cclxuICAgICAgc2hpcERpdi5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCAoZSkgPT4ge1xyXG4gICAgICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQnLCBlLnRhcmdldC5pZCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgcGxhY2UocGxheWVyKSB7XHJcbiAgICBjb25zdCBtZXNzYWdlQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2UtYm94Jyk7XHJcbiAgICBjb25zdCBwbGF5ZXJCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXInKTtcclxuICAgIGNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBjb25zdCBhbGxTaGlwcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3Qgcm90YXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcblxyXG4gICAgc3RhcnRCdXR0b24udGV4dENvbnRlbnQgPSAnU3RhcnQnO1xyXG4gICAgcm90YXRlQnV0dG9uLnRleHRDb250ZW50ID0gJ1JvdGF0ZSc7XHJcbiAgICBzdGFydEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzdGFydCcpXHJcbiAgICByb3RhdGVCdXR0b24uY2xhc3NMaXN0LmFkZCgncm90YXRlJylcclxuICAgIGFsbFNoaXBzLmNsYXNzTGlzdC5hZGQoJ2FsbC1zaGlwcycpO1xyXG4gICAgc3RhcnRCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbiAgICBtZXNzYWdlQm94LmFwcGVuZENoaWxkKHN0YXJ0QnV0dG9uKTtcclxuICAgIG1lc3NhZ2VCb3guYXBwZW5kQ2hpbGQocm90YXRlQnV0dG9uKTtcclxuICAgIG1lc3NhZ2VCb3guYXBwZW5kKGFsbFNoaXBzKTtcclxuXHJcbiAgICByb3RhdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuaXNWZXJ0aWNhbCA9ICF0aGlzLmlzVmVydGljYWw7XHJcbiAgICAgIGFsbFNoaXBzLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICAgIHRoaXMuY3JlYXRlU2hpcHMoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRvbS5hcHBlbmRCb2FyZHMocGxheWVyLnBsYXllckJvYXJkLCBwbGF5ZXIuY29tcHV0ZXJCb2FyZCwgJ3NoaXAgcGxhY2luZycpO1xyXG4gICAgdGhpcy5jcmVhdGVTaGlwcygpO1xyXG5cclxuICAgIHBsYXllckJvYXJkQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCd0ZW1wLXNoaXAnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHBsYXllckJvYXJkQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIChlKSA9PiB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgndGVtcC1zaGlwJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBwbGF5ZXJCb2FyZENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgKGUpID0+IHtcclxuICAgICAgdGhpcy5kcm9wSGFuZGxlcihlLCBwbGF5ZXIpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBsYXllclBsYWNlU2hpcHM7XHJcbiIsImNsYXNzIFNoaXAge1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUsIGxlbmd0aCkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZVxyXG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICB0aGlzLnRpbWVzSGl0ID0gMDtcclxuICB9XHJcblxyXG4gIGhpdCgpIHtcclxuICAgIGlmICghdGhpcy5pc1N1bmsoKSkge1xyXG4gICAgICB0aGlzLnRpbWVzSGl0ICs9IDE7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc1N1bmsoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50aW1lc0hpdCA9PT0gdGhpcy5sZW5ndGg7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9mb250cy9JVEMgTWFjaGluZSBSZWd1bGFyLm90ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4vaW1nL2FscGhhLXguc3ZnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgQGZvbnQtZmFjZSB7XHJcbiAgZm9udC1mYW1pbHk6ICdJVEMgTWFjaGluZSBSZWd1bGFyJztcclxuICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX199KTtcclxufVxyXG5cclxuOnJvb3Qge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IG5hdnk7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xyXG59XHJcblxyXG5ib2R5IHtcclxuICBoZWlnaHQ6IDEwMHZoO1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtYXgtY29udGVudCBtYXgtY29udGVudCAyMDBweDtcclxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiAzMHB4O1xyXG59XHJcblxyXG5oMSB7XHJcbiAgZm9udC1mYW1pbHk6ICdJVEMgTWFjaGluZSBSZWd1bGFyJywgQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcclxuICBmb250LXNpemU6IDRyZW07XHJcbn1cclxuXHJcbi5lbnRlci1uYW1lIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDMsIG1heC1jb250ZW50KTtcclxuICBnYXA6IDEwcHg7XHJcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG5idXR0b24ge1xyXG4gIHdpZHRoOiBtYXgtY29udGVudDtcclxuICBwYWRkaW5nOiA1cHggMTBweDtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4ubWVzc2FnZS1ib3gge1xyXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xyXG4gIGdyaWQtdGVtcGxhdGUtcm93czogbWF4LWNvbnRlbnQgbWF4LWNvbnRlbnQ7XHJcbn1cclxuXHJcbi5hbGwtc2hpcHMge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtYXgtY29udGVudCAyMDBweDtcclxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg1LCA1MHB4KTtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxuICBjb2x1bW4tZ2FwOiAzMHB4O1xyXG4gIG1hcmdpbjogMjBweCAwO1xyXG59XHJcblxyXG4uc2hpcC1kaXYge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgbWFyZ2luOiAxMHB4IDA7XHJcbiAgZ3JpZC1hdXRvLWZsb3c6IGNvbHVtbjtcclxuICBncmlkLWF1dG8tY29sdW1uczogMzBweDtcclxuICBnYXA6IDFweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAganVzdGlmeS1zZWxmOiBzdGFydDtcclxufVxyXG5cclxuLnZlcnRpY2FsIHtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCBtYXgtY29udGVudCk7XHJcbn1cclxuXHJcbi52ZXJ0aWNhbCAuc2hpcC1kaXYge1xyXG4gIGdyaWQtYXV0by1mbG93OiByb3c7XHJcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XHJcbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcclxufVxyXG5cclxuLmFsbC1zaGlwcyBwIHtcclxuICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbi5nYW1lLWNvbnRlbnQge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWF4LWNvbnRlbnQgbWF4LWNvbnRlbnQ7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XHJcbiAgZm9udC1mYW1pbHk6ICdJVEMgTWFjaGluZSBSZWd1bGFyJywgc2Fucy1zZXJpZjtcclxuICBmb250LXNpemU6IDEuNXJlbTtcclxuICBsZXR0ZXItc3BhY2luZzogMnB4O1xyXG59XHJcblxyXG4uYm9hcmQge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xyXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAzMHB4KTtcclxuICBnYXA6IDFweDtcclxufVxyXG5cclxuLmNlbGwge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4uc2hpcCwgLnRlbXAtc2hpcCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcclxuICBoZWlnaHQ6IDMwcHg7XHJcbn1cclxuXHJcbi5hdHRhY2tlZCB7XHJcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fX30pO1xyXG59XHJcblxyXG4uaGl0IHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY2MTYxO1xyXG59XHJcblxyXG4uY2xpY2thYmxlIHtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usa0NBQWtDO0VBQ2xDLDRDQUE2QztBQUMvQzs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixZQUFZO0VBQ1oseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGFBQWE7RUFDYixpREFBaUQ7RUFDakQscUJBQXFCO0VBQ3JCLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGdFQUFnRTtFQUNoRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDBDQUEwQztFQUMxQyxTQUFTO0VBQ1QscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixhQUFhO0VBQ2IscUJBQXFCO0VBQ3JCLDJDQUEyQztBQUM3Qzs7QUFFQTtFQUNFLGFBQWE7RUFDYix3Q0FBd0M7RUFDeEMsbUNBQW1DO0VBQ25DLG1CQUFtQjtFQUNuQixxQkFBcUI7RUFDckIsZ0JBQWdCO0VBQ2hCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsY0FBYztFQUNkLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsUUFBUTtFQUNSLGVBQWU7RUFDZixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSw2Q0FBNkM7QUFDL0M7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsb0JBQW9CO0VBQ3BCLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLDhDQUE4QztFQUM5Qyw2QkFBNkI7RUFDN0IsOENBQThDO0VBQzlDLGlCQUFpQjtFQUNqQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUNBQXVDO0VBQ3ZDLG9DQUFvQztFQUNwQyxRQUFRO0FBQ1Y7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsWUFBWTtBQUNkOztBQUVBO0VBQ0UseURBQXdDO0FBQzFDOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnSVRDIE1hY2hpbmUgUmVndWxhcic7XFxyXFxuICBzcmM6IHVybCgnLi9mb250cy9JVENcXFxcIE1hY2hpbmVcXFxcIFJlZ3VsYXIub3RmJyk7XFxyXFxufVxcclxcblxcclxcbjpyb290IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IG5hdnk7XFxyXFxuICBjb2xvcjogd2hpdGU7XFxyXFxuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBoZWlnaHQ6IDEwMHZoO1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogbWF4LWNvbnRlbnQgbWF4LWNvbnRlbnQgMjAwcHg7XFxyXFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBnYXA6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbmgxIHtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnSVRDIE1hY2hpbmUgUmVndWxhcicsIEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxyXFxuICBmb250LXNpemU6IDRyZW07XFxyXFxufVxcclxcblxcclxcbi5lbnRlci1uYW1lIHtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgzLCBtYXgtY29udGVudCk7XFxyXFxuICBnYXA6IDEwcHg7XFxyXFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbmJ1dHRvbiB7XFxyXFxuICB3aWR0aDogbWF4LWNvbnRlbnQ7XFxyXFxuICBwYWRkaW5nOiA1cHggMTBweDtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLm1lc3NhZ2UtYm94IHtcXHJcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogbWF4LWNvbnRlbnQgbWF4LWNvbnRlbnQ7XFxyXFxufVxcclxcblxcclxcbi5hbGwtc2hpcHMge1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWF4LWNvbnRlbnQgMjAwcHg7XFxyXFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg1LCA1MHB4KTtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBjb2x1bW4tZ2FwOiAzMHB4O1xcclxcbiAgbWFyZ2luOiAyMHB4IDA7XFxyXFxufVxcclxcblxcclxcbi5zaGlwLWRpdiB7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgbWFyZ2luOiAxMHB4IDA7XFxyXFxuICBncmlkLWF1dG8tZmxvdzogY29sdW1uO1xcclxcbiAgZ3JpZC1hdXRvLWNvbHVtbnM6IDMwcHg7XFxyXFxuICBnYXA6IDFweDtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIGp1c3RpZnktc2VsZjogc3RhcnQ7XFxyXFxufVxcclxcblxcclxcbi52ZXJ0aWNhbCB7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCBtYXgtY29udGVudCk7XFxyXFxufVxcclxcblxcclxcbi52ZXJ0aWNhbCAuc2hpcC1kaXYge1xcclxcbiAgZ3JpZC1hdXRvLWZsb3c6IHJvdztcXHJcXG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xcclxcbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcXHJcXG59XFxyXFxuXFxyXFxuLmFsbC1zaGlwcyBwIHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtY29udGVudCB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1heC1jb250ZW50IG1heC1jb250ZW50O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxyXFxuICBmb250LWZhbWlseTogJ0lUQyBNYWNoaW5lIFJlZ3VsYXInLCBzYW5zLXNlcmlmO1xcclxcbiAgZm9udC1zaXplOiAxLjVyZW07XFxyXFxuICBsZXR0ZXItc3BhY2luZzogMnB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQge1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAzMHB4KTtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAzMHB4KTtcXHJcXG4gIGdhcDogMXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2VsbCB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXAsIC50ZW1wLXNoaXAge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcXHJcXG4gIGhlaWdodDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmF0dGFja2VkIHtcXHJcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCguL2ltZy9hbHBoYS14LnN2Zyk7XFxyXFxufVxcclxcblxcclxcbi5oaXQge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNjE2MTtcXHJcXG59XFxyXFxuXFxyXFxuLmNsaWNrYWJsZSB7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4uL3N0eWxlLmNzcyc7XHJcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xyXG5pbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcclxuaW1wb3J0IHBsYXllclBsYWNlU2hpcHMgZnJvbSAnLi9wbGF5ZXJQbGFjZVNoaXBzJztcclxuaW1wb3J0IGNvbXB1dGVyUGxhY2VTaGlwcyBmcm9tICcuL2NvbXB1dGVyUGxhY2VTaGlwcyc7XHJcblxyXG5sZXQgcGxheWVyO1xyXG5sZXQgaXNHYW1lT3ZlciA9IGZhbHNlO1xyXG5cclxuZnVuY3Rpb24gZW5kR2FtZSgpIHtcclxuICBpZiAoaXNHYW1lT3Zlcikge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBpZiAocGxheWVyLmNvbXB1dGVyQm9hcmQuYWxsU3VuaygpKSB7XHJcbiAgICBkb20ubmV3TWVzc2FnZSgnRW5lbXkgZmxlZXQgc3VuayEgWW91IHdpbiEnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZG9tLm5ld01lc3NhZ2UoJ1lvdXIgZmxlZXQgd2FzIHN1bmshIEdhbWUgb3ZlciEnKTtcclxuICB9XHJcblxyXG4gIGRvbS5hcHBlbmRCb2FyZHMocGxheWVyLnBsYXllckJvYXJkLCBwbGF5ZXIuY29tcHV0ZXJCb2FyZCwgJ2dhbWUgb3ZlcicpO1xyXG4gIGRvbS5lbmRHYW1lKCk7XHJcblxyXG4gIGNvbnN0IG5ld0dhbWVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LWdhbWUnKTtcclxuICBuZXdHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZG9tLm9wZW5Gb3JtKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGxheVJvdW5kKGUpIHtcclxuICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG5cclxuICBpZiAoXHJcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbGwnKSAmJlxyXG4gICAgIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYXR0YWNrZWQnKVxyXG4gICkge1xyXG4gICAgY29uc3QgeyBjZWxsIH0gPSBlLnRhcmdldC5kYXRhc2V0O1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IHBsYXllci5wbGF5ZXJNb3ZlKFtNYXRoLmZsb29yKGNlbGwgLyAxMCksIGNlbGwgJSAxMF0pO1xyXG4gICAgZG9tLm5ld01lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICBwbGF5ZXIuY29tcHV0ZXJNb3ZlKCk7XHJcbiAgICBkb20uYXBwZW5kQm9hcmRzKHBsYXllci5wbGF5ZXJCb2FyZCwgcGxheWVyLmNvbXB1dGVyQm9hcmQsICdub3JtYWwgcGxheScpO1xyXG4gIH1cclxuICBpZiAocGxheWVyLnBsYXllckJvYXJkLmFsbFN1bmsoKSB8fCBwbGF5ZXIuY29tcHV0ZXJCb2FyZC5hbGxTdW5rKCkpIHtcclxuICAgIGVuZEdhbWUoKTtcclxuICAgIGlzR2FtZU92ZXIgPSB0cnVlO1xyXG4gIH1cclxufVxyXG5cclxuLy8gY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcclxuY29uc3QgZSA9IHsgcHJldmVudERlZmF1bHQoKSB7fSwgdGFyZ2V0OiB7IHJlc2V0KCkge30gfSB9O1xyXG4vLyBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XHJcbnBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxuZG9tLnN0YXJ0R2FtZShlKTtcclxucGxheWVyUGxhY2VTaGlwcy5wbGFjZShwbGF5ZXIpO1xyXG4vLyB9KTtcclxuXHJcbmNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0Jyk7XHJcblxyXG5zdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBjb21wdXRlclBsYWNlU2hpcHMocGxheWVyLmNvbXB1dGVyQm9hcmQpO1xyXG4gIGRvbS5hcHBlbmRCb2FyZHMocGxheWVyLnBsYXllckJvYXJkLCBwbGF5ZXIuY29tcHV0ZXJCb2FyZCwgJ25vcm1hbCBwbGF5Jyk7XHJcbiAgZG9tLm5ld01lc3NhZ2UoJ0ZpcmUgd2hlbiByZWFkeSEnKTtcclxuICBjb25zdCBlbmVteSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbmVteScpO1xyXG4gIGVuZW15LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxheVJvdW5kKTtcclxuICBzdGFydEJ1dHRvbi5yZW1vdmUoKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6WyJjb21wdXRlclBsYWNlU2hpcHMiLCJjb21wdXRlckJvYXJkIiwic2hpcHMiLCJuYW1lIiwic2l6ZSIsImZvckVhY2giLCJzaGlwIiwia2VlcEdvaW5nIiwiaXNWZXJ0aWNhbCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJvdyIsImZpcnN0Q29sdW1uIiwiYWxsRW1wdHkiLCJpIiwiY3VycmVudENlbGwiLCJib2FyZCIsImNvb3JkaW5hdGVzIiwicHVzaCIsInBsYWNlU2hpcCIsImZpcnN0Um93IiwiY29sdW1uIiwiZG9tIiwic3RhcnRHYW1lIiwiZSIsInByZXZlbnREZWZhdWx0IiwibmFtZUlucHV0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidmFsdWUiLCJ0YXJnZXQiLCJyZXNldCIsImZvcm0iLCJzdHlsZSIsImRpc3BsYXkiLCJtZXNzYWdlQm94IiwiY3JlYXRlRWxlbWVudCIsIm1lc3NhZ2VQIiwiZ2FtZUNvbnRlbnQiLCJwbGF5ZXJDb250ZW50IiwiZW5lbXlDb250ZW50IiwicGxheWVyQ2FwdGlvbiIsImVuZW15Q2FwdGlvbiIsInBsYXllckJvYXJkQ29udGFpbmVyIiwiZW5lbXlCb2FyZENvbnRhaW5lciIsImNsYXNzTGlzdCIsImFkZCIsInNldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiYXBwZW5kQ2hpbGQiLCJib2R5IiwiaW5zZXJ0QmVmb3JlIiwiZW5kR2FtZSIsIm5ld0dhbWVCdXR0b24iLCJvcGVuRm9ybSIsInJlbW92ZSIsImJ1aWxkQm9hcmQiLCJnYW1lYm9hcmQiLCJ0eXBlIiwiY29uZGl0aW9uIiwiY2VsbCIsImRhdGFzZXQiLCJjb250YWlucyIsImoiLCJwcmV2aW91c0F0dGFja3MiLCJsZW5ndGgiLCJhcHBlbmRCb2FyZHMiLCJwbGF5ZXJCb2FyZCIsInBsYXllckJvYXJkTm9kZSIsImNvbXB1dGVyQm9hcmROb2RlIiwiYm9hcmRDb250YWluZXJzIiwicXVlcnlTZWxlY3RvckFsbCIsIm5ld01lc3NhZ2UiLCJtZXNzYWdlIiwiU2hpcCIsIkdhbWVib2FyZCIsImNvbnN0cnVjdG9yIiwidGVtcCIsImN1cnJlbnRTaGlwIiwiY29vcmRQYWlyIiwicmVjZWl2ZUF0dGFjayIsImhpdCIsImFsbFN1bmsiLCJpc1N1bmsiLCJpblByZXZpb3VzQXR0YWNrcyIsIlBsYXllciIsInBsYXllck1vdmUiLCJjb21wdXRlck1vdmUiLCJwbGF5ZXJQbGFjZVNoaXBzIiwiaW5GbGVldCIsInNoaXBzUGxhY2VkIiwic3RhcnRCdXR0b24iLCJyb3RhdGVCdXR0b24iLCJhbGxTaGlwcyIsImRyb3BIYW5kbGVyIiwicGxheWVyIiwiZGF0YSIsImRhdGFUcmFuc2ZlciIsImdldERhdGEiLCJzaGlwRGl2IiwiY2hpbGRFbGVtZW50Q291bnQiLCJsaXN0Iiwic2hpcE5hbWUiLCJmaW5kIiwiY3JlYXRlU2hpcHMiLCJhcHBlbmQiLCJpZE5hbWUiLCJhZGRFdmVudExpc3RlbmVyIiwic2V0RGF0YSIsImlkIiwicGxhY2UiLCJ0aW1lc0hpdCIsImlzR2FtZU92ZXIiLCJwbGF5Um91bmQiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJlbmVteSJdLCJzb3VyY2VSb290IjoiIn0=