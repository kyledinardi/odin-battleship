import '../style.css';
import Player from './player';
import dom from './dom';

let player;
const form = document.querySelector('form');
const e = { preventDefault() {}, target: { reset() {} } };

function endGame() {
  if (player.computerBoard.allSunk()) {
    dom.newMessage('Enemy fleet sunk! You win!');
  } else {
    dom.newMessage('Your fleet was sunk! Game over!');
  }

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
    player.playerMove([Math.floor(cell / 10), cell % 10]);
    player.computerMove();
    dom.appendBoards(player.playerBoard, player.computerBoard);
  }
  if (player.playerBoard.allSunk() || player.computerBoard.allSunk()) {
    endGame();
  }
}

// form.addEventListener('submit', (e) => {
player = new Player();
dom.startGame(e);
dom.appendBoards(player.playerBoard, player.computerBoard);
const enemyBoard = document.querySelector('#enemy');
enemyBoard.addEventListener('click', playRound);
// });
