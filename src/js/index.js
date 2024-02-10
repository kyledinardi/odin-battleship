import '../style.css';
import Player from './player';
import dom from './dom';

let player;

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
    dom.appendBoards(player.playerBoard, player.computerBoard, false, false);
  }
  if (player.playerBoard.allSunk() || player.computerBoard.allSunk()) {
    endGame();
  }
}

function endGame() {
  if (player.computerBoard.allSunk()) {
    dom.newMessage('Enemy fleet sunk! You win!');
  } else {
    dom.newMessage('Your fleet was sunk! Game over!');
  }

  dom.appendBoards(player.playerBoard, player.computerBoard, false, true);
  dom.endGame();
  const newGameButton = document.querySelector('.new-game');
  const enemy = document.querySelector('#enemy');
  newGameButton.addEventListener('click', dom.openForm);
  enemy.removeEventListener('click', playRound);
}

// const form = document.querySelector('form');
const e = { preventDefault() {}, target: { reset() {} } };
// form.addEventListener('submit', (e) => {
player = new Player();
dom.startGame(e);
player.computerPlaceShips();
dom.playerPlaceShips(player);
// const enemy = document.querySelector('#enemy');
// enemy.addEventListener('click', playRound);
// });
