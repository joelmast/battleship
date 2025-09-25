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

let ship = new Ship(5, 3, false);

module.exports = { Ship };
