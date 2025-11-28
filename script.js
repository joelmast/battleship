// For creating ship objects
class Ship {
	constructor(length, hits, isSunk) {
		this.length = length;
		this.hits = hits;
		this.isSunk = isSunk;
	}
	hit() {
		this.hits++;
		return this.hits;
	}
	isSunked() {
		console.log("the function isSunked is running!");
		console.log(this);
		if (this.hits >= this.length) {
			console.log("The first part of the if statement was triggered!");
			this.isSunk = true;
			return true;
		} else {
			console.log("The second part of the if statement was triggered!");
			this.isSunk = false;
			return false;
		}
	}
}

class Gameboard {
	constructor() {
		this.grid = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		];
		this.ships = [];
	}
	placeShip(ship, x, y, isHorizontal) {
		for (let i = 0; i < ship.length; i++) {
			if (isHorizontal) {
				this.grid[y][x + i] = ship;
			} else {
				this.grid[y + i][x] = ship;
			}
		}
		this.ships.push(ship);
	}
	receiveAttack(x, y) {
		if (this.grid[y][x] === 0) {
			console.log("untouched");
			this.grid[y][x] = "miss";
		} else if (this.grid[y][x] === "miss") {
			console.log("Already tried!");
		} else if (this.grid[y][x] === "hit") {
			console.log("Already tried!");
		} else {
			this.grid[y][x].hit();
			this.grid[y][x] = "hit";
		}
	}
	allShipsSunk() {
		return this.ships.every((ship) => ship.isSunked());
	}
}

class Player {
	constructor(playerType) {
		this.gameboard = new Gameboard();
		this.type = playerType;
	}
	attack(enemyGameboard) {
		let x;
		let y;
		let isIllegalMove = true; // Flag to control the loop

		while (isIllegalMove) {
			x = Math.floor(Math.random() * 10);
			y = Math.floor(Math.random() * 10);

			const spot = enemyGameboard.grid[y][x];

			if (spot !== "miss" && spot !== "hit") {
				isIllegalMove = false; // Found a legal move, exit loop
			}
		}

		enemyGameboard.receiveAttack(x, y);
	}
}

let ship = new Ship(5, 3, false);

module.exports = { Ship, Gameboard };
