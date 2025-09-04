// For creating ship objects
class Ship {
  constructor(length, hits, isSunk) {
    this.length = length;
    this.hits = hits;
    this.isSunk = isSunk;
  }
}

let ship = new Ship(5, 3, false);

console.log(ship);

module.exports = { Ship };
