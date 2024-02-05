import Ship from './ship';

class Gameboard {
  constructor() {
    this.board = [];

    for (let i = 0; i < 10; i += 1) {
      const temp = [];

      for (let j = 0; j < 10; j += 1) {
        temp.push('empty');
      }

      this.board.push(temp);
    }
  }

  placeShip(coordinates) {
    const currentShip = new Ship(coordinates.length);

    coordinates.forEach((coordPair) => {
      this.board[coordPair[0]][coordPair[1]] = currentShip;
    });
  }

  receiveAttack(coordPair) {
    const cell = this.board[coordPair[0]][coordPair[1]];

    if (typeof cell === 'object') {
      cell.hit();
    } else {
      this.board[coordPair[0]][coordPair[1]] = 'miss';
    }
  }

  checkIfAllSunk() {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (
          typeof this.board[i][j] === 'object' &&
          !this.board[i][j].isSunk()
        ) {
          return false;
        }
      }
    }

    return true;
  }
}

export default Gameboard;
