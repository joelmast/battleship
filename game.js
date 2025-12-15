const { Ship, Gameboard, Player } = require("./script.js");

function setupGame() {
	const human = new Player("real");
	const computer = new Player("computer");

	const humanShip = new Ship(3, 0, false);
	const computerShip = new Ship(3, 0, false);

	human.gameboard.placeShip(humanShip, 1, 1, true);
	computer.gameboard.placeShip(computerShip, 5, 5, false);
	return { human, computer };
}
