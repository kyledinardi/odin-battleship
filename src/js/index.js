import '../style.css';
import Player from './player';
import dom from './dom';
import playerPlaceShips from './playerPlaceShips';
import computerPlaceShips from './computerPlaceShips';

let player;
let isGameOver = false;

function endGame() {
  if (isGameOver) {
    return
  }
  if (player.computerBoard.allSunk()) {
    dom.newMessage('Enemy fleet sunk! You win!');
  } else {
    dom.newMessage('Your fleet was sunk! Game over!');
  }

  dom.appendBoards(player.playerBoard, player.computerBoard, 'game over');
  dom.endGame();

  const newGameButton = document.querySelector('.new-game');
  newGameButton.addEventListener('click', dom.openForm);
}

function playRound(e) {
  e.stopImmediatePropagation();

  if (
    e.target.classList.contains('cell') &&
    !e.target.classList.contains('attacked')
  ) {
    const { cell } = e.target.dataset;
    const message = player.playerMove([Math.floor(cell / 10), cell % 10]);
    dom.newMessage(message);
    player.computerMove();
    dom.appendBoards(player.playerBoard, player.computerBoard, 'normal play');
  }
  if (player.playerBoard.allSunk() || player.computerBoard.allSunk()) {
    endGame();
    isGameOver = true;
  }
}

// const form = document.querySelector('form');
const e = { preventDefault() {}, target: { reset() {} } };
// form.addEventListener('submit', (e) => {
player = new Player();
dom.startGame(e);
playerPlaceShips.place(player);
computerPlaceShips(player.computerBoard);
dom.appendBoards(player.playerBoard, player.computerBoard, 'normal play');
const enemy = document.querySelector('#enemy');
enemy.addEventListener('click', playRound);
// });
