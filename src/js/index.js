import '../style.css';
import Player from './player';
import dom from './dom';

let player;
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  dom.startGame(e);
  player = new Player();
});
