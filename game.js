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

function isNotValidInput(input) {
	// 1. Basic check for null, undefined, or empty
	if (!input || typeof input !== "string") {
		return true;
	}

	// 2. Split by comma and check if we have exactly 3 parts
	const parts = input.split(",");
	if (parts.length !== 3) {
		return true;
	}

	// 3. Clean up whitespace from all parts
	const xStr = parts[0].trim();
	const yStr = parts[1].trim();
	const dirStr = parts[2].trim().toLowerCase();

	// 4. Validate X and Y are non-empty and are actual numbers
	// Check for empty string because Number(" ") is 0
	if (xStr === "" || yStr === "") {
		return true;
	}

	const x = Number(xStr);
	const y = Number(yStr);

	// Use Number.isInteger to ensure no decimals or NaN
	if (!Number.isInteger(x) || !Number.isInteger(y)) {
		return true;
	}

	// Ensure they aren't negative
	if (x < 0 || y < 0) {
		return true;
	}

	// 5. Validate direction (must be exactly 'h' or 'v')
	if (dirStr !== "h" && dirStr !== "v") {
		return true;
	}

	// If it passed every check above, it is valid (return false for isNotValid)
	return false;
}

function shipPlacement() {
	let shipInfo = [
		["the Soloist which has a length of 1", 1],
		["the Binary Blade which has a length of 2", 2],
		["the Trident's tip, which has a length of 3", 3],
		["the Quad-core which has a length of 4", 4],
		["the Penta-Punch which as a length of 5", 5],
	];
	for (let i = 0; i < shipInfo.length; i++) {
		let ship = prompt(
			`Enter information to place ${shipInfo[i][0]}. Use the following format: x, y, h/v (horizontal or vertical)`,
			"x, y, h/v"
		);
		while (isNotValidInput(ship) && isNotCollision(ship, shipInfo[i][1])) {
			ship = prompt(
				`INVALID INPUT!! Enter information to place ${shipInfo[i][0]}. Use the following format: x, y, h/v (horizontal or vertical)`,
				"x, y, h/v"
			);
		}
		let infoArr = ship.split(",");
		let x = parseInt(infoArr[0]);
		let y = parseInt(infoArr[1]);
		let isVertical;
		if (infoArr[2].trim() === "h") {
			isVertical = false;
		} else if (infoArr[2].trim() === "v") {
			isVertical = true;
		}
	}
}

function isNotCollision(input, length) {
	if (isNotValidInput(input)) {
		return false;
	}
	let infoArr = input.split(",");
	let x = parseInt(infoArr[0]);
	let y = parseInt(infoArr[1]);
	let isVertical = infoArr[2];
	if (isVertical === "v") {
		// test for x coordinate
		if (x < 0 || x > 9) {
			return false;
		} else if (y + length > 9) {
			return false;
		}
		for (let i = 0; i < length; i++) {
			if (human.gameboard.grid[y + i][x] !== 0) {
				return false;
			}
		}
	} else {
		// test for y coordinate
		if (y < 0 || y > 9) {
			return false;
		} else if (y + length > 9) {
			return false;
		}
		for (let i = 0; i < length; i++) {
			if (human.gameboard.grid[y][x + i] !== 0) {
				return false;
			}
		}
	}
	return true;
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
