const dom = {
  startGame(e) {
    e.preventDefault();
    const nameInput = document.querySelector('#name');
    const name = nameInput.value;
    e.target.reset();

    const form = document.querySelector('form');
    form.style.display = 'none';

    const messageBox = document.createElement('p');
    const gameContent = document.createElement('div');
    const playerContent = document.createElement('div');
    const enemyContent = document.createElement('div');
    const playerCaption = document.createElement('h3');
    const enemyCaption = document.createElement('h3');

    messageBox.classList.add('message-box');
    gameContent.classList.add('game-content');
    playerContent.classList.add('player-content');
    enemyContent.classList.add('player-content');
    playerCaption.classList.add('caption');
    enemyCaption.classList.add('caption');

    messageBox.textContent = 'Place your ships';
    playerCaption.textContent = name ? `${name}'s Fleet` : 'Player\'s Fleet';
    enemyCaption.textContent = `Enemy Fleet`;

    playerContent.appendChild(playerCaption);
    enemyContent.appendChild(enemyCaption);
    playerContent.appendChild(this.createBoard());
    enemyContent.appendChild(this.createBoard());
    gameContent.appendChild(playerContent);
    gameContent.appendChild(enemyContent);
    document.body.insertBefore(gameContent, form);
    document.body.insertBefore(messageBox, gameContent);
  },

  createBoard() {
    const board = document.createElement('div');
    board.classList.add('board');

    for (let i = 0; i < 100; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      board.appendChild(cell);
    }

    return board;
  },
};

export default dom;
