import '../style.css';
import Player from './player';
import dom from './dom';

let player;
const form = document.querySelector('form');

const e = {
  preventDefault() {},
  target: {
    reset() {},
  },
};

// form.addEventListener('submit', (e) => {
player = new Player();
dom.startGame(e);
dom.appendBoards(player.playerBoard, player.computerBoard);
// });

player.playerBoard.placeShip([
  [0, 0],
  [0, 1],
]);
player.playerBoard.receiveAttack([0, 0]);


dom.appendBoards(player.playerBoard, player.computerBoard);
    
const enemyBoard = document.querySelector('#enemy');
enemyBoard.addEventListener('click', (e) => {
  e.stopImmediatePropagation();

  if (e.target.classList.contains('cell')) {
    const {cell} = e.target.dataset;
    player.computerBoard.receiveAttack([Math.floor(cell / 10), cell % 10]);
    dom.appendBoards(player.playerBoard, player.computerBoard);
  }
});