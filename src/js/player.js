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
}

export default Player;
