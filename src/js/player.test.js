import Player from './player';

let testPlayer;

beforeEach(() => {
  testPlayer = new Player();
});

test('playerMove() attacks computer gameboard', () => {
  testPlayer.playerMove([0, 0]);
  expect(testPlayer.computerBoard.board[0][0]).toMatch(/miss/);
});

test('playerMove() on already hit cell returns false', () => {
  testPlayer.playerMove([0, 0]);
  expect(testPlayer.playerMove([0, 0])).toBe(false);
});
