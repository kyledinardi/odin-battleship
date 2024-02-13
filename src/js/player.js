import Gameboard from './gameboard';

class Player {
  constructor() {
    this.playerBoard = new Gameboard();
    this.computerBoard = new Gameboard();
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

export default Player;
