import Gameboard from './gameboard';
import coordPairInArray from './coordPairInArray';

class Player {
  constructor() {
    this.playerBoard = new Gameboard();
    this.computerBoard = new Gameboard();
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
    const { board } = this.playerBoard;

    if (board[coordPair[0] - 1]) {
      if (
        !coordPairInArray(
          [coordPair[0] - 1, coordPair[1]],
          this.playerBoard.previousAttacks,
        ) &&
        !coordPairInArray([coordPair[0] - 1, coordPair[1]], this.possibleHits)
      ) {
        this.possibleHits.push([coordPair[0] - 1, coordPair[1]]);
      }
    }

    if (board[coordPair[0] + 1]) {
      if (
        !coordPairInArray(
          [coordPair[0] + 1, coordPair[1]],
          this.playerBoard.previousAttacks,
        ) &&
        !coordPairInArray([coordPair[0] + 1, coordPair[1]], this.possibleHits)
      ) {
        this.possibleHits.push([coordPair[0] + 1, coordPair[1]]);
      }
    }

    if (
      board[coordPair[0]][coordPair[1] - 1] &&
      !coordPairInArray(
        [coordPair[0], coordPair[1] - 1],
        this.playerBoard.previousAttacks,
      ) &&
      !coordPairInArray([coordPair[0], coordPair[1] - 1], this.possibleHits)
    ) {
      this.possibleHits.push([coordPair[0], coordPair[1] - 1]);
    }

    if (
      board[coordPair[0]][coordPair[1] + 1] &&
      !coordPairInArray(
        [coordPair[0], coordPair[1] + 1],
        this.playerBoard.previousAttacks,
      ) &&
      !coordPairInArray([coordPair[0], coordPair[1] + 1], this.possibleHits)
    ) {
      this.possibleHits.push([coordPair[0], coordPair[1] + 1]);
    }
  }

  searchAndDestroy() {
    const coordPair = this.possibleHits.shift();
    this.playerBoard.receiveAttack(coordPair);

    if (
      typeof this.playerBoard.board[coordPair[0]][coordPair[1]] === 'object'
    ) {
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
      while (
        coordPairInArray([row, column], this.playerBoard.previousAttacks)
      ) {
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

export default Player;
