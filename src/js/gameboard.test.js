import Gameboard from './gameboard';

let testGameboard;

beforeEach(() => {
  testGameboard = new Gameboard();
});

test('gameboard has 10 x 10 spaces', () => {
  expect(testGameboard.board.length).toBe(10);
  expect(testGameboard.board[0].length).toBe(10);
});

test('placeShip() places ship', () => {
  testGameboard.placeShip([
    [0, 0],
    [0, 1],
  ]);
  expect(testGameboard.board[0][0]).toEqual({ length: 2, timesHit: 0 });
  expect(testGameboard.board[0][1]).toEqual({ length: 2, timesHit: 0 });
  expect(testGameboard.board[0][2]).toMatch(/empty/);
});

test('recieveAttack() on ship increases timesHit', () => {
  testGameboard.placeShip([
    [0, 0],
    [0, 1],
  ]);
  testGameboard.receiveAttack([0, 0]);
  expect(testGameboard.board[0][0].timesHit).toBe(1);
});

test('recieveAttack() on empty changes to miss', () => {
  testGameboard.receiveAttack([0, 0]);
  expect(testGameboard.board[0][0]).toMatch(/miss/);
});

test('checkIfAllSunk() returns false if working ships exist', () => {
  testGameboard.placeShip([
    [0, 0],
    [0, 1],
  ]);
  expect(testGameboard.checkIfAllSunk()).toBe(false);
});

test('checkIfAllSunk() returns true if all ships are sunk', () => {
  testGameboard.placeShip([
    [0, 0],
    [0, 1],
  ]);
  testGameboard.receiveAttack([0, 0]);
  testGameboard.receiveAttack([0, 1]);
  expect(testGameboard.checkIfAllSunk()).toBe(true);
});
