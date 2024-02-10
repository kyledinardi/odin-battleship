const dom = {
  startGame(e) {
    e.preventDefault();
    const nameInput = document.querySelector('#name');
    const name = nameInput.value;
    e.target.reset();

    const form = document.querySelector('form');
    form.style.display = 'none';

    const messageBox = document.createElement('div');
    const messageP = document.createElement('p');
    const gameContent = document.createElement('div');
    const playerContent = document.createElement('div');
    const enemyContent = document.createElement('div');
    const playerCaption = document.createElement('h3');
    const enemyCaption = document.createElement('h3');
    const playerBoardContainer = document.createElement('div');
    const enemyBoardContainer = document.createElement('div');

    messageBox.classList.add('message-box');
    gameContent.classList.add('game-content');
    playerContent.classList.add('player-content');
    enemyContent.classList.add('player-content');
    playerCaption.classList.add('caption');
    enemyCaption.classList.add('caption');
    playerBoardContainer.setAttribute('class', 'board-container');
    playerBoardContainer.setAttribute('id', 'player');
    enemyBoardContainer.setAttribute('class', 'board-container');
    enemyBoardContainer.setAttribute('id', 'enemy');

    playerCaption.textContent = name ? `${name}'s Fleet` : "Player's Fleet";
    enemyCaption.textContent = `Enemy Fleet`;

    messageBox.appendChild(messageP);
    playerContent.appendChild(playerCaption);
    playerContent.appendChild(playerBoardContainer);
    enemyContent.appendChild(enemyCaption);
    enemyContent.appendChild(enemyBoardContainer);
    gameContent.appendChild(playerContent);
    gameContent.appendChild(enemyContent);
    document.body.insertBefore(messageBox, form);
    document.body.insertBefore(gameContent, messageBox);
  },

  endGame() {
    const messageBox = document.querySelector('.message-box');
    const newGameButton = document.createElement('button');
    newGameButton.classList.add('new-game');
    newGameButton.textContent = 'New Game';
    messageBox.appendChild(newGameButton);
  },

  openForm() {
    const messageBox = document.querySelector('.message-box');
    const gameContent = document.querySelector('.game-content');
    const form = document.querySelector('form');
    messageBox.remove();
    gameContent.remove();
    form.style.display = 'block';
  },

  buildBoard(gameboard, shipsVisible, isClickable) {
    const board = document.createElement('div');
    board.classList.add('board');

    for (let i = 0; i < 100; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.cell = i;

      if (
        typeof gameboard.board[Math.floor(i / 10)][i % 10] === 'object' &&
        shipsVisible
      ) {
        cell.classList.add('ship');
      }

      for (let j = 0; j < gameboard.previousAttacks.length; j += 1) {
        if (
          gameboard.previousAttacks[j][0] === Math.floor(i / 10) &&
          gameboard.previousAttacks[j][1] === i % 10
        ) {
          cell.classList.add('attacked');

          if (typeof gameboard.board[Math.floor(i / 10)][i % 10] === 'object') {
            cell.classList.add('hit');
          }
        }
      }

      if (isClickable && !cell.classList.contains('attacked')) {
        cell.classList.add('clickable');
      }

      board.appendChild(cell);
    }

    return board;
  },

  appendBoards(playerBoard, computerBoard, shipPlacing, isGameOver) {
    let playerBoardNode;
    let computerBoardNode;

    if (shipPlacing) {
      playerBoardNode = dom.buildBoard(playerBoard, true, true);
    } else {
      playerBoardNode = dom.buildBoard(playerBoard, true, false);
    }

    if (shipPlacing) {
      computerBoardNode = dom.buildBoard(computerBoard, false, false);
    } else if (isGameOver) {
      computerBoardNode = dom.buildBoard(computerBoard, true, false);
    } else {
      computerBoardNode = dom.buildBoard(computerBoard, false, true);
    }

    const boardContainers = document.querySelectorAll('.board-container');
    boardContainers[0].textContent = '';
    boardContainers[1].textContent = '';
    boardContainers[0].appendChild(playerBoardNode);
    boardContainers[1].appendChild(computerBoardNode);
  },

  newMessage(message) {
    const messageP = document.querySelector('.message-box p');
    messageP.textContent = message;
  },

  playerPlaceShips(player) {
    const messageBox = document.querySelector('.message-box');
    let allShips = document.createElement('div');
    allShips.classList.add('all-ships');
    messageBox.append(allShips);
    allShips = document.querySelector('.all-ships');

    const rotateButton = document.createElement('button');
    rotateButton.textContent = 'Rotate';
    messageBox.appendChild(rotateButton);
    this.appendBoards(player.playerBoard, player.computerBoard, true, false);

    const ships = [
      { name: 'Carrier', size: 5 },
      { name: 'Battleship', size: 4 },
      { name: 'Destroyer', size: 3 },
      { name: 'Submarine', size: 3 },
      { name: 'Patrol Boat', size: 2 },
    ];

    ships.forEach((ship) => {
      const shipName = document.createElement('p');
      const shipDiv = document.createElement('div');
      shipName.textContent = ship.name;
      shipDiv.classList.add('ship-div');

      for (let i = 0; i < ship.size; i += 1) {
        const cell = document.createElement('div');
        cell.classList.add('ship');
        shipDiv.appendChild(cell);
      }

      allShips.append(shipName);
      allShips.append(shipDiv);
    });
  },
};

export default dom;
