import Gameboard from './gameboard';

class Player {
  constructor() {
    this.playerBoard = new Gameboard();
    this.computerBoard = new Gameboard();
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
    const ships = [
      { name: 'Carrier', size: 5 },
      { name: 'Battleship', size: 4 },
      { name: 'Destroyer', size: 3 },
      { name: 'Submarine', size: 3 },
      { name: 'Patrol Boat', size: 2 },
    ];

    ships.forEach((ship) => {
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
          let allEmpty = true;;

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

export default Player;
