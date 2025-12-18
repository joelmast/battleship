const { Ship, Gameboard, Player } = require("./script.js");
const { renderBoard } = require("./displayController.js");
let human;
let computer;
let boardContainer = document.getElementById("board-container");

function setupGame() {
	human = new Player("real");
	computer = new Player("computer");

	const humanShip = new Ship(3, 0, false);
	const computerShip = new Ship(3, 0, false);

	human.gameboard.placeShip(humanShip, 1, 1, true);
	computer.gameboard.placeShip(computerShip, 5, 5, false);
	return { human, computer };
}

function handleAttack(x, y) {
	human.attack(computer.gameboard, x, y);

	computer.attack(human.gameboard);

	if (computer.gameboard.allShipsSunk() || human.gameboard.allShipsSunk()) {
		if (computer.gameboard.allShipsSunk()) {
			exitGame("real");
		} else if (human.gameboard.allShipsSunk()) {
			exitGame("computer");
		}
	}

	renderAllBoards();
}

function renderAllBoards() {
	// render human
	renderBoard(human.gameboard, true, "human-board");
	// render computer
	renderBoard(computer.gameboard, false, "computer-board", handleAttack);
}

module.exports = { setupGame, handleAttack };
