import { Ship, Gameboard, Player } from "./script.js";
import { renderBoard } from "./displayController.js";
let human;
let computer;
let boardContainer = document.getElementById("board-container");
let cells = document.querySelectorAll("cell");
let isGameOver = false;
function setupGame() {
	human = new Player("real");
	computer = new Player("computer");
	// FOR TESTING!!
	// const humanShip = new Ship(3, 0, false);
	// const computerShip = new Ship(3, 0, false);

	// human.gameboard.placeShip(humanShip, 1, 1, true);
	// computer.gameboard.placeShip(computerShip, 5, 5, false);
	computerShipPlacement();
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

function computerShipPlacement() {
	let shipLengths = [1, 2, 3, 4, 5];

	for (let i = 0; i < shipLengths.length; i++) {
		let x = Math.floor(Math.random() * 10);
		let y = Math.floor(Math.random() * 10);
		let isVertical = Boolean(Math.random() >= 0.5);
		while (isCollisionComputer(x, y, isVertical, shipLengths[i])) {
			x = Math.floor(Math.random() * 10);
			y = Math.floor(Math.random() * 10);
			isVertical = Boolean(Math.random() >= 0.5);
		}
		let newShip = new Ship(shipLengths[i], 0, false);
		computer.gameboard.placeShip(newShip, x, y, !isVertical);
	}
}

function isCollisionComputer(x, y, isVertical, length) {
	if (isVertical) {
		// test for x coordinate
		if (x < 0 || x > 9 || y < 0 || y > 9) {
			return true;
		} else if (y + length > 10) {
			return true;
		}
		for (let i = 0; i < length; i++) {
			if (computer.gameboard.grid[y + i][x] !== 0) {
				return true;
			}
		}
	} else {
		// test for y coordinate
		if (x < 0 || x > 9 || y < 0 || y > 9) {
			return true;
		} else if (x + length > 10) {
			return true;
		}
		for (let i = 0; i < length; i++) {
			if (computer.gameboard.grid[y][x + i] !== 0) {
				return true;
			}
		}
	}
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
		while (isNotValidInput(ship) || !isNotCollision(ship, shipInfo[i][1])) {
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
		let newShip = new Ship(shipInfo[i][1], 0, false);
		// placeShip asks for isHorizontal, so it's the opposite of isVertical
		human.gameboard.placeShip(newShip, x, y, !isVertical);
		// renderBoard asks for the gameboard, isPlayerBoard, and containerID
		renderBoard(human.gameboard, true, "human-board");
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
		} else if (y + length > 10) {
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
		} else if (x + length > 10) {
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

function checkWinner() {
	if (computer.gameboard.allShipsSunk() || human.gameboard.allShipsSunk()) {
		if (computer.gameboard.allShipsSunk()) {
			isGameOver = true;
			exitGame("real");
			return true;
		} else if (human.gameboard.allShipsSunk()) {
			isGameOver = true;
			exitGame("computer");
			return true;
		}
	}
	return false;
}

function exitGame(winner) {
	alert(`The ${winner} player won!!`);

	location.reload();
}

function handleAttack(x, y) {
	if (!isGameOver) {
		if (
			computer.gameboard.grid[y][x] === "hit" ||
			computer.gameboard.grid[y][x] === "miss"
		) {
			// give player another chance
			alert("already attacked");
			return;
		}

		human.attack(computer.gameboard, x, y);
		if (checkWinner()) return;

		computer.attack(human.gameboard);

		checkWinner();

		renderAllBoards();
	} else {
		alert("The game's over bro");
	}
}

function renderAllBoards() {
	// render human
	renderBoard(human.gameboard, true, "human-board");
	// render computer
	renderBoard(computer.gameboard, false, "computer-board", handleAttack);
}
document.addEventListener("DOMContentLoaded", () => {
	setupGame();
	shipPlacement();
	renderAllBoards();
});

module.exports = { setupGame, handleAttack };
